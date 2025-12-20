import type { z } from "zod";

import { createOrganizationSchema } from "@calndrbrnd/features/ee/organizations/types/schemas";

export const ZCreateSelfHostedInputSchema = createOrganizationSchema;

export type TCreateSelfHostedInputSchema = z.infer<typeof ZCreateSelfHostedInputSchema>;
