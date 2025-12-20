import { _generateMetadata, getTranslate } from "app/_utils";
import { redirect } from "next/navigation";

import OrgSSOView from "@calndrbrnd/features/ee/sso/page/orgs-sso-view";
import { Resource } from "@calndrbrnd/features/pbac/domain/types/permission-registry";
import { getResourcePermissions } from "@calndrbrnd/features/pbac/lib/resource-permissions";
import SettingsHeader from "@calndrbrnd/features/settings/appDir/SettingsHeader";
import { MembershipRole } from "@calndrbrnd/prisma/enums";

import { validateUserHasOrg } from "../../actions/validateUserHasOrg";

export const generateMetadata = async () =>
  await _generateMetadata(
    (t) => t("sso_configuration"),
    (t) => t("sso_configuration_description_orgs"),
    undefined,
    undefined,
    "/settings/organizations/sso"
  );

const Page = async () => {
  const t = await getTranslate();
  const session = await validateUserHasOrg();

  if (!session?.user.id || !session?.user.profile?.organizationId || !session?.user.org) {
    return redirect("/settings/organizations/general");
  }

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
    <SettingsHeader title={t("sso_configuration")} description={t("sso_configuration_description_orgs")}>
      <OrgSSOView permissions={{ canEdit }} />
    </SettingsHeader>
  );
};

export default Page;
