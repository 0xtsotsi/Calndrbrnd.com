import { Reflector } from "@nestjs/core";

import type { PermissionString } from "@calndrbrnd/platform-libraries/pbac";

export const Pbac = Reflector.createDecorator<PermissionString[]>();
