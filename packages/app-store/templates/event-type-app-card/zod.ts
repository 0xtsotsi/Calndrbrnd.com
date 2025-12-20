import { z } from "zod";

import { eventTypeAppCardZod } from "@calndrbrnd/app-store/eventTypeAppCardZod";

export const appDataSchema = eventTypeAppCardZod.merge(
  z.object({
    isSunrise: z.boolean(),
  })
);
export const appKeysSchema = z.object({});
