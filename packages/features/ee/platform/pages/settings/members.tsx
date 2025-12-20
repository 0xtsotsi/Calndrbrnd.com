"use client";

import { checkAdminOrOwner } from "@calndrbrnd/features/auth/lib/checkAdminOrOwner";
import { UserListTable } from "@calndrbrnd/features/users/components/UserTable/UserListTable";
import type { UserListTableProps } from "@calndrbrnd/features/users/components/UserTable/UserListTable";
import { UserListTableSkeleton } from "@calndrbrnd/features/users/components/UserTable/UserListTableSkeleton";
import NoPlatformPlan from "@calndrbrnd/web/components/settings/platform/dashboard/NoPlatformPlan";
import { useGetUserAttributes } from "@calndrbrnd/web/components/settings/platform/hooks/useGetUserAttributes";
import { PlatformPricing } from "@calndrbrnd/web/components/settings/platform/pricing/platform-pricing/index";

const PlatformMembersView = (props: Omit<UserListTableProps, "facetedTeamValues" | "attributes">) => {
  const { isUserLoading, isUserBillingDataLoading, isPlatformUser, isPaidUser, userBillingData, userOrgId } =
    useGetUserAttributes();
  const currentOrg = props.org;
  const isOrgAdminOrOwner = currentOrg && checkAdminOrOwner(currentOrg.user.role);

  const canLoggedInUserSeeMembers =
    (currentOrg?.isPrivate && isOrgAdminOrOwner) || isOrgAdminOrOwner || !currentOrg?.isPrivate;

  if (isUserLoading || (isUserBillingDataLoading && !userBillingData)) {
    return <UserListTableSkeleton />;
  }

  if (isPlatformUser && !isPaidUser)
    return (
      <PlatformPricing
        teamId={userOrgId}
        heading={
          <div className="mb-5 text-center text-2xl font-semibold">
            <h1>Subscribe to Platform</h1>
          </div>
        }
      />
    );

  return isPlatformUser ? (
    <div>{canLoggedInUserSeeMembers && <UserListTable {...props} />}</div>
  ) : (
    <NoPlatformPlan />
  );
};

export default PlatformMembersView;
