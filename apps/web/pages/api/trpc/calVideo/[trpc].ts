import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { calVideoRouter } from "@calndrbrnd/trpc/server/routers/viewer/calVideo/_router";

export default createNextApiHandler(calVideoRouter);
