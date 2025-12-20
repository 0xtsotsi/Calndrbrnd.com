"use client";

import NoSSR from "@calndrbrnd/lib/components/NoSSR";

import { UsersTable } from "../components/UsersTable";

const DeploymentUsersListPage = () => {
  return (
    <>
      <NoSSR>
        <UsersTable />
      </NoSSR>
    </>
  );
};

export default DeploymentUsersListPage;
