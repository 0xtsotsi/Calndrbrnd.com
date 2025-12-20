// import { cookies, headers } from "next/headers";
// import { getServerSession } from "@calndrbrnd/features/auth/lib/getServerSession";
// import { buildLegacyRequest } from "@lib/buildLegacyCtx";
// import { getTeamsFiltersFromQuery } from "@calndrbrnd/features/filters/lib/getTeamsFiltersFromQuery";
// import { WorkflowRepository } from "@calndrbrnd/features/ee/workflows/repositories/WorkflowRepository";
import LegacyPage from "@calndrbrnd/features/ee/workflows/pages/index";

const Page = async () => {
  // const session = await getServerSession({ req: buildLegacyRequest(await headers(), await cookies()) });
  // const user = session?.user;

  // const filters = getTeamsFiltersFromQuery({ ...searchParams, ...params });

  // let filteredList;
  // try {
  //   filteredList = await WorkflowRepository.getFilteredList({
  //     userId: user?.id,
  //     input: {
  //       filters,
  //     },
  //   });
  // } catch (err) {}

  return (
    <LegacyPage
    //  filteredList={filteredList}
    />
  );
};

export default Page;
