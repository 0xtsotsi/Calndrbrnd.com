import EventManager from "@calndrbrnd/features/bookings/lib/EventManager";

export { getPublicEvent, type PublicEventType } from "@calndrbrnd/features/eventtypes/lib/getPublicEvent";

export { getBulkUserEventTypes, getBulkTeamEventTypes } from "@calndrbrnd/app-store/_utils/getBulkEventTypes";

export { createHandler as createEventType } from "@calndrbrnd/trpc/server/routers/viewer/eventTypes/heavy/create.handler";
export { updateHandler as updateEventType } from "@calndrbrnd/trpc/server/routers/viewer/eventTypes/heavy/update.handler";

export type { TUpdateInputSchema as TUpdateEventTypeInputSchema } from "@calndrbrnd/trpc/server/routers/viewer/eventTypes/heavy/update.schema";
export type { EventTypesPublic } from "@calndrbrnd/features/eventtypes/lib/getEventTypesPublic";
export { getEventTypesPublic } from "@calndrbrnd/features/eventtypes/lib/getEventTypesPublic";
export { parseEventTypeColor } from "@calndrbrnd/lib/isEventTypeColor";

export {
  EventTypeMetaDataSchema,
  eventTypeBookingFields,
  eventTypeLocations,
} from "@calndrbrnd/prisma/zod-utils";

export type { EventTypeMetadata } from "@calndrbrnd/prisma/zod-utils";

export { validateCustomEventName } from "@calndrbrnd/features/eventtypes/lib/eventNaming";
export { EventManager };
export { getEventTypeById } from "@calndrbrnd/features/eventtypes/lib/getEventTypeById";
export { getEventTypesByViewer } from "@calndrbrnd/features/eventtypes/lib/getEventTypesByViewer";
export type { EventType } from "@calndrbrnd/features/eventtypes/lib/getEventTypeById";
export type { EventTypesByViewer } from "@calndrbrnd/features/eventtypes/lib/getEventTypesByViewer";
export type { UpdateEventTypeReturn } from "@calndrbrnd/trpc/server/routers/viewer/eventTypes/heavy/update.handler";
export { updateNewTeamMemberEventTypes } from "@calndrbrnd/features/ee/teams/lib/queries";

export { bulkUpdateEventsToDefaultLocation } from "@calndrbrnd/app-store/_utils/bulkUpdateEventsToDefaultLocation";
export { bulkUpdateTeamEventsToDefaultLocation } from "@calndrbrnd/app-store/_utils/bulkUpdateTeamEventsToDefaultLocation";
