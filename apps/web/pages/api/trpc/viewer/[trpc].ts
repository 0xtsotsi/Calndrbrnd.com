import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { loggedInViewerRouter } from "@calndrbrnd/trpc/server/routers/loggedInViewer/_router";

export default createNextApiHandler(loggedInViewerRouter);
