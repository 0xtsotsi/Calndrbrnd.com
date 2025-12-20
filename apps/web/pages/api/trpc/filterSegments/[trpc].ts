import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { filterSegmentsRouter } from "@calndrbrnd/trpc/server/routers/viewer/filterSegments/_router";

export default createNextApiHandler(filterSegmentsRouter);
