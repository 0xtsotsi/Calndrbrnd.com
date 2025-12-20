import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { availabilityRouter } from "@calndrbrnd/trpc/server/routers/viewer/availability/_router";

export default createNextApiHandler(availabilityRouter);
