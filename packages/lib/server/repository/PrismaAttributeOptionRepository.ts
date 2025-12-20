import prisma from "@calndrbrnd/prisma";
import type { Prisma } from "@calndrbrnd/prisma/client";

export class PrismaAttributeOptionRepository {
  static async findMany({ orgId }: { orgId: number }) {
    return prisma.attributeOption.findMany({
      where: {
        attribute: {
          teamId: orgId,
        },
      },
      select: {
        id: true,
        value: true,
        slug: true,
        attributeId: true,
      },
    });
  }

  static async createMany({ createManyInput }: { createManyInput: Prisma.AttributeOptionCreateManyInput[] }) {
    const { count } = await prisma.attributeOption.createMany({
      data: createManyInput,
    });

    return {
      count,
    };
  }
}
