import { sendAttendeeRequestEmailAndSMS, sendOrganizerRequestEmail } from "@calndrbrnd/emails/email-manager";
import { getWebhookPayloadForBooking } from "@calndrbrnd/features/bookings/lib/getWebhookPayloadForBooking";
import { CreditService } from "@calndrbrnd/features/ee/billing/credit-service";
import { getAllWorkflowsFromEventType } from "@calndrbrnd/features/ee/workflows/lib/getAllWorkflowsFromEventType";
import { WorkflowService } from "@calndrbrnd/features/ee/workflows/lib/service/WorkflowService";
import type { Workflow } from "@calndrbrnd/features/ee/workflows/lib/types";
import getWebhooks from "@calndrbrnd/features/webhooks/lib/getWebhooks";
import sendPayload from "@calndrbrnd/features/webhooks/lib/sendOrSchedulePayload";
import getOrgIdFromMemberOrTeamId from "@calndrbrnd/lib/getOrgIdFromMemberOrTeamId";
import logger from "@calndrbrnd/lib/logger";
import { safeStringify } from "@calndrbrnd/lib/safeStringify";
import type { Prisma } from "@calndrbrnd/prisma/client";
import { WebhookTriggerEvents, WorkflowTriggerEvents } from "@calndrbrnd/prisma/enums";
import type { EventTypeMetadata } from "@calndrbrnd/prisma/zod-utils";
import type { CalendarEvent } from "@calndrbrnd/types/Calendar";

const log = logger.getSubLogger({ prefix: ["[handleBookingRequested] book:user"] });

/**
 * Supposed to do whatever is needed when a booking is requested.
 */
export async function handleBookingRequested(args: {
  evt: CalendarEvent;
  booking: {
    smsReminderNumber: string | null;
    eventType: {
      workflows: {
        workflow: Workflow;
      }[];
      owner: {
        hideBranding: boolean;
      } | null;
      team?: {
        parentId: number | null;
      } | null;
      currency: string;
      hosts?: {
        user: {
          email: string;
          destinationCalendar?: {
            primaryEmail: string | null;
          } | null;
        };
      }[];
      description: string | null;
      id: number;
      length: number;
      price: number;
      requiresConfirmation: boolean;
      title: string;
      teamId?: number | null;
      metadata: Prisma.JsonValue;
    } | null;
    eventTypeId: number | null;
    userId: number | null;
    id: number;
  };
}) {
  const { evt, booking } = args;

  log.debug("Emails: Sending booking requested emails");

  await sendOrganizerRequestEmail({ ...evt }, booking?.eventType?.metadata as EventTypeMetadata);
  await sendAttendeeRequestEmailAndSMS(
    { ...evt },
    evt.attendees[0],
    booking?.eventType?.metadata as EventTypeMetadata
  );

  const orgId = await getOrgIdFromMemberOrTeamId({
    memberId: booking.userId,
    teamId: booking.eventType?.teamId,
  });

  try {
    const subscribersBookingRequested = await getWebhooks({
      userId: booking.userId,
      eventTypeId: booking.eventTypeId,
      triggerEvent: WebhookTriggerEvents.BOOKING_REQUESTED,
      teamId: booking.eventType?.teamId,
      orgId,
    });

    const webhookPayload = getWebhookPayloadForBooking({
      booking,
      evt,
    });

    const promises = subscribersBookingRequested.map((sub) =>
      sendPayload(
        sub.secret,
        WebhookTriggerEvents.BOOKING_REQUESTED,
        new Date().toISOString(),
        sub,
        webhookPayload
      ).catch((e) => {
        log.error(
          `Error executing webhook for event: ${WebhookTriggerEvents.BOOKING_REQUESTED}, URL: ${sub.subscriberUrl}, bookingId: ${evt.bookingId}, bookingUid: ${evt.uid}`,
          safeStringify(e)
        );
      })
    );
    await Promise.all(promises);

    const workflows = await getAllWorkflowsFromEventType(booking.eventType, booking.userId);
    if (workflows.length > 0) {
      const creditService = new CreditService();

      await WorkflowService.scheduleWorkflowsFilteredByTriggerEvent({
        workflows,
        smsReminderNumber: booking.smsReminderNumber,
        hideBranding: !!booking.eventType?.owner?.hideBranding,
        calendarEvent: {
          ...evt,
          bookerUrl: evt.bookerUrl as string,
          eventType: {
            slug: evt.type,
            hosts: booking.eventType?.hosts,
            schedulingType: evt.schedulingType,
          },
        },
        triggers: [WorkflowTriggerEvents.BOOKING_REQUESTED],
        creditCheckFn: creditService.hasAvailableCredits.bind(creditService),
      });
    }
  } catch (error) {
    // Silently fail
    log.error("Error in handleBookingRequested", safeStringify(error));
  }
}
