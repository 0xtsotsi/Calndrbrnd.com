import type z from "zod";

import type { zodNonRouterField } from "@calndrbrnd/app-store/routing-forms/zod";
import type { routingFormResponseInDbSchema } from "@calndrbrnd/app-store/routing-forms/zod";

export type RoutingFormResponseData = {
  fields: z.infer<typeof zodNonRouterField>[];
  response: z.infer<typeof routingFormResponseInDbSchema>;
};
