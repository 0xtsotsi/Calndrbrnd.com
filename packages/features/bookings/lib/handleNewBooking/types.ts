import type { TFunction } from "i18next";

import type { PaymentAppData } from "@calndrbrnd/app-store/_utils/payments/getPaymentAppData";
import type { EventTypeAppsList } from "@calndrbrnd/app-store/utils";
import type { GetUserAvailabilityResult } from "@calndrbrnd/features/availability/lib/getUserAvailability";
import type { userSelect } from "@calndrbrnd/prisma";
import type { App } from "@calndrbrnd/prisma/client";
import type { Prisma } from "@calndrbrnd/prisma/client";
import type { SelectedCalendar } from "@calndrbrnd/prisma/client";
import type { CredentialForCalendarService } from "@calndrbrnd/types/Credential";

type User = Omit<Prisma.UserGetPayload<{ select: typeof userSelect }>, "selectedCalendars">;

export type Invitee = {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  timeZone: string;
  phoneNumber?: string;
  language: {
    translate: TFunction;
    locale: string;
  };
}[];

export interface IEventTypePaymentCredentialType {
  appId: EventTypeAppsList;
  app: {
    categories: App["categories"];
    dirName: string;
  };
  key: Prisma.JsonValue;
}

export type IsFixedAwareUser = User & {
  isFixed: boolean;
  credentials: CredentialForCalendarService[];
  organization?: { slug: string };
  priority?: number;
  weight?: number;
  userLevelSelectedCalendars: SelectedCalendar[];
  allSelectedCalendars: SelectedCalendar[];
  groupId?: string | null;
  availabilityData?: GetUserAvailabilityResult;
};

export type { PaymentAppData };

export type Tracking = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};
