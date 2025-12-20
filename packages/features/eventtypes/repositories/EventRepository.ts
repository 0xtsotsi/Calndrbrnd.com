import { getPublicEvent } from "@calndrbrnd/features/eventtypes/lib/getPublicEvent";
import prisma from "@calndrbrnd/prisma";
import type { TEventInputSchema } from "@calndrbrnd/trpc/server/routers/publicViewer/event.schema";

export class EventRepository {
  static async getPublicEvent(input: TEventInputSchema, userId?: number) {
    const event = await getPublicEvent(
      input.username,
      input.eventSlug,
      input.isTeamEvent,
      input.org,
      prisma,
      input.fromRedirectOfNonOrgLink,
      userId
    );
    return event;
  }
}
