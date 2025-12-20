import type { NextApiRequest } from "next";

import { sentrySpan } from "@calndrbrnd/features/watchlist/lib/telemetry";
import { checkIfEmailIsBlockedInWatchlistController } from "@calndrbrnd/features/watchlist/operations/check-if-email-in-watchlist.controller";

export async function isLockedOrBlocked(req: NextApiRequest) {
  const user = req.user;
  if (!user?.email) return false;
  return (
    user.locked ||
    (await checkIfEmailIsBlockedInWatchlistController({
      email: user.email,
      organizationId: null,
      span: sentrySpan,
    }))
  );
}
