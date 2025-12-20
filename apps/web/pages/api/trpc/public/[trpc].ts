import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { publicViewerRouter } from "@calndrbrnd/trpc/server/routers/publicViewer/_router";

export default createNextApiHandler(publicViewerRouter, true);
