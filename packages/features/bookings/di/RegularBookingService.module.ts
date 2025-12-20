import { moduleLoader as bookingEventHandlerModuleLoader } from "@calndrbrnd/features/bookings/di/BookingEventHandlerService.module";
import { RegularBookingService } from "@calndrbrnd/features/bookings/lib/service/RegularBookingService";
import { bindModuleToClassOnToken, createModule, type ModuleLoader } from "@calndrbrnd/features/di/di";
import { moduleLoader as bookingRepositoryModuleLoader } from "@calndrbrnd/features/di/modules/Booking";
import { moduleLoader as checkBookingAndDurationLimitsModuleLoader } from "@calndrbrnd/features/di/modules/CheckBookingAndDurationLimits";
import { moduleLoader as featuresRepositoryModuleLoader } from "@calndrbrnd/features/di/modules/Features";
import { moduleLoader as luckyUserServiceModuleLoader } from "@calndrbrnd/features/di/modules/LuckyUser";
import { moduleLoader as prismaModuleLoader } from "@calndrbrnd/features/di/modules/Prisma";
import { moduleLoader as userRepositoryModuleLoader } from "@calndrbrnd/features/di/modules/User";
import { DI_TOKENS } from "@calndrbrnd/features/di/tokens";
import { moduleLoader as hashedLinkServiceModuleLoader } from "@calndrbrnd/features/hashedLink/di/HashedLinkService.module";

import { moduleLoader as bookingEmailAndSmsTaskerModuleLoader } from "./tasker/BookingEmailAndSmsTasker.module";

const thisModule = createModule();
const token = DI_TOKENS.REGULAR_BOOKING_SERVICE;
const moduleToken = DI_TOKENS.REGULAR_BOOKING_SERVICE_MODULE;
const loadModule = bindModuleToClassOnToken({
  module: thisModule,
  moduleToken,
  token,
  classs: RegularBookingService,
  depsMap: {
    // TODO: In a followup PR, we aim to remove prisma dependency and instead inject the repositories as dependencies.
    prismaClient: prismaModuleLoader,
    checkBookingAndDurationLimitsService: checkBookingAndDurationLimitsModuleLoader,
    bookingRepository: bookingRepositoryModuleLoader,
    luckyUserService: luckyUserServiceModuleLoader,
    userRepository: userRepositoryModuleLoader,
    hashedLinkService: hashedLinkServiceModuleLoader,
    bookingEmailAndSmsTasker: bookingEmailAndSmsTaskerModuleLoader,
    featuresRepository: featuresRepositoryModuleLoader,
    bookingEventHandler: bookingEventHandlerModuleLoader,
  },
});

export const moduleLoader = {
  token,
  loadModule,
} satisfies ModuleLoader;

export type { RegularBookingService };
