"use client";
import posthog from "posthog-js";

import { WEBAPP_URL } from "@calndrbrnd/lib/constants";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { Button } from "@calndrbrnd/ui/components/button";

export const TeamsCTA = () => {
  const { t } = useLocale();
  return (
    <Button
      data-testid="new-team-btn"
      variant="fab"
      StartIcon="plus"
      size="sm"
      type="button"
      onClick={() => {
        posthog.capture("add_team_button_clicked")
      }}
      href={`${WEBAPP_URL}/settings/teams/new?returnTo=${WEBAPP_URL}/teams`}>
      {t("new")}
    </Button>
  );
};
