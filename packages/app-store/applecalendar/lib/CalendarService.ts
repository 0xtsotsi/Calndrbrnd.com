import BaseCalendarService from "@calndrbrnd/lib/CalendarService";
import type { CredentialPayload } from "@calndrbrnd/types/Credential";

export default class AppleCalendarService extends BaseCalendarService {
  constructor(credential: CredentialPayload) {
    super(credential, "apple_calendar", "https://caldav.icloud.com");
  }
}
