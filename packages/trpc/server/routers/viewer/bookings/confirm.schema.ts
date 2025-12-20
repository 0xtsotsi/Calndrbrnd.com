import type { z } from "zod";

import { bookingConfirmPatchBodySchema } from "@calndrbrnd/prisma/zod-utils";

export const ZConfirmInputSchema = bookingConfirmPatchBodySchema;

export type TConfirmInputSchema = z.infer<typeof ZConfirmInputSchema>;
