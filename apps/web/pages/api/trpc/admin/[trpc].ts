import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { adminRouter } from "@calndrbrnd/trpc/server/routers/viewer/admin/_router";

export default createNextApiHandler(adminRouter);
