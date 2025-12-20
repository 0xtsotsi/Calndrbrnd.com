import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { permissionsRouter } from "@calndrbrnd/trpc/server/routers/viewer/pbac/_router";

export default createNextApiHandler(permissionsRouter);
