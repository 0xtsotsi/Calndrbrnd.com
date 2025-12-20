import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { getServerSession } from "@calndrbrnd/features/auth/lib/getServerSession";
import { FeaturesRepository } from "@calndrbrnd/features/flags/features.repository";
import { prisma } from "@calndrbrnd/prisma";

import { buildLegacyRequest } from "@lib/buildLegacyCtx";

export async function checkInsightsPagePermission() {
  const featuresRepository = new FeaturesRepository(prisma);
  const insightsEnabled = await featuresRepository.checkIfFeatureIsEnabledGlobally("insights");

  if (!insightsEnabled) {
    redirect("/");
  }

  const session = await getServerSession({ req: buildLegacyRequest(await headers(), await cookies()) });
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  return session;
}
