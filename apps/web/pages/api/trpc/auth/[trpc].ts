import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { authRouter } from "@calndrbrnd/trpc/server/routers/viewer/auth/_router";

export default createNextApiHandler(authRouter);
