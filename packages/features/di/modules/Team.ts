import { DI_TOKENS } from "@calndrbrnd/features/di/tokens";
import { TeamRepository } from "@calndrbrnd/features/ee/teams/repositories/TeamRepository";

import { createModule } from "../di";

export const teamRepositoryModule = createModule();
teamRepositoryModule.bind(DI_TOKENS.TEAM_REPOSITORY).toClass(TeamRepository, [DI_TOKENS.PRISMA_CLIENT]);
