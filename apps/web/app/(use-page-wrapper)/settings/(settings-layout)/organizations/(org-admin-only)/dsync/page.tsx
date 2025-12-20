import { _generateMetadata, getTranslate } from "app/_utils";

import DirectorySyncTeamView from "@calndrbrnd/features/ee/dsync/page/team-dsync-view";
import { Resource } from "@calndrbrnd/features/pbac/domain/types/permission-registry";
import { getResourcePermissions } from "@calndrbrnd/features/pbac/lib/resource-permissions";
import SettingsHeader from "@calndrbrnd/features/settings/appDir/SettingsHeader";
import { MembershipRole } from "@calndrbrnd/prisma/enums";

import { validateUserHasOrg } from "../../actions/validateUserHasOrg";

export const generateMetadata = async () =>
  await _generateMetadata(
    (t) => t("directory_sync"),
    (t) => t("directory_sync_description"),
    undefined,
    undefined,
    "/settings/organizations/dsync"
  );

const Page = async () => {
  const t = await getTranslate();
  const session = await validateUserHasOrg();

  const { canEdit } = await getResourcePermissions({
    userId: session.user.id,
    teamId: session.user.profile.organizationId,
    resource: Resource.Organization,
    userRole: session.user.org.role,
    fallbackRoles: {
      update: {
        roles: [MembershipRole.ADMIN, MembershipRole.OWNER],
      },
    },
  });

  return (
    <SettingsHeader title={t("directory_sync")} description={t("directory_sync_description")}>
      <DirectorySyncTeamView permissions={{ canEdit }} />
    </SettingsHeader>
  );
};

export default Page;
