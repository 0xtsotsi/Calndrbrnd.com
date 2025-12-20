import { incompleteBookingAction as salesforceIncompleteBookingAction } from "@calndrbrnd/app-store/salesforce/lib/routingForm/incompleteBookingAction";
import type { App_RoutingForms_IncompleteBookingActions } from "@calndrbrnd/prisma/client";
import { IncompleteBookingActionType } from "@calndrbrnd/prisma/enums";

const incompleteBookingActionFunctions: Record<
  IncompleteBookingActionType,
  (action: App_RoutingForms_IncompleteBookingActions, email: string) => void
> = {
  [IncompleteBookingActionType.SALESFORCE]: salesforceIncompleteBookingAction,
};

export default incompleteBookingActionFunctions;
