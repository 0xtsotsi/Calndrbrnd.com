import { defaultResponderForAppDir } from "app/api/defaultResponderForAppDir";

import { handler } from "@calndrbrnd/features/ee/workflows/api/scheduleSMSReminders";

export const POST = defaultResponderForAppDir(handler);
