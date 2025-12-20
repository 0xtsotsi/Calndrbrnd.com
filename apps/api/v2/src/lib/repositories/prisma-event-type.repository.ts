import { PrismaWriteService } from "@/modules/prisma/prisma-write.service";
import { Injectable } from "@nestjs/common";

import { PrismaEventTypeRepository as PrismaEventTypeRepositoryLib } from "@calndrbrnd/platform-libraries/repositories";
import type { PrismaClient } from "@calndrbrnd/prisma";

@Injectable()
export class PrismaEventTypeRepository extends PrismaEventTypeRepositoryLib {
  constructor(private readonly dbWrite: PrismaWriteService) {
    super(dbWrite.prisma as unknown as PrismaClient);
  }
}
