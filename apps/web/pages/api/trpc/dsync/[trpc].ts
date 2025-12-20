import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { dsyncRouter } from "@calndrbrnd/trpc/server/routers/viewer/dsync/_router";

export default createNextApiHandler(dsyncRouter);
