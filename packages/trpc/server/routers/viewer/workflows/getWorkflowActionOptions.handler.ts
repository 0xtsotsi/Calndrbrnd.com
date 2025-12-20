import { getWorkflowActionOptions } from "@calndrbrnd/features/ee/workflows/lib/getOptions";
import { getTranslation } from "@calndrbrnd/lib/server/i18n";
import type { TrpcSessionUser } from "@calndrbrnd/trpc/server/types";

type GetWorkflowActionOptionsOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser> & {
      locale: string;
    };
  };
};

export const getWorkflowActionOptionsHandler = async ({ ctx }: GetWorkflowActionOptionsOptions) => {
  const { user } = ctx;

  const t = await getTranslation(ctx.user.locale, "common");

  return getWorkflowActionOptions(t, !!user.profile?.organizationId);
};
