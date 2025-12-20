import async from "async";

import { buildAllCredentials } from "@calndrbrnd/app-store/delegationCredential";
import { isDelegationCredential } from "@calndrbrnd/lib/delegationCredential";
import { withReporting } from "@calndrbrnd/lib/sentryWrapper";
import type { CredentialForCalendarService } from "@calndrbrnd/types/Credential";

import { refreshCredential } from "./refreshCredential";

/**
 * Refreshes the given set of credentials.
 *
 * @param credentials
 */
// Define the function with underscore prefix
const _refreshCredentials = async (
  credentials: Array<CredentialForCalendarService>
): Promise<Array<CredentialForCalendarService>> => {
  const nonDelegationCredentials = credentials.filter(
    (cred) => !isDelegationCredential({ credentialId: cred.id })
  );
  const delegationCredentials = credentials.filter((cred) =>
    isDelegationCredential({ credentialId: cred.id })
  );
  const refreshedDbCredentials = await async.mapLimit(nonDelegationCredentials, 5, refreshCredential);
  return buildAllCredentials({ delegationCredentials, existingCredentials: refreshedDbCredentials });
};

export const refreshCredentials = withReporting(_refreshCredentials, "refreshCredentials");
