import { trpc } from "@calndrbrnd/trpc/react";
import { Badge } from "@calndrbrnd/ui/components/badge";

export default function PendingReportsBadge() {
  const { data: pendingReportsCount } = trpc.viewer.organizations.pendingReportsCount.useQuery();
  if (!pendingReportsCount) return null;
  return (
    <Badge rounded variant="orange" className="ml-1">
      {pendingReportsCount}
    </Badge>
  );
}
