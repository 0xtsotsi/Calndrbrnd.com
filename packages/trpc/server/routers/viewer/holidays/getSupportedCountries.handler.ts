import { getHolidayService } from "@calndrbrnd/lib/holidays";

export async function getSupportedCountriesHandler() {
  const holidayService = getHolidayService();
  return holidayService.getSupportedCountries();
}

export default getSupportedCountriesHandler;
