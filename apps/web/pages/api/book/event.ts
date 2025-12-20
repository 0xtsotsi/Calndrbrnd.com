import type { NextApiRequest } from "next";

import { getServerSession } from "@calndrbrnd/features/auth/lib/getServerSession";
import { getRegularBookingService } from "@calndrbrnd/features/bookings/di/RegularBookingService.container";
import { BotDetectionService } from "@calndrbrnd/features/bot-detection";
import { EventTypeRepository } from "@calndrbrnd/features/eventtypes/repositories/eventTypeRepository";
import { FeaturesRepository } from "@calndrbrnd/features/flags/features.repository";
import { checkRateLimitAndThrowError } from "@calndrbrnd/lib/checkRateLimitAndThrowError";
import getIP from "@calndrbrnd/lib/getIP";
import { piiHasher } from "@calndrbrnd/lib/server/PiiHasher";
import { checkCfTurnstileToken } from "@calndrbrnd/lib/server/checkCfTurnstileToken";
import { defaultResponder } from "@calndrbrnd/lib/server/defaultResponder";
import type { TraceContext } from "@calndrbrnd/lib/tracing";
import { prisma } from "@calndrbrnd/prisma";
import { CreationSource } from "@calndrbrnd/prisma/enums";

async function handler(req: NextApiRequest & { userId?: number; traceContext: TraceContext }) {
  const userIp = getIP(req);

  if (process.env.NEXT_PUBLIC_CLOUDFLARE_USE_TURNSTILE_IN_BOOKER === "1") {
    await checkCfTurnstileToken({
      token: req.body["cfToken"] as string,
      remoteIp: userIp,
    });
  }

  // Check for bot detection using feature flag
  const featuresRepository = new FeaturesRepository(prisma);
  const eventTypeRepository = new EventTypeRepository(prisma);
  const botDetectionService = new BotDetectionService(featuresRepository, eventTypeRepository);

  await botDetectionService.checkBotDetection({
    eventTypeId: req.body.eventTypeId,
    headers: req.headers,
  });

  await checkRateLimitAndThrowError({
    rateLimitingType: "core",
    identifier: `createBooking:${piiHasher.hash(userIp)}`,
  });

  const session = await getServerSession({ req });
  /* To mimic API behavior and comply with types */
  req.body = {
    ...req.body,
    creationSource: CreationSource.WEBAPP,
  };

  const regularBookingService = getRegularBookingService();
  const booking = await regularBookingService.createBooking({
    bookingData: req.body,
    bookingMeta: {
      userId: session?.user?.id || -1,
      hostname: req.headers.host || "",
      forcedSlug: req.headers["x-cal-force-slug"] as string | undefined,
      traceContext: req.traceContext,
    },
  });

  // const booking = await createBookingThroughFactory();
  return booking;

  //  To be added in the follow-up PR
  // async function createBookingThroughFactory() {
  //   console.log("Creating booking through factory");
  //   const regularBookingService = getRegularBookingService();

  //   const booking = await regularBookingService.createBooking({
  //     bookingData: req.body,
  //     bookingMeta: {
  //       userId: session?.user?.id || -1,
  //       hostname: req.headers.host || "",
  //       forcedSlug: req.headers["x-cal-force-slug"] as string | undefined,
  //     },
  //   });
  //   return booking;
  // }
}

export default defaultResponder(handler, "/api/book/event");
