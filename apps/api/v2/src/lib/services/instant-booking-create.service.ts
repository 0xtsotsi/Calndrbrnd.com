import { Injectable } from "@nestjs/common";

import { InstantBookingCreateService as BaseInstantBookingCreateService } from "@calndrbrnd/platform-libraries/bookings";

@Injectable()
export class InstantBookingCreateService extends BaseInstantBookingCreateService {}
