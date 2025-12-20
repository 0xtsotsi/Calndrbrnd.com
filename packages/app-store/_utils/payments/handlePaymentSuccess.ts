import { eventTypeAppMetadataOptionalSchema } from "@calndrbrnd/app-store/zod-utils";
import { sendScheduledEmailsAndSMS } from "@calndrbrnd/emails/email-manager";
import EventManager, { placeholderCreatedEvent } from "@calndrbrnd/features/bookings/lib/EventManager";
import { doesBookingRequireConfirmation } from "@calndrbrnd/features/bookings/lib/doesBookingRequireConfirmation";
import { getAllCredentialsIncludeServiceAccountKey } from "@calndrbrnd/features/bookings/lib/getAllCredentialsForUsersOnEvent/getAllCredentials";
import { handleBookingRequested } from "@calndrbrnd/features/bookings/lib/handleBookingRequested";
import { handleConfirmation } from "@calndrbrnd/features/bookings/lib/handleConfirmation";
import { getBooking } from "@calndrbrnd/features/bookings/lib/payment/getBooking";
import { getPlatformParams } from "@calndrbrnd/features/platform-oauth-client/get-platform-params";
import { PlatformOAuthClientRepository } from "@calndrbrnd/features/platform-oauth-client/platform-oauth-client.repository";
import { HttpError as HttpCode } from "@calndrbrnd/lib/http-error";
import logger from "@calndrbrnd/lib/logger";
import type { TraceContext } from "@calndrbrnd/lib/tracing";
import { distributedTracing } from "@calndrbrnd/lib/tracing/factory";
import prisma from "@calndrbrnd/prisma";
import type { Prisma } from "@calndrbrnd/prisma/client";
import { BookingStatus } from "@calndrbrnd/prisma/enums";
import type { EventTypeMetadata } from "@calndrbrnd/prisma/zod-utils";

const log = logger.getSubLogger({ prefix: ["[handlePaymentSuccess]"] });
export async function handlePaymentSuccess(paymentId: number, bookingId: number, traceContext: TraceContext) {
  const updatedTraceContext = distributedTracing.updateTrace(traceContext, {
    bookingId,
    paymentId,
  });
  log.debug(`handling payment success for bookingId ${bookingId}`);
  const { booking, user: userWithCredentials, evt, eventType } = await getBooking(bookingId);

  if (booking.location) evt.location = booking.location;

  const bookingData: Prisma.BookingUpdateInput = {
    paid: true,
    status: BookingStatus.ACCEPTED,
  };

  const allCredentials = await getAllCredentialsIncludeServiceAccountKey(userWithCredentials, {
    ...booking.eventType,
    metadata: booking.eventType?.metadata as EventTypeMetadata,
  });

  const isConfirmed = booking.status === BookingStatus.ACCEPTED;

  const platformOAuthClientRepository = new PlatformOAuthClientRepository();
  const platformOAuthClient = userWithCredentials.isPlatformManaged
    ? await platformOAuthClientRepository.getByUserId(userWithCredentials.id)
    : null;
  const areCalendarEventsEnabled = platformOAuthClient?.areCalendarEventsEnabled ?? true;
  const areEmailsEnabled = platformOAuthClient?.areEmailsEnabled ?? true;

  if (isConfirmed) {
    const apps = eventTypeAppMetadataOptionalSchema.parse(eventType?.metadata?.apps);
    const eventManager = new EventManager({ ...userWithCredentials, credentials: allCredentials }, apps);
    const scheduleResult = areCalendarEventsEnabled
      ? await eventManager.create(evt)
      : placeholderCreatedEvent;
    bookingData.references = { create: scheduleResult.referencesToCreate };
  }

  const requiresConfirmation = doesBookingRequireConfirmation({
    booking: {
      ...booking,
      eventType,
    },
  });

  if (requiresConfirmation) {
    delete bookingData.status;
  }
  const paymentUpdate = prisma.payment.update({
    where: {
      id: paymentId,
    },
    data: {
      success: true,
    },
  });

  const bookingUpdate = prisma.booking.update({
    where: {
      id: booking.id,
    },
    data: bookingData,
  });

  await prisma.$transaction([paymentUpdate, bookingUpdate]);
  if (!isConfirmed) {
    if (!requiresConfirmation) {
      await handleConfirmation({
        user: { ...userWithCredentials, credentials: allCredentials },
        evt,
        prisma,
        bookingId: booking.id,
        booking,
        paid: true,
        platformClientParams: platformOAuthClient ? getPlatformParams(platformOAuthClient) : undefined,
        traceContext: updatedTraceContext,
      });
    } else {
      await handleBookingRequested({
        evt,
        booking,
      });
      log.debug(`handling booking request for eventId ${eventType.id}`);
    }
  } else if (areEmailsEnabled) {
    await sendScheduledEmailsAndSMS({ ...evt }, undefined, undefined, undefined, eventType.metadata);
  }

  throw new HttpCode({
    statusCode: 200,
    message: `Booking with id '${booking.id}' was paid and confirmed.`,
  });
}
