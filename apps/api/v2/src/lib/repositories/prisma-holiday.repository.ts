import { PrismaWriteService } from "@/modules/prisma/prisma-write.service";
import { Injectable } from "@nestjs/common";

import { PrismaHolidayRepository as PrismaHolidayRepositoryLib } from "@calndrbrnd/platform-libraries/repositories";
import type { PrismaClient } from "@calndrbrnd/prisma";

@Injectable()
export class PrismaHolidayRepository extends PrismaHolidayRepositoryLib {
  constructor(private readonly dbWrite: PrismaWriteService) {
    super(dbWrite.prisma as unknown as PrismaClient);
  }
}

