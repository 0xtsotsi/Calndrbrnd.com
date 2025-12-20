import { BookingReferenceRepository } from "@calndrbrnd/features/bookingReference/repositories/BookingReferenceRepository";
import { HttpError } from "@calndrbrnd/lib/http-error";
import logger from "@calndrbrnd/lib/logger";
import { safeStringify } from "@calndrbrnd/lib/safeStringify";

const log = logger.getSubLogger({ prefix: ["daily-video-webhook-handler"] });

export const getBookingReference = async (roomName: string) => {
  const bookingReference = await BookingReferenceRepository.findDailyVideoReferenceByRoomName({ roomName });

  if (!bookingReference || !bookingReference.bookingId) {
    log.error(
      "bookingReference not found error:",
      safeStringify({
        bookingReference,
        roomName,
      })
    );

    throw new HttpError({ message: "Booking reference not found", statusCode: 200 });
  }

  return bookingReference;
};
