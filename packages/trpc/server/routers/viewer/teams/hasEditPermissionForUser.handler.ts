import { hasEditPermissionForUserID as $hasEditPermissionForUser } from "@calndrbrnd/lib/hasEditPermissionForUser";
import type { TrpcSessionUser } from "@calndrbrnd/trpc/server/types";

import type { THasEditPermissionForUserSchema } from "./hasEditPermissionForUser.schema";

type HasEditPermissionForUserOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: THasEditPermissionForUserSchema;
};

export const hasEditPermissionForUser = async ({ ctx, input }: HasEditPermissionForUserOptions) => {
  // Calculate if the logged in User has edit permission for the given User.
  return $hasEditPermissionForUser({
    ctx,
    input,
  });
};

export default hasEditPermissionForUser;
