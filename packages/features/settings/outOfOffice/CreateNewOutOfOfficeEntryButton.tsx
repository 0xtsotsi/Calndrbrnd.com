"use client";

import { checkAdminOrOwner } from "@calndrbrnd/features/auth/lib/checkAdminOrOwner";
import { useCompatSearchParams } from "@calndrbrnd/lib/hooks/useCompatSearchParams";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { trpc } from "@calndrbrnd/trpc/react";
import useMeQuery from "@calndrbrnd/trpc/react/hooks/useMeQuery";
import type { ButtonProps } from "@calndrbrnd/ui/components/button";
import { Button } from "@calndrbrnd/ui/components/button";

import { OutOfOfficeTab } from "./OutOfOfficeToggleGroup";

const CreateNewOutOfOfficeEntryButton = ({
  size,
  onClick,
  ...rest
}: {
  size?: ButtonProps["size"];
  onClick: () => void;
  "data-testid"?: string;
}) => {
  const { t } = useLocale();
  const me = useMeQuery();
  const { data: orgData } = trpc.viewer.organizations.listCurrent.useQuery();
  const isOrgAdminOrOwner = orgData && checkAdminOrOwner(orgData.user.role);
  const hasTeamOOOAdminAccess = isOrgAdminOrOwner || me?.data?.isTeamAdminOrOwner;

  const params = useCompatSearchParams();
  const selectedTab = params?.get("type") ?? OutOfOfficeTab.MINE;

  return (
    <Button
      color="primary"
      size={size ?? "base"}
      className="flex items-center justify-between px-2 md:px-4"
      StartIcon="plus"
      onClick={onClick}
      data-testid={rest["data-testid"]}
      disabled={selectedTab === OutOfOfficeTab.TEAM && !hasTeamOOOAdminAccess}>
      <span className="sr-only md:not-sr-only md:inline">{t("add")}</span>
    </Button>
  );
};

export default CreateNewOutOfOfficeEntryButton;
