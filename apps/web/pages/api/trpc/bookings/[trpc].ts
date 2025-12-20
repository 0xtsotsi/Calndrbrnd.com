import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { bookingsRouter } from "@calndrbrnd/trpc/server/routers/viewer/bookings/_router";

export default createNextApiHandler(bookingsRouter);
