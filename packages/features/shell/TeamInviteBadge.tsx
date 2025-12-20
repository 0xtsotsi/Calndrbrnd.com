import { useTeamInvites } from "@calndrbrnd/features/billing/hooks/useHasPaidPlan";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { Badge } from "@calndrbrnd/ui/components/badge";

export function TeamInviteBadge() {
  const { isPending, listInvites } = useTeamInvites();
  const { t } = useLocale();

  if (isPending || !listInvites || listInvites.length === 0) return null;

  return <Badge variant="default">{t("invite_team_notifcation_badge")}</Badge>;
}
