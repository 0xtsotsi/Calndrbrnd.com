import { getOrganizationRepository } from "@calndrbrnd/features/ee/organizations/di/OrganizationRepository.container";
import { AdminOrganizationUpdateService } from "@calndrbrnd/features/ee/organizations/lib/service/AdminOrganizationUpdateService";
import { prisma } from "@calndrbrnd/prisma";

import type { TrpcSessionUser } from "../../../types";
import type { TAdminUpdate } from "./adminUpdate.schema";

type AdminUpdateOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TAdminUpdate;
};

export const adminUpdateHandler = async ({ input }: AdminUpdateOptions) => {
  const organizationRepository = getOrganizationRepository();
  const adminOrganizationUpdateService = new AdminOrganizationUpdateService({
    prismaClient: prisma,
    organizationRepository,
  });

  return adminOrganizationUpdateService.updateOrganization(input);
};

export default adminUpdateHandler;
