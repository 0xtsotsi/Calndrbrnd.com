"use client";

import SettingsHeader from "@calndrbrnd/features/settings/appDir/SettingsHeader";
import { APP_NAME } from "@calndrbrnd/lib/constants";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { SkeletonText, SkeletonContainer } from "@calndrbrnd/ui/components/skeleton";

export const SkeletonLoader = () => {
  const { t } = useLocale();

  return (
    <SettingsHeader
      title={t("api_keys")}
      description={t("create_first_api_key_description", { appName: APP_NAME })}
      borderInShellHeader={true}>
      <SkeletonContainer>
        <div className="divide-subtle border-subtle stack-y-6 rounded-b-lg border border-t-0 px-6 py-4">
          <SkeletonText className="h-8 w-full" />
          <SkeletonText className="h-8 w-full" />
        </div>
      </SkeletonContainer>
    </SettingsHeader>
  );
};
