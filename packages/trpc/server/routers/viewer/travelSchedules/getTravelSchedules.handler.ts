import { TravelScheduleRepository } from "@calndrbrnd/features/travelSchedule/repositories/TravelScheduleRepository";
import type { TrpcSessionUser } from "@calndrbrnd/trpc/server/types";

type GetTravelSchedulesOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const getTravelSchedulesHandler = async ({ ctx }: GetTravelSchedulesOptions) => {
  return await TravelScheduleRepository.findTravelSchedulesByUserId(ctx.user.id);
};
