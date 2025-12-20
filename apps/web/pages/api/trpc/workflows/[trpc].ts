import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { workflowsRouter } from "@calndrbrnd/trpc/server/routers/viewer/workflows/_router";

export default createNextApiHandler(workflowsRouter);
