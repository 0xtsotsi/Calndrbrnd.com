import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { BookingRepository } from "@calndrbrnd/features/bookings/repositories/BookingRepository";
import { DefaultAdapterFactory } from "@calndrbrnd/features/calendar-subscription/adapters/AdaptersFactory";
import { CalendarSubscriptionService } from "@calndrbrnd/features/calendar-subscription/lib/CalendarSubscriptionService";
import { CalendarCacheEventRepository } from "@calndrbrnd/features/calendar-subscription/lib/cache/CalendarCacheEventRepository";
import { CalendarCacheEventService } from "@calndrbrnd/features/calendar-subscription/lib/cache/CalendarCacheEventService";
import { CalendarSyncService } from "@calndrbrnd/features/calendar-subscription/lib/sync/CalendarSyncService";
import { FeaturesRepository } from "@calndrbrnd/features/flags/features.repository";
import { SelectedCalendarRepository } from "@calndrbrnd/features/selectedCalendar/repositories/SelectedCalendarRepository";
import { prisma } from "@calndrbrnd/prisma";
import { defaultResponderForAppDir } from "@calndrbrnd/web/app/api/defaultResponderForAppDir";

/**
 * Cron webhook
 * Checks for new calendar subscriptions (rollouts)
 *
 * @param request
 * @returns
 */
async function getHandler(request: NextRequest) {
  const apiKey = request.headers.get("authorization") || request.nextUrl.searchParams.get("apiKey");

  if (![process.env.CRON_API_KEY, `Bearer ${process.env.CRON_SECRET}`].includes(`${apiKey}`)) {
    return NextResponse.json({ message: "Forbiden" }, { status: 403 });
  }

  // instantiate dependencies
  const bookingRepository = new BookingRepository(prisma);
  const calendarSyncService = new CalendarSyncService({
    bookingRepository,
  });
  const calendarCacheEventRepository = new CalendarCacheEventRepository(prisma);
  const calendarCacheEventService = new CalendarCacheEventService({
    calendarCacheEventRepository,
  });

  const calendarSubscriptionService = new CalendarSubscriptionService({
    adapterFactory: new DefaultAdapterFactory(),
    selectedCalendarRepository: new SelectedCalendarRepository(prisma),
    featuresRepository: new FeaturesRepository(prisma),
    calendarSyncService,
    calendarCacheEventService,
  });

  // are features globally enabled
  const [isCacheEnabled, isSyncEnabled] = await Promise.all([
    calendarSubscriptionService.isCacheEnabled(),
    calendarSubscriptionService.isSyncEnabled(),
  ]);

  if (!isCacheEnabled && !isSyncEnabled) {
    return NextResponse.json({ ok: true });
  }

  try {
    await calendarSubscriptionService.checkForNewSubscriptions();
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export const GET = defaultResponderForAppDir(getHandler);
