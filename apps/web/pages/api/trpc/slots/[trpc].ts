import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { slotsRouter } from "@calndrbrnd/trpc/server/routers/viewer/slots/_router";

export default createNextApiHandler(slotsRouter);
