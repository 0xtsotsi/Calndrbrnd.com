import prisma from "@calndrbrnd/prisma";
import type { Prisma } from "@calndrbrnd/prisma/client";

async function getAppKeysFromSlug(slug: string) {
  const app = await prisma.app.findUnique({ where: { slug } });
  return (app?.keys || {}) as Prisma.JsonObject;
}

export default getAppKeysFromSlug;
