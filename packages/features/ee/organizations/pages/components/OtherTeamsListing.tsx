"use client";

import type { OrganizationRepository } from "@calndrbrnd/features/ee/organizations/di/OrganizationRepository.module";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { EmptyScreen } from "@calndrbrnd/ui/components/empty-screen";

import OtherTeamList from "./OtherTeamList";

type OtherTeamsListingProps = {
  teams: Awaited<ReturnType<OrganizationRepository["findTeamsInOrgIamNotPartOf"]>>;
};
export function OtherTeamsListing({ teams }: OtherTeamsListingProps) {
  const { t } = useLocale();

  return (
    <>
      {teams && teams.length > 0 ? (
        <OtherTeamList teams={teams} />
      ) : (
        <EmptyScreen
          headline={t("no_other_teams_found")}
          title={t("no_other_teams_found")}
          description={t("no_other_teams_found_description")}
        />
      )}
    </>
  );
}
