"use client";

import { useMemo } from "react";

import { useDataTable } from "@calndrbrnd/features/data-table";
import NoSSR from "@calndrbrnd/lib/components/NoSSR";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { CURRENT_TIMEZONE } from "@calndrbrnd/lib/timezoneConstants";
import { Icon } from "@calndrbrnd/ui/components/icon";
import { Tooltip } from "@calndrbrnd/ui/components/tooltip";

const TimezoneBadgeContent = () => {
  const { t } = useLocale();
  const { timeZone: userTimezone } = useDataTable();

  const timezoneData = useMemo(() => {
    // Use Cal's standard CURRENT_TIMEZONE constant
    const browserTimezone = CURRENT_TIMEZONE;

    if (!browserTimezone || !userTimezone || browserTimezone === userTimezone) return null;

    const tooltipContent = t("timezone_mismatch_tooltip", {
      browserTimezone,
      userTimezone,
      interpolation: { escapeValue: false },
    });

    return {
      browser: browserTimezone,
      user: userTimezone,
      tooltipContent,
      badgeContent: userTimezone,
    };
  }, [userTimezone, t]);

  // Don't render anything if no timezone mismatch
  if (!timezoneData) {
    return null;
  }

  return (
    <Tooltip content={timezoneData.tooltipContent}>
      <Icon name="info" data-testid="timezone-mismatch-badge" className="text-subtle" />
    </Tooltip>
  );
};

export const TimezoneBadge = () => {
  return (
    <NoSSR fallback={null}>
      <TimezoneBadgeContent />
    </NoSSR>
  );
};
