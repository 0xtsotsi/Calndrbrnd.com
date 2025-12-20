import { PrismaWriteService } from "@/modules/prisma/prisma-write.service";
import { Injectable } from "@nestjs/common";

import { PrismaMembershipRepository as PrismaMembershipRepositoryLib } from "@calndrbrnd/platform-libraries/repositories";
import type { PrismaClient } from "@calndrbrnd/prisma";

@Injectable()
export class PrismaMembershipRepository extends PrismaMembershipRepositoryLib {
  constructor(private readonly dbWrite: PrismaWriteService) {
    super(dbWrite.prisma as unknown as PrismaClient);
  }
}
