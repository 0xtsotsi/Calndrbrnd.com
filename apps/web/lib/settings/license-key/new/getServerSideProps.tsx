import type { GetServerSidePropsContext } from "next";

import { getServerSession } from "@calndrbrnd/feature-auth/lib/getServerSession";
import { getOptions } from "@calndrbrnd/feature-auth/lib/next-auth-options";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession({
    req: context.req,
    authOptions: getOptions({
      getDubId: () => context.req.cookies.dub_id || context.req.cookies.dclid,
    }),
  });
  // Disable this check if we ever make this self serve.
  if (session?.user.role !== "ADMIN") {
    return {
      notFound: true,
    } as const;
  }

  return {
    props: {},
  };
};
