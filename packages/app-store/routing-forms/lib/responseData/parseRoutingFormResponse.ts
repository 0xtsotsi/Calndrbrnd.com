import { zodNonRouterField } from "@calndrbrnd/app-store/routing-forms/zod";
import { routingFormResponseInDbSchema } from "@calndrbrnd/app-store/routing-forms/zod";

import type { RoutingFormResponseData } from "./types";

export function parseRoutingFormResponse(rawResponse: unknown, formFields: unknown): RoutingFormResponseData {
  const response = routingFormResponseInDbSchema.parse(rawResponse);
  const fields = zodNonRouterField.array().parse(formFields);
  return { response, fields };
}
