import type { z } from "zod";

import { createEventTypeInput } from "@calndrbrnd/features/eventtypes/lib/types";

export const ZCreateInputSchema = createEventTypeInput;

export type TCreateInputSchema = z.infer<typeof ZCreateInputSchema>;
