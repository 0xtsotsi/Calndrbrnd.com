import BaseCalendarService from "@calndrbrnd/lib/CalendarService";
import type { CredentialPayload } from "@calndrbrnd/types/Credential";

export default class CalDavCalendarService extends BaseCalendarService {
  constructor(credential: CredentialPayload) {
    super(credential, "caldav_calendar");
  }
}
