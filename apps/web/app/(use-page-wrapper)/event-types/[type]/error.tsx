"use client";

import Shell from "@calndrbrnd/features/shell/Shell";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { Alert } from "@calndrbrnd/ui/components/alert";

export default function Error() {
  const { t } = useLocale();
  return (
    <Shell>
      <Alert severity="error" title={t("something_went_wrong")} />
    </Shell>
  );
}
