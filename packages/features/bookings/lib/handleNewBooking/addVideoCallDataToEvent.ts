import type { BookingReference } from "@calndrbrnd/prisma/client";
import type { CalendarEvent } from "@calndrbrnd/types/Calendar";

/** Updates the evt object with video call data found from booking references
 *
 * @param bookingReferences
 * @param evt
 *
 * @returns updated evt with video call data
 */
export const addVideoCallDataToEvent = (bookingReferences: BookingReference[], evt: CalendarEvent) => {
  const videoCallReference = bookingReferences.find((reference) => reference.type.includes("_video"));

  if (videoCallReference) {
    evt.videoCallData = {
      type: videoCallReference.type,
      id: videoCallReference.meetingId,
      password: videoCallReference?.meetingPassword,
      url: videoCallReference.meetingUrl,
    };
  }

  return evt;
};
