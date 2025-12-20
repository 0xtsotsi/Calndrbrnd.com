import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { creditsRouter } from "@calndrbrnd/trpc/server/routers/viewer/credits/_router";

export default createNextApiHandler(creditsRouter);
