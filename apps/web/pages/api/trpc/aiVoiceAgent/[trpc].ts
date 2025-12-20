import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";
import { aiVoiceAgentRouter } from "@calndrbrnd/trpc/server/routers/viewer/aiVoiceAgent/_router";

export default createNextApiHandler(aiVoiceAgentRouter);
