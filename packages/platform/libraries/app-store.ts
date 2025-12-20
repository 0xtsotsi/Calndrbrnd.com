import getEnabledAppsFromCredentials from "@calndrbrnd/app-store/_utils/getEnabledAppsFromCredentials";
import getApps from "@calndrbrnd/app-store/utils";
import handleDeleteCredential from "@calndrbrnd/features/credentials/handleDeleteCredential";
import addDelegationCredential from "@calndrbrnd/trpc/server/routers/viewer/delegationCredential/add.handler";

export type { TDependencyData } from "@calndrbrnd/app-store/_appRegistry";

export type { CredentialOwner } from "@calndrbrnd/app-store/types";
export { CalendarService as IcsFeedCalendarService } from "@calndrbrnd/app-store/ics-feedcalendar/lib";
export { getAppFromSlug } from "@calndrbrnd/app-store/utils";
export type { CredentialDataWithTeamName, LocationOption } from "@calndrbrnd/app-store/utils";

export { CalendarService } from "@calndrbrnd/app-store/applecalendar/lib";

export { getApps };

export { handleDeleteCredential };

export type { App } from "@calndrbrnd/types/App";

export { getEnabledAppsFromCredentials };

export { getConnectedApps } from "@calndrbrnd/app-store/_utils/getConnectedApps";

export type { TServiceAccountKeySchema } from "@calndrbrnd/prisma/zod-utils";

export type { ConnectedApps } from "@calndrbrnd/app-store/_utils/getConnectedApps";

export type { AppsStatus } from "@calndrbrnd/types/Calendar";

export type { CredentialPayload } from "@calndrbrnd/types/Credential";

export { addDelegationCredential };

export { enrichUserWithDelegationConferencingCredentialsWithoutOrgId } from "@calndrbrnd/app-store/delegationCredential";
export { toggleDelegationCredentialEnabled } from "@calndrbrnd/trpc/server/routers/viewer/delegationCredential/toggleEnabled.handler";
export {
  CalendarAppError,
  CalendarAppDelegationCredentialInvalidGrantError,
  CalendarAppDelegationCredentialError,
  CalendarAppDelegationCredentialConfigurationError,
  CalendarAppDelegationCredentialClientIdNotAuthorizedError,
  CalendarAppDelegationCredentialNotSetupError,
} from "@calndrbrnd/lib/CalendarAppError";

export { DelegationCredentialRepository } from "@calndrbrnd/features/delegation-credentials/repositories/DelegationCredentialRepository";

export { OAuth2UniversalSchema } from "@calndrbrnd/app-store/_utils/oauth/universalSchema";
export { getUsersCredentialsIncludeServiceAccountKey } from "@calndrbrnd/app-store/delegationCredential";
