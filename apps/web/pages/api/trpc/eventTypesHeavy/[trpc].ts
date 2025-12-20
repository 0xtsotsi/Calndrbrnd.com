import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { eventTypesRouter } from "@calndrbrnd/trpc/server/routers/viewer/eventTypes/heavy/_router";

export default createNextApiHandler(eventTypesRouter);
