import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { credentialsRouter } from "@calndrbrnd/trpc/server/routers/viewer/credentials/_router";

export default createNextApiHandler(credentialsRouter);
