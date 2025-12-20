import { RecurringBookingService } from "@calndrbrnd/features/bookings/lib/service/RecurringBookingService";
import { createModule, bindModuleToClassOnToken } from "@calndrbrnd/features/di/di";
import { DI_TOKENS } from "@calndrbrnd/features/di/tokens";

import { moduleLoader as regularBookingServiceModuleLoader } from "./RegularBookingService.module";

const token = DI_TOKENS.RECURRING_BOOKING_SERVICE;
const moduleToken = DI_TOKENS.RECURRING_BOOKING_SERVICE_MODULE;
export const recurringBookingServiceModule = createModule();

const loadModule = bindModuleToClassOnToken({
  module: recurringBookingServiceModule,
  moduleToken,
  token,
  classs: RecurringBookingService,
  depsMap: {
    regularBookingService: regularBookingServiceModuleLoader,
  },
});

export const moduleLoader = {
  token,
  loadModule,
};
export type { RecurringBookingService };
