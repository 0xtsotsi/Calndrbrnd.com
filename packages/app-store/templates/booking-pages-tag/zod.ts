import { z } from "zod";

import { eventTypeAppCardZod } from "@calndrbrnd/app-store/eventTypeAppCardZod";

export const appDataSchema = eventTypeAppCardZod.merge(
  z.object({
    trackingId: z.string(),
  })
);

export const appKeysSchema = z.object({});
