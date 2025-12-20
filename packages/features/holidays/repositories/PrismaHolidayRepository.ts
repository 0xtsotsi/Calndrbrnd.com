import type { PrismaClient } from "@calndrbrnd/prisma";
import type { Prisma } from "@calndrbrnd/prisma/client";

export class PrismaHolidayRepository {
  constructor(private prismaClient: PrismaClient) {}

  async findUserSettingsSelect<T extends Prisma.UserHolidaySettingsSelect>({
    userId,
    select,
  }: {
    userId: number;
    select: T;
  }) {
    return this.prismaClient.userHolidaySettings.findUnique({
      where: { userId },
      select,
    });
  }
}
