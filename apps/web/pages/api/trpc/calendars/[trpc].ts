import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { calendarsRouter } from "@calndrbrnd/trpc/server/routers/viewer/calendars/_router";

export default createNextApiHandler(calendarsRouter);
