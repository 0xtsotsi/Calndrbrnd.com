"use client";

import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { Alert } from "@calndrbrnd/ui/components/alert";

export default function Error() {
  const { t } = useLocale();
  return <Alert severity="error" title={t("something_went_wrong")} />;
}
