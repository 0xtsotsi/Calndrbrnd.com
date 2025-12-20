import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { delegationCredentialRouter } from "@calndrbrnd/trpc/server/routers/viewer/delegationCredential/_router";

export default createNextApiHandler(delegationCredentialRouter);
