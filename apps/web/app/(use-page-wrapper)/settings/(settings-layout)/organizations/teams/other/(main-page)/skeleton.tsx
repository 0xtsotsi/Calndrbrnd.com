"use client";

import SkeletonLoaderTeamList from "@calndrbrnd/features/ee/teams/components/SkeletonloaderTeamList";
import SettingsHeader from "@calndrbrnd/features/settings/appDir/SettingsHeader";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";

export function SkeletonLoader() {
  const { t } = useLocale();
  return (
    <SettingsHeader title={t("org_admin_other_teams")} description={t("org_admin_other_teams_description")}>
      <SkeletonLoaderTeamList />
    </SettingsHeader>
  );
}
