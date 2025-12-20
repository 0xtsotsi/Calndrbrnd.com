import { moduleLoader as prismaModuleLoader } from "@calndrbrnd/features/di/modules/Prisma";
import { DI_TOKENS } from "@calndrbrnd/features/di/tokens";
import { PrismaOOORepository } from "@calndrbrnd/features/ooo/repositories/PrismaOOORepository";

import { createModule, bindModuleToClassOnToken, type ModuleLoader } from "../di";

export const oooRepositoryModule = createModule();
const token = DI_TOKENS.OOO_REPOSITORY;
const moduleToken = DI_TOKENS.OOO_REPOSITORY_MODULE;
const loadModule = bindModuleToClassOnToken({
  module: oooRepositoryModule,
  moduleToken,
  token,
  classs: PrismaOOORepository,
  dep: prismaModuleLoader,
});

export const moduleLoader: ModuleLoader = {
  token,
  loadModule,
};
