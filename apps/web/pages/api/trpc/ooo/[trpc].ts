import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { oooRouter } from "@calndrbrnd/trpc/server/routers/viewer/ooo/_router";

export default createNextApiHandler(oooRouter);
