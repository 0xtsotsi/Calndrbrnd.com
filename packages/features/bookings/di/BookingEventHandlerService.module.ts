import { BookingEventHandlerService } from "@calndrbrnd/features/bookings/lib/onBookingEvents/BookingEventHandlerService";
import { bindModuleToClassOnToken, createModule } from "@calndrbrnd/features/di/di";
import { DI_TOKENS } from "@calndrbrnd/features/di/tokens";
import { moduleLoader as hashedLinkServiceModuleLoader } from "@calndrbrnd/features/hashedLink/di/HashedLinkService.module";
import { moduleLoader as bookingAuditProducerServiceModuleLoader } from "@calndrbrnd/features/booking-audit/di/BookingAuditTaskerProducerService.module";
import { moduleLoader as loggerModuleLoader } from "@calndrbrnd/features/di/shared/services/logger.service";

const thisModule = createModule();
const token = DI_TOKENS.BOOKING_EVENT_HANDLER_SERVICE;
const moduleToken = DI_TOKENS.BOOKING_EVENT_HANDLER_SERVICE_MODULE;

const loadModule = bindModuleToClassOnToken({
  module: thisModule,
  moduleToken,
  token,
  classs: BookingEventHandlerService,
  depsMap: {
    hashedLinkService: hashedLinkServiceModuleLoader,
    bookingAuditProducerService: bookingAuditProducerServiceModuleLoader,
    log: loggerModuleLoader,
  },
});

export const moduleLoader = {
  token,
  loadModule,
};

export type { BookingEventHandlerService };
