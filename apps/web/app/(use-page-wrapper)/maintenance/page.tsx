import { _generateMetadata } from "app/_utils";

import { APP_NAME } from "@calndrbrnd/lib/constants";

import LegacyPage from "~/maintenance/maintenance-view";

export const generateMetadata = async () => {
  return await _generateMetadata(
    (t) => t("under_maintenance"),
    (t) => t("under_maintenance_description", { appName: APP_NAME }),
    undefined,
    undefined,
    "/maintenance"
  );
};

export default LegacyPage;
