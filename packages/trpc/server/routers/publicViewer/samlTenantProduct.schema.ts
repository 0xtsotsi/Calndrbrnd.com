import { z } from "zod";

import { emailSchema } from "@calndrbrnd/lib/emailSchema";

export type TSamlTenantProductInputSchema = {
  email: string;
};

export const ZSamlTenantProductInputSchema: z.ZodType<TSamlTenantProductInputSchema> = z.object({
  email: emailSchema,
});
