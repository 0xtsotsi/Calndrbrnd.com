import { getBookingForReschedule } from "@calndrbrnd/features/bookings/lib/get-booking";
import getAllUserBookings from "@calndrbrnd/features/bookings/lib/getAllUserBookings";
import { getBookingFieldsWithSystemFields } from "@calndrbrnd/features/bookings/lib/getBookingFields";
import getBookingInfo from "@calndrbrnd/features/bookings/lib/getBookingInfo";
import handleCancelBooking from "@calndrbrnd/features/bookings/lib/handleCancelBooking";
import { getClientSecretFromPayment } from "@calndrbrnd/features/ee/payments/pages/getClientSecretFromPayment";
import { getTeamMemberEmailForResponseOrContactUsingUrlQuery } from "@calndrbrnd/features/ee/teams/lib/getTeamMemberEmailFromCrm";
import {
  verifyPhoneNumber,
  sendVerificationCode,
} from "@calndrbrnd/features/ee/workflows/lib/reminders/verifyPhoneNumber";
import { handleCreatePhoneCall } from "@calndrbrnd/features/handleCreatePhoneCall";
import handleMarkNoShow from "@calndrbrnd/features/handleMarkNoShow";
import { getRoutedUrl } from "@calndrbrnd/features/routing-forms/lib/getRoutedUrl";
import { symmetricEncrypt, symmetricDecrypt } from "@calndrbrnd/lib/crypto";
import { getTranslation } from "@calndrbrnd/lib/server/i18n";
import type { Prisma } from "@calndrbrnd/prisma/client";
import { credentialForCalendarServiceSelect } from "@calndrbrnd/prisma/selects/credential";
import { paymentDataSelect } from "@calndrbrnd/prisma/selects/payment";
import { createNewUsersConnectToOrgIfExists } from "@calndrbrnd/trpc/server/routers/viewer/teams/inviteMember/utils";

export { slugify } from "@calndrbrnd/lib/slugify";
export { slugifyLenient } from "@calndrbrnd/lib/slugify-lenient";
export { getBookingForReschedule };

export type { EventBusyDate } from "@calndrbrnd/types/Calendar";

export {
  CreationSource,
  SchedulingType,
  PeriodType,
  AttributeType,
  MembershipRole,
  TimeUnit,
  WebhookTriggerEvents,
  WorkflowTriggerEvents,
  WorkflowActions,
  WorkflowTemplates,
} from "@calndrbrnd/prisma/enums";

export {
  WebhookVersion,
  DEFAULT_WEBHOOK_VERSION,
} from "@calndrbrnd/features/webhooks/lib/interface/IWebhookRepository";

export { getUsernameList } from "@calndrbrnd/features/eventtypes/lib/defaultEvents";

export { handleMarkNoShow };
export { handleCreatePhoneCall };

export { getConnectedDestinationCalendarsAndEnsureDefaultsInDb } from "@calndrbrnd/features/calendars/lib/getConnectedDestinationCalendars";

export { getBusyCalendarTimes } from "@calndrbrnd/features/calendars/lib/CalendarManager";

export type { BookingCreateBody, BookingResponse } from "@calndrbrnd/features/bookings/types";
export { HttpError } from "@calndrbrnd/lib/http-error";

export { MINUTES_TO_BOOK, ENABLE_ASYNC_TASKER } from "@calndrbrnd/lib/constants";

export { cityTimezonesHandler } from "@calndrbrnd/features/cityTimezones/cityTimezonesHandler";
export type { CityTimezones } from "@calndrbrnd/features/cityTimezones/cityTimezonesHandler";

export { TRPCError } from "@trpc/server";
export { createNewUsersConnectToOrgIfExists };

export { getAllUserBookings };
export { getBookingInfo };
export { handleCancelBooking };

export { userMetadata, bookingMetadataSchema, teamMetadataSchema } from "@calndrbrnd/prisma/zod-utils";

export { parseBookingLimit } from "@calndrbrnd/lib/intervalLimits/isBookingLimits";

export { parseRecurringEvent } from "@calndrbrnd/lib/isRecurringEvent";
export { dynamicEvent } from "@calndrbrnd/features/eventtypes/lib/defaultEvents";

export { symmetricEncrypt, symmetricDecrypt };

export { getTranslation };

export { roundRobinReassignment } from "@calndrbrnd/features/ee/round-robin/roundRobinReassignment";
export { roundRobinManualReassignment } from "@calndrbrnd/features/ee/round-robin/roundRobinManualReassignment";

export { ErrorCode } from "@calndrbrnd/lib/errorCodes";

export { validateCustomEventName } from "@calndrbrnd/features/eventtypes/lib/eventNaming";

export type TeamQuery = Prisma.TeamGetPayload<{
  select: {
    id: true;
    credentials: {
      select: typeof import("@calndrbrnd/prisma/selects/credential").credentialForCalendarServiceSelect;
    };
    name: true;
    logoUrl: true;
    members: {
      select: {
        role: true;
      };
    };
  };
}>;

export { credentialForCalendarServiceSelect };
export { paymentDataSelect };
export { getClientSecretFromPayment };

export { confirmHandler as confirmBookingHandler } from "@calndrbrnd/trpc/server/routers/viewer/bookings/confirm.handler";
export { groupMembershipAttributes } from "@calndrbrnd/trpc/server/routers/viewer/attributes/getByUserId.handler";
export type { GroupedAttribute } from "@calndrbrnd/trpc/server/routers/viewer/attributes/getByUserId.handler";
export { getBookingFieldsWithSystemFields };

export { getRoutedUrl };

export { getTeamMemberEmailForResponseOrContactUsingUrlQuery };

export { SelectedCalendarRepository } from "@calndrbrnd/lib/server/repository/selectedCalendar";
export { encryptServiceAccountKey } from "@calndrbrnd/lib/server/serviceAccountKey";
export { createHandler as createApiKeyHandler } from "@calndrbrnd/trpc/server/routers/viewer/apiKeys/create.handler";
export { getCalendarLinks } from "@calndrbrnd/features/bookings/lib/getCalendarLinks";

export { findTeamMembersMatchingAttributeLogic } from "@calndrbrnd/app-store/_utils/raqb/findTeamMembersMatchingAttributeLogic";
export type { TFindTeamMembersMatchingAttributeLogicInputSchema } from "@calndrbrnd/trpc/server/routers/viewer/attributes/findTeamMembersMatchingAttributeLogic.schema";
export { checkAdminOrOwner } from "@calndrbrnd/features/auth/lib/checkAdminOrOwner";

export { verifyPhoneNumber, sendVerificationCode };

export { verifyCodeUnAuthenticated } from "@calndrbrnd/features/auth/lib/verifyCodeUnAuthenticated";

export { verifyCode as verifyCodeAuthenticated } from "@calndrbrnd/trpc/server/routers/viewer/organizations/verifyCode.handler";

export { sendEmailVerificationByCode } from "@calndrbrnd/features/auth/lib/verifyEmail";

export { checkEmailVerificationRequired } from "@calndrbrnd/trpc/server/routers/publicViewer/checkIfUserEmailVerificationRequired.handler";

export { TeamService } from "@calndrbrnd/features/ee/teams/services/teamService";

export { BookingAccessService } from "@calndrbrnd/features/bookings/services/BookingAccessService";
export { getTasker } from "@calndrbrnd/features/tasker/tasker-factory";
export type { Tasker } from "@calndrbrnd/features/tasker/tasker";
