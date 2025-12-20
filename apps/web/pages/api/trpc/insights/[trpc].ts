import { insightsRouter } from "@calndrbrnd/trpc/server/routers/viewer/insights/_router";
import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";

export default createNextApiHandler(insightsRouter);
