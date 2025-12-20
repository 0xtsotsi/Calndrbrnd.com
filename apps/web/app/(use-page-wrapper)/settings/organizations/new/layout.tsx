import { notFound } from "next/navigation";

import { FeaturesRepository } from "@calndrbrnd/features/flags/features.repository";
import { prisma } from "@calndrbrnd/prisma";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const featuresRepository = new FeaturesRepository(prisma);
  const organizations = await featuresRepository.checkIfFeatureIsEnabledGlobally("organizations");

  if (!organizations) {
    return notFound();
  }

  return children;
}
