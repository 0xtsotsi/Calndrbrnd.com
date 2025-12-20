import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import appRoutingForms from "@calndrbrnd/trpc/server/routers/apps/routing-forms/_router";

export default createNextApiHandler(appRoutingForms);
