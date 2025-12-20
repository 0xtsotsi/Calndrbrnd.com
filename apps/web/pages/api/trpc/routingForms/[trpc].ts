import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { routingFormsRouter } from "@calndrbrnd/trpc/server/routers/viewer/routing-forms/_router";

export default createNextApiHandler(routingFormsRouter);
