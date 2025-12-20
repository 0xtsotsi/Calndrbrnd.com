import type { z } from "zod";

import type { createPhoneCallSchema } from "@calndrbrnd/features/calAIPhone/zod-utils";
import { handleCreatePhoneCall } from "@calndrbrnd/features/handleCreatePhoneCall";
import type { PrismaClient } from "@calndrbrnd/prisma";
import type { TrpcSessionUser } from "@calndrbrnd/trpc/server/types";

type CreatePhoneCallProps = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    prisma: PrismaClient;
  };
  input: z.infer<typeof createPhoneCallSchema>;
};

const createPhoneCallHandler = async ({ input, ctx }: CreatePhoneCallProps) => {
  return await handleCreatePhoneCall({
    user: {
      id: ctx.user.id,
      timeZone: ctx.user.timeZone,
      profile: { organization: { id: ctx.user.profile.organization?.id } },
    },
    input,
  });
};

export default createPhoneCallHandler;
