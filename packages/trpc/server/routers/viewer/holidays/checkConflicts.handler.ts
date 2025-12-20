import { getHolidayService } from "@calndrbrnd/lib/holidays";
import type { TrpcSessionUser } from "@calndrbrnd/trpc/server/types";

import type { TCheckConflictsSchema } from "./checkConflicts.schema";

type CheckConflictsOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TCheckConflictsSchema;
};

export type { ConflictingBooking, HolidayConflict } from "@calndrbrnd/lib/holidays/HolidayService";

export async function checkConflictsHandler({ ctx, input }: CheckConflictsOptions) {
  const holidayService = getHolidayService();
  return holidayService.checkConflicts(ctx.user.id, input.countryCode, input.disabledIds);
}

export default checkConflictsHandler;
