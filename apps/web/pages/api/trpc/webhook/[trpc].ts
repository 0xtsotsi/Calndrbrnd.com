import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { webhookRouter } from "@calndrbrnd/trpc/server/routers/viewer/webhook/_router";

export default createNextApiHandler(webhookRouter);
