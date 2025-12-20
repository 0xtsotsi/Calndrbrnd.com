"use client";

import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { trpc } from "@calndrbrnd/trpc";

import { useInsightsBookingParameters } from "../../hooks/useInsightsBookingParameters";
import { ChartCard } from "../ChartCard";
import { UserStatsTable } from "../UserStatsTable";

export const HighestRatedMembersTable = () => {
  const { t } = useLocale();
  const insightsBookingParams = useInsightsBookingParameters();

  const { data, isSuccess, isPending, isError } = trpc.viewer.insights.membersWithHighestRatings.useQuery(
    insightsBookingParams,
    {
      staleTime: 180000,
      refetchOnWindowFocus: false,
      trpc: {
        context: { skipBatch: true },
      },
    }
  );


  return (
    <ChartCard title={t("highest_rated")} isPending={isPending} isError={isError}>
      {isSuccess && data ? <UserStatsTable data={data} /> : null}
    </ChartCard>
  );
};
