import { DI_TOKENS } from "@calndrbrnd/features/di/tokens";
import type {
  InsightsRoutingServicePublicOptions,
  InsightsRoutingServiceFilterOptions,
  InsightsRoutingBaseService,
} from "@calndrbrnd/features/insights/services/InsightsRoutingBaseService";
import type { InsightsRoutingService } from "@calndrbrnd/features/insights/services/InsightsRoutingDIService";
import { prismaModule } from "@calndrbrnd/features/di/modules/Prisma";

import { createContainer } from "../di";
import { insightsRoutingModule } from "../modules/InsightsRouting";

export function getInsightsRoutingService({
  options,
  filters,
}: {
  options: InsightsRoutingServicePublicOptions;
  filters: InsightsRoutingServiceFilterOptions;
}): InsightsRoutingBaseService {
  const container = createContainer();
  container.load(DI_TOKENS.READ_ONLY_PRISMA_CLIENT, prismaModule);
  container.load(DI_TOKENS.INSIGHTS_ROUTING_SERVICE_MODULE, insightsRoutingModule);

  const diService = container.get<InsightsRoutingService>(DI_TOKENS.INSIGHTS_ROUTING_SERVICE);
  return diService.create({ options, filters });
}
