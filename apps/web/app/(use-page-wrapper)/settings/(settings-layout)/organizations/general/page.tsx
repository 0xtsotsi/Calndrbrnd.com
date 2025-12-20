import { _generateMetadata, getTranslate } from "app/_utils";

import LegacyPage from "@calndrbrnd/features/ee/organizations/pages/settings/general";
import { Resource } from "@calndrbrnd/features/pbac/domain/types/permission-registry";
import { getResourcePermissions } from "@calndrbrnd/features/pbac/lib/resource-permissions";
import SettingsHeader from "@calndrbrnd/features/settings/appDir/SettingsHeader";
import { MembershipRole } from "@calndrbrnd/prisma/enums";

import { validateUserHasOrg } from "../actions/validateUserHasOrg";

export const generateMetadata = async () =>
  await _generateMetadata(
    (t) => t("general"),
    (t) => t("general_description"),
    undefined,
    undefined,
    "/settings/organizations/general"
  );

const Page = async () => {
  const t = await getTranslate();

  const session = await validateUserHasOrg();

  const { canRead, canEdit } = await getResourcePermissions({
    userId: session.user.id,
    teamId: session.user.profile.organizationId,
    resource: Resource.Organization,
    userRole: session.user.org.role,
    fallbackRoles: {
      read: {
        roles: [MembershipRole.MEMBER, MembershipRole.ADMIN, MembershipRole.OWNER],
      },
      update: {
        roles: [MembershipRole.ADMIN, MembershipRole.OWNER],
      },
    },
  });

  return (
    <SettingsHeader title={t("general")} description={t("general_description")} borderInShellHeader={true}>
      <LegacyPage permissions={{ canRead, canEdit }} />
    </SettingsHeader>
  );
};

export default Page;
