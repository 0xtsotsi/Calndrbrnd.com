import { getBrand } from "@calndrbrnd/features/ee/organizations/lib/getBrand";
import type { TrpcSessionUser } from "@calndrbrnd/trpc/server/types";

type VerifyCodeOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const getBrandHandler = async ({ ctx }: VerifyCodeOptions) => {
  const { user } = ctx;

  if (!user.organizationId) return null;

  return await getBrand(user.organizationId);
};

export default getBrandHandler;
