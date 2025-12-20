import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { holidaysRouter } from "@calndrbrnd/trpc/server/routers/viewer/holidays/_router";

export default createNextApiHandler(holidaysRouter);
