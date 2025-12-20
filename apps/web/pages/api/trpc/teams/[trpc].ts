import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { viewerTeamsRouter } from "@calndrbrnd/trpc/server/routers/viewer/teams/_router";

export default createNextApiHandler(viewerTeamsRouter);
