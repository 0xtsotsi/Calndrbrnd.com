import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { viewerOrganizationsRouter } from "@calndrbrnd/trpc/server/routers/viewer/organizations/_router";

export default createNextApiHandler(viewerOrganizationsRouter);
