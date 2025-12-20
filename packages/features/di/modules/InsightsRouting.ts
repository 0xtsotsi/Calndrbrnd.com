import type { IInsightsRoutingService } from "@calndrbrnd/features/insights/services/InsightsRoutingDIService";
import { InsightsRoutingService } from "@calndrbrnd/features/insights/services/InsightsRoutingDIService";

import { createModule } from "../di";
import { DI_TOKENS } from "../tokens";

export const insightsRoutingModule = createModule();
insightsRoutingModule.bind(DI_TOKENS.INSIGHTS_ROUTING_SERVICE).toClass(InsightsRoutingService, {
  prisma: DI_TOKENS.READ_ONLY_PRISMA_CLIENT,
} satisfies Record<keyof IInsightsRoutingService, symbol>);
