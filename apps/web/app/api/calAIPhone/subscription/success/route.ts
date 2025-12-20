import { defaultResponderForAppDir } from "app/api/defaultResponderForAppDir";

import handler from "@calndrbrnd/features/calAIPhone/phoneNumberSubscriptionWebhook";

export const GET = defaultResponderForAppDir(handler);
