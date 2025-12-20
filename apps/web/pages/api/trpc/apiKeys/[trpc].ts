import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { apiKeysRouter } from "@calndrbrnd/trpc/server/routers/viewer/apiKeys/_router";

export default createNextApiHandler(apiKeysRouter);
