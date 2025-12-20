import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { phoneNumberRouter } from "@calndrbrnd/trpc/server/routers/viewer/phoneNumber/_router";

export default createNextApiHandler(phoneNumberRouter);
