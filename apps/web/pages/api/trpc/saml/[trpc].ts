import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { ssoRouter } from "@calndrbrnd/trpc/server/routers/viewer/sso/_router";

export default createNextApiHandler(ssoRouter);
