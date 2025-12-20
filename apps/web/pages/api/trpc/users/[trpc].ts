import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { userAdminRouter } from "@calndrbrnd/trpc/server/routers/viewer/users/_router";

export default createNextApiHandler(userAdminRouter);
