import type { appDataSchemas } from "@calndrbrnd/app-store/apps.schemas.generated";
import { EventTypeAppMetadataSchema } from "@calndrbrnd/app-store/zod-utils";
import { prisma } from "@calndrbrnd/prisma";
import type { Prisma } from "@calndrbrnd/prisma/client";
import { EventTypeMetaDataSchema } from "@calndrbrnd/prisma/zod-utils";

export class EventTypeService {
  static async getEventTypeAppDataFromId(eventTypeId: number, appSlug: keyof typeof appDataSchemas) {
    const eventType = await prisma.eventType.findUnique({
      where: {
        id: eventTypeId,
      },
      select: {
        metadata: true,
      },
    });

    if (!eventType) return null;

    return this.getEventTypeAppDataFromMetadata(eventType.metadata, appSlug);
  }

  static getEventTypeAppDataFromMetadata(metadata: Prisma.JsonValue, appSlug: keyof typeof appDataSchemas) {
    const parseEventTypeAppMetadata = EventTypeMetaDataSchema.safeParse(metadata);

    if (!parseEventTypeAppMetadata.success || !parseEventTypeAppMetadata.data?.apps) return null;

    const eventTypeAppMetadata = parseEventTypeAppMetadata.data.apps;
    const apps = EventTypeAppMetadataSchema.parse(eventTypeAppMetadata);
    const appMetadata = apps[appSlug];

    return appMetadata;
  }
}
