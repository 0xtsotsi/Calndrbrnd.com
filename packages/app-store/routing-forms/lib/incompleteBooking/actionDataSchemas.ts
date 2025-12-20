import type { z } from "zod";

import { routingFormIncompleteBookingDataSchema as salesforceRoutingFormIncompleteBookingDataSchema } from "@calndrbrnd/app-store/salesforce/zod";
import { IncompleteBookingActionType } from "@calndrbrnd/prisma/enums";

const incompleteBookingActionDataSchemas: Record<IncompleteBookingActionType, z.ZodType<any>> = {
  [IncompleteBookingActionType.SALESFORCE]: salesforceRoutingFormIncompleteBookingDataSchema,
};

export default incompleteBookingActionDataSchemas;
