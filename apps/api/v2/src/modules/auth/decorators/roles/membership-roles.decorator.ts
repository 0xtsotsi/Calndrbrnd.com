import { Reflector } from "@nestjs/core";

import { MembershipRole } from "@calndrbrnd/platform-libraries";

export const MembershipRoles = Reflector.createDecorator<MembershipRole[]>();
