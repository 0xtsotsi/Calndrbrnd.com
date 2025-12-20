import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { deploymentSetupRouter } from "@calndrbrnd/trpc/server/routers/viewer/deploymentSetup/_router";

export default createNextApiHandler(deploymentSetupRouter);
