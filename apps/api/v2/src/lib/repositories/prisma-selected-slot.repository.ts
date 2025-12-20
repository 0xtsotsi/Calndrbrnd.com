import { PrismaWriteService } from "@/modules/prisma/prisma-write.service";
import { Injectable } from "@nestjs/common";

import { PrismaSelectedSlotRepository as PrismaSelectedSlotRepositoryLib } from "@calndrbrnd/platform-libraries/repositories";
import type { PrismaClient } from "@calndrbrnd/prisma";

@Injectable()
export class PrismaSelectedSlotRepository extends PrismaSelectedSlotRepositoryLib {
  constructor(private readonly dbWrite: PrismaWriteService) {
    super(dbWrite.prisma as unknown as PrismaClient);
  }
}
