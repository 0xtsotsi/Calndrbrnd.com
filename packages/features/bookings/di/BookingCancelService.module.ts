import { BookingCancelService } from "@calndrbrnd/features/bookings/lib/handleCancelBooking";
import { bindModuleToClassOnToken, createModule } from "@calndrbrnd/features/di/di";
import { DI_TOKENS } from "@calndrbrnd/features/di/tokens";
import { moduleLoader as prismaModuleLoader } from "@calndrbrnd/features/di/modules/Prisma";

const thisModule = createModule();
const token = DI_TOKENS.BOOKING_CANCEL_SERVICE;
const moduleToken = DI_TOKENS.BOOKING_CANCEL_SERVICE_MODULE;
const loadModule = bindModuleToClassOnToken({
  module: thisModule,
  moduleToken,
  token,
  classs: BookingCancelService,
  depsMap: {
    prismaClient: prismaModuleLoader,
  },
});

export const moduleLoader = {
  token,
  loadModule,
};

export type { BookingCancelService };
