import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { paymentsRouter } from "@calndrbrnd/trpc/server/routers/viewer/payments/_router";

export default createNextApiHandler(paymentsRouter);
