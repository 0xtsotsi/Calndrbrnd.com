export {
  ScheduleRepository,
  type FindDetailedScheduleByIdReturnType,
} from "@calndrbrnd/features/schedules/repositories/ScheduleRepository";

export {
  updateSchedule,
  type UpdateScheduleResponse,
} from "@calndrbrnd/features/schedules/services/ScheduleService";
export { UserAvailabilityService } from "@calndrbrnd/features/availability/lib/getUserAvailability";

export {
  createHandler as createScheduleHandler,
  type CreateScheduleHandlerReturn,
} from "@calndrbrnd/trpc/server/routers/viewer/availability/schedule/create.handler";
export { ZCreateInputSchema as CreateScheduleSchema } from "@calndrbrnd/trpc/server/routers/viewer/availability/schedule/create.schema";

export {
  listHandler as getAvailabilityListHandler,
  type GetAvailabilityListHandlerReturn,
} from "@calndrbrnd/trpc/server/routers/viewer/availability/list.handler";
export {
  duplicateHandler as duplicateScheduleHandler,
  type DuplicateScheduleHandlerReturn,
} from "@calndrbrnd/trpc/server/routers/viewer/availability/schedule/duplicate.handler";
