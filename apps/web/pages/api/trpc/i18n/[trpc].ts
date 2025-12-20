import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { i18nRouter } from "@calndrbrnd/trpc/server/routers/viewer/i18n/_router";

export default createNextApiHandler(i18nRouter, true, "i18n");
