import type { GetServerSidePropsContext } from "next";

import { getServerSession } from "@calndrbrnd/features/auth/lib/getServerSession";
import { FeaturesRepository } from "@calndrbrnd/features/flags/features.repository";
import { MembershipRole } from "@calndrbrnd/prisma/enums";

export const getServerSideProps = async ({ req }: GetServerSidePropsContext) => {
  const prisma = await import("@calndrbrnd/prisma").then((mod) => mod.default);
  const featuresRepository = new FeaturesRepository(prisma);
  const organizationsEnabled = await featuresRepository.checkIfFeatureIsEnabledGlobally("organizations");
  // Check if organizations are enabled
  if (!organizationsEnabled) {
    return {
      notFound: true,
    } as const;
  }

  // Check if logged in user has an organization assigned
  const session = await getServerSession({ req });

  if (!session?.user.profile?.organizationId) {
    return {
      notFound: true,
    } as const;
  }

  // Check if logged in user has OWNER/ADMIN role in organization
  const membership = await prisma.membership.findUnique({
    where: {
      userId_teamId: {
        userId: session?.user.id,
        teamId: session?.user.profile.organizationId,
      },
    },
    select: {
      role: true,
    },
  });
  if (!membership?.role || membership?.role === MembershipRole.MEMBER) {
    return {
      notFound: true,
    } as const;
  }

  // Otherwise, all good
  return {
    props: {},
  };
};
