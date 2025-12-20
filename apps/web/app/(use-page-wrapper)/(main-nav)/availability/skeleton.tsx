"use client";

import { ShellMainAppDir } from "app/(use-page-wrapper)/(main-nav)/ShellMainAppDir";

import SkeletonLoader from "@calndrbrnd/features/availability/components/SkeletonLoader";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";

import { AvailabilityCTA } from "~/availability/availability-view";

export default function AvailabilityLoader() {
  const { t } = useLocale();

  return (
    <ShellMainAppDir
      heading={t("availability")}
      subtitle={t("configure_availability")}
      CTA={<AvailabilityCTA canViewTeamAvailability />}>
      <SkeletonLoader />
    </ShellMainAppDir>
  );
}
