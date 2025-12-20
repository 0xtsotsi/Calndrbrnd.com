import type { GlobalBlockingService } from "@calndrbrnd/features/watchlist/lib/service/GlobalBlockingService";
import type { OrganizationBlockingService } from "@calndrbrnd/features/watchlist/lib/service/OrganizationBlockingService";
import { SpamCheckService } from "@calndrbrnd/features/watchlist/lib/service/SpamCheckService";

import { getGlobalBlockingService, getOrganizationBlockingService } from "./watchlist";

export const getSpamCheckService = (): SpamCheckService => {
  const globalBlockingService = getGlobalBlockingService() as GlobalBlockingService;
  const organizationBlockingService = getOrganizationBlockingService() as OrganizationBlockingService;
  return new SpamCheckService(globalBlockingService, organizationBlockingService);
};
