"use client";

import SettingsHeader from "@calndrbrnd/features/settings/appDir/SettingsHeader";
import { APP_NAME } from "@calndrbrnd/lib/constants";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { SkeletonText, SkeletonContainer } from "@calndrbrnd/ui/components/skeleton";

export const SkeletonLoader = () => {
  const { t } = useLocale();
  return (
    <SettingsHeader
      title={t("webhooks")}
      description={t("add_webhook_description", { appName: APP_NAME })}
      borderInShellHeader={false}
      CTA={null}>
      <SkeletonContainer>
        <div className="divide-subtle border-subtle mt-6 stack-y-6 rounded-lg border px-6 py-4">
          <SkeletonText className="h-8 w-full" />
          <SkeletonText className="h-8 w-full" />
        </div>
      </SkeletonContainer>
    </SettingsHeader>
  );
};
