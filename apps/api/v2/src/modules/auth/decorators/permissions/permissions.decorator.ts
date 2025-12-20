import { Reflector } from "@nestjs/core";

import { PERMISSIONS } from "@calndrbrnd/platform-constants";

export const Permissions = Reflector.createDecorator<(typeof PERMISSIONS)[number][]>();
