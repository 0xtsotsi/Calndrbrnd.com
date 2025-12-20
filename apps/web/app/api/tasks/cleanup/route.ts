import { defaultResponderForAppDir } from "app/api/defaultResponderForAppDir";

import { GET as handler } from "@calndrbrnd/features/tasker/api/cleanup";

export const GET = defaultResponderForAppDir(handler);
