import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { attributesRouter } from "@calndrbrnd/trpc/server/routers/viewer/attributes/_router";

export default createNextApiHandler(attributesRouter);
