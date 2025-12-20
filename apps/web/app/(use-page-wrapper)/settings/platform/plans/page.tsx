import { _generateMetadata } from "app/_utils";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { getServerSession } from "@calndrbrnd/features/auth/lib/getServerSession";
import { WEBAPP_URL } from "@calndrbrnd/lib/constants";

import { buildLegacyRequest } from "@lib/buildLegacyCtx";

import PlatformPlansView from "~/settings/platform/plans/platform-plans-view";

export const generateMetadata = async () => {
  return await _generateMetadata(
    (t) => `${t("platform")} ${t("plans")}`,
    () => "",
    undefined,
    undefined,
    "/settings/platform/plans"
  );
};

const ServerPageWrapper = async () => {
  const session = await getServerSession({ req: buildLegacyRequest(await headers(), await cookies()) });
  const callbackUrl = `${WEBAPP_URL}/settings/platform/plans`;

  if (!session?.user) {
    redirect(`/login?callbackUrl=${callbackUrl}`);
  }

  return <PlatformPlansView />;
};

export default ServerPageWrapper;
