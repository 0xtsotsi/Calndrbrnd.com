import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { timezonesRouter } from "@calndrbrnd/trpc/server/routers/publicViewer/timezones/_router";

export default createNextApiHandler(timezonesRouter, true);
