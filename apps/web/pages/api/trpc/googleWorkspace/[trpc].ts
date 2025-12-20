import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { googleWorkspaceRouter } from "@calndrbrnd/trpc/server/routers/viewer/googleWorkspace/_router";

export default createNextApiHandler(googleWorkspaceRouter);
