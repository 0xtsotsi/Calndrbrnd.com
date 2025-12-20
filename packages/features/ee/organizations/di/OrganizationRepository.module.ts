import { bindModuleToClassOnToken, createModule, type ModuleLoader } from "@calndrbrnd/features/di/di";
import { OrganizationRepository } from "@calndrbrnd/features/ee/organizations/repositories/OrganizationRepository";
import { moduleLoader as prismaModuleLoader } from "@calndrbrnd/features/di/modules/Prisma";

import { ORGANIZATION_DI_TOKENS } from "./tokens";

export const organizationRepositoryModule = createModule();
const token = ORGANIZATION_DI_TOKENS.ORGANIZATION_REPOSITORY;
const moduleToken = ORGANIZATION_DI_TOKENS.ORGANIZATION_REPOSITORY_MODULE;
const loadModule = bindModuleToClassOnToken({
    module: organizationRepositoryModule,
    moduleToken,
    token,
    classs: OrganizationRepository,
    depsMap: {
        prismaClient: prismaModuleLoader,
    },
});

export const moduleLoader: ModuleLoader = {
    token,
    loadModule,
};

export type { OrganizationRepository };

