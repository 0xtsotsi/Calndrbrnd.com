import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { meRouter } from "@calndrbrnd/trpc/server/routers/viewer/me/_router";

export default createNextApiHandler(meRouter);
