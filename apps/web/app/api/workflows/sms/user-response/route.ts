import { defaultResponderForAppDir } from "app/api/defaultResponderForAppDir";

import handleSMSResponse from "@calndrbrnd/features/ee/workflows/api/handleSMSResponse";

export const POST = defaultResponderForAppDir(handleSMSResponse);
