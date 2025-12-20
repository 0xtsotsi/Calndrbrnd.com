import { DI_TOKENS } from "@calndrbrnd/features/di/tokens";
import { redisModule } from "@calndrbrnd/features/redis/di/redisModule";
import { membershipRepositoryModule } from "@calndrbrnd/features/users/di/MembershipRepository.module";
import { prismaModule } from "@calndrbrnd/features/di/modules/Prisma";
import type { NoSlotsNotificationService } from "@calndrbrnd/features/slots/handleNotificationWhenNoSlots";

import { createContainer } from "../di";
import { noSlotsNotificationModule } from "../modules/NoSlotsNotification";
import { teamRepositoryModule } from "../modules/Team";

const container = createContainer();
container.load(DI_TOKENS.REDIS_CLIENT, redisModule);
container.load(DI_TOKENS.PRISMA_MODULE, prismaModule);
container.load(DI_TOKENS.TEAM_REPOSITORY_MODULE, teamRepositoryModule);
container.load(DI_TOKENS.MEMBERSHIP_REPOSITORY_MODULE, membershipRepositoryModule);
container.load(DI_TOKENS.NO_SLOTS_NOTIFICATION_SERVICE_MODULE, noSlotsNotificationModule);

export function getNoSlotsNotificationService() {
  return container.get<NoSlotsNotificationService>(DI_TOKENS.NO_SLOTS_NOTIFICATION_SERVICE);
}
