import { subdomainSuffix, getOrgFullOrigin } from "@calndrbrnd/features/ee/organizations/lib/orgDomains";
import { prisma } from "@calndrbrnd/prisma";
import { teamMetadataSchema } from "@calndrbrnd/prisma/zod-utils";

export const getBrand = async (orgId: number | null) => {
  if (!orgId) {
    return null;
  }
  const org = await prisma.team.findUnique({
    where: {
      id: orgId,
    },
    select: {
      logoUrl: true,
      name: true,
      slug: true,
      metadata: true,
      isPlatform: true,
    },
  });
  if (!org) {
    return null;
  }

  // platform orgs don't have a brand nor a domain
  if (org.isPlatform) {
    return null;
  }

  const metadata = teamMetadataSchema.parse(org.metadata);
  const slug = (org.slug || metadata?.requestedSlug) as string;
  const fullDomain = getOrgFullOrigin(slug);
  const domainSuffix = subdomainSuffix();

  return {
    ...org,
    metadata,
    slug,
    fullDomain,
    domainSuffix,
  };
};
