import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { appsRouter } from "@calndrbrnd/trpc/server/routers/viewer/apps/_router";

export default createNextApiHandler(appsRouter);
