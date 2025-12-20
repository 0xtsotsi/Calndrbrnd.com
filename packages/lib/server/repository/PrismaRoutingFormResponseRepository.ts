import type { PrismaClient } from "@calndrbrnd/prisma";
import prisma from "@calndrbrnd/prisma";

import type { RoutingFormResponseRepositoryInterface } from "./RoutingFormResponseRepository.interface";

export class PrismaRoutingFormResponseRepository implements RoutingFormResponseRepositoryInterface {
  constructor(private readonly prismaClient: PrismaClient = prisma) {}

  findByIdIncludeForm(id: number) {
    return this.prismaClient.app_RoutingForms_FormResponse.findUnique({
      where: {
        id,
      },
      include: {
        form: {
          select: {
            fields: true,
          },
        },
      },
    });
  }

  findByBookingUidIncludeForm(bookingUid: string) {
    return this.prismaClient.app_RoutingForms_FormResponse.findUnique({
      where: {
        routedToBookingUid: bookingUid,
      },
      include: {
        form: {
          select: {
            fields: true,
          },
        },
      },
    });
  }
}
