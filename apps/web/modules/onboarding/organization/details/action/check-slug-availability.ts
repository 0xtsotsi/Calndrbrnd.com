"use server";

import { cookies, headers } from "next/headers";

import { getServerSession } from "@calndrbrnd/features/auth/lib/getServerSession";
import { RESERVED_SUBDOMAINS } from "@calndrbrnd/lib/constants";
import { prisma } from "@calndrbrnd/prisma";

import { buildLegacyRequest } from "@lib/buildLegacyCtx";

export async function checkSlugAvailability(slug: string): Promise<{
  available: boolean;
  message?: string;
}> {
  if (!slug || slug.trim() === "") {
    return { available: false, message: "Slug is required" };
  }

  // Check if slug is reserved
  if (RESERVED_SUBDOMAINS.includes(slug)) {
    return { available: false, message: "This slug is reserved" };
  }

  const session = await getServerSession({ req: buildLegacyRequest(await headers(), await cookies()) });
  if (!session?.user?.id) {
    return { available: false, message: "Unauthorized" };
  }

  // Check if slug already exists
  const existingOrg = await prisma.team.findFirst({
    where: {
      slug,
      parentId: null,
    },
    select: {
      id: true,
      isOrganization: true,
    },
  });

  if (existingOrg) {
    return { available: false, message: "This slug is already taken" };
  }

  return { available: true };
}
