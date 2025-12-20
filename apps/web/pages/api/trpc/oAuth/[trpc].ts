import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { oAuthRouter } from "@calndrbrnd/trpc/server/routers/viewer/oAuth/_router";

export default createNextApiHandler(oAuthRouter);
