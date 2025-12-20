import type { QualifiedHostsService } from "@calndrbrnd/features/bookings/lib/host-filtering/findQualifiedHostsWithDelegationCredentials";
import { DI_TOKENS } from "@calndrbrnd/features/di/tokens";
import { prismaModule } from "@calndrbrnd/features/di/modules/Prisma";

import { createContainer } from "../di";
import { bookingRepositoryModule } from "../modules/Booking";
import { filterHostsModule } from "../modules/FilterHosts";
import { qualifiedHostsModule } from "../modules/QualifiedHosts";

const container = createContainer();
container.load(DI_TOKENS.PRISMA_MODULE, prismaModule);
container.load(DI_TOKENS.BOOKING_REPOSITORY_MODULE, bookingRepositoryModule);
container.load(DI_TOKENS.FILTER_HOSTS_SERVICE_MODULE, filterHostsModule);
container.load(DI_TOKENS.QUALIFIED_HOSTS_SERVICE_MODULE, qualifiedHostsModule);

export function getQualifiedHostsService() {
  return container.get<QualifiedHostsService>(DI_TOKENS.QUALIFIED_HOSTS_SERVICE);
}
