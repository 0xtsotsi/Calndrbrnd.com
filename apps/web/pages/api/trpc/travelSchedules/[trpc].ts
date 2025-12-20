import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { travelSchedulesRouter } from "@calndrbrnd/trpc/server/routers/viewer/travelSchedules/_router";

export default createNextApiHandler(travelSchedulesRouter);
