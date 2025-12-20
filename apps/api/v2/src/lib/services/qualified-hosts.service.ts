import { PrismaBookingRepository } from "@/lib/repositories/prisma-booking.repository";
import { FilterHostsService } from "@/lib/services/filter-hosts.service";
import { Injectable } from "@nestjs/common";

import { QualifiedHostsService as BaseQualifiedHostsService } from "@calndrbrnd/platform-libraries/slots";

@Injectable()
export class QualifiedHostsService extends BaseQualifiedHostsService {
  constructor(bookingRepository: PrismaBookingRepository, filterHostsService: FilterHostsService) {
    super({
      bookingRepo: bookingRepository,
      filterHostsService,
    });
  }
}
