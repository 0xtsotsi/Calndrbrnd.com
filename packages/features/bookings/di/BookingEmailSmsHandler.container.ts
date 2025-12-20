import type { BookingEmailSmsHandler } from "@calndrbrnd/features/bookings/lib/BookingEmailSmsHandler";
import { createContainer } from "@calndrbrnd/features/di/di";

import { moduleLoader as BookingEmailSmsHandlerModule } from "./BookingEmailSmsHandler.module";

const container = createContainer();

export function getInstantBookingCreateService(): BookingEmailSmsHandler {
  BookingEmailSmsHandlerModule.loadModule(container);
  return container.get<BookingEmailSmsHandler>(BookingEmailSmsHandlerModule.token);
}
