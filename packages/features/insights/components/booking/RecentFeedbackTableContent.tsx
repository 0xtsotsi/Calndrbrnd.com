"use client";

import { getUserAvatarUrl } from "@calndrbrnd/lib/getAvatarUrl";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import type { RouterOutputs } from "@calndrbrnd/trpc/react";
import { Avatar } from "@calndrbrnd/ui/components/avatar";
import { Button } from "@calndrbrnd/ui/components/button";
import { EmptyScreen } from "@calndrbrnd/ui/components/empty-screen";
import { Tooltip } from "@calndrbrnd/ui/components/tooltip";

type FeedbackData = RouterOutputs["viewer"]["insights"]["recentRatings"];

export const RecentFeedbackTableContent = ({ data }: { data: FeedbackData }) => {
  const { t } = useLocale();
  return (
    <div className="overflow-hidden rounded-md">
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.userId}
            className="border-subtle flex items-center justify-between border-b px-4 py-3 last:border-b-0">
            <div className="flex items-center">
              <Avatar
                alt={item.user.name || ""}
                size="sm"
                imageSrc={getUserAvatarUrl({ avatarUrl: item.user.avatarUrl })}
                title={item.user.name || ""}
                className="mr-3"
              />
              <div className="text-default text-sm font-medium">{item.user.name}</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-default text-sm font-medium">{item.rating}</div>
              <Tooltip content={item.feedback}>
                <div className="text-default max-w-32 md:max-w-52 truncate text-sm font-medium">
                  {item.feedback}
                </div>
              </Tooltip>
            </div>
          </div>
        ))
      ) : (
        <EmptyScreen
          Icon="zap"
          headline={t("no_ratings")}
          description={t("no_ratings_description")}
          buttonRaw={
            <Button target="_blank" color="secondary" href="/workflows">
              {t("workflows")}
            </Button>
          }
        />
      )}
    </div>
  );
};
