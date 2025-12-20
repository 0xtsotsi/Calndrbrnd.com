import { usePathname } from "next/navigation";

import { useAppContextWithSchema } from "@calndrbrnd/app-store/EventTypeAppContext";
import AppCard from "@calndrbrnd/app-store/_components/AppCard";
import useIsAppEnabled from "@calndrbrnd/app-store/_utils/useIsAppEnabled";
import type { EventTypeAppCardComponent } from "@calndrbrnd/app-store/types";
import { WEBAPP_URL } from "@calndrbrnd/lib/constants";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { Switch } from "@calndrbrnd/ui/components/form";
import { Section } from "@calndrbrnd/ui/components/section";

import type { appDataSchema } from "../zod";

const EventTypeAppCard: EventTypeAppCardComponent = function EventTypeAppCard({
  app,
  eventType,
  onAppInstallSuccess,
}) {
  const pathname = usePathname();
  const { t } = useLocale();
  const { getAppData, setAppData } = useAppContextWithSchema<typeof appDataSchema>();
  const { enabled, updateEnabled } = useIsAppEnabled(app);

  const ignoreGuests = getAppData("ignoreGuests") ?? false;
  const skipContactCreation = getAppData("skipContactCreation") ?? false;

  return (
    <AppCard
      onAppInstallSuccess={onAppInstallSuccess}
      returnTo={`${WEBAPP_URL}${pathname}?tabName=apps`}
      app={app}
      teamId={eventType.team?.id || undefined}
      switchOnClick={(e) => {
        updateEnabled(e);
      }}
      switchChecked={enabled}
      hideSettingsIcon>
      <Section.Content>
        <Section.SubSection>
          <Section.SubSectionHeader
            icon="user-plus"
            title={t("hubspot_ignore_guests")}
            labelFor="ignore-guests">
            <Switch
              size="sm"
              labelOnLeading
              checked={ignoreGuests}
              onCheckedChange={(checked) => {
                setAppData("ignoreGuests", checked);
              }}
            />
          </Section.SubSectionHeader>
        </Section.SubSection>
        <Section.SubSection>
          <Section.SubSectionHeader
            icon="user-plus"
            title={t("skip_contact_creation", { appName: "HubSpot" })}
            labelFor="skip-contact-creation">
            <Switch
              size="sm"
              labelOnLeading
              checked={skipContactCreation}
              onCheckedChange={(checked) => {
                setAppData("skipContactCreation", checked);
              }}
            />
          </Section.SubSectionHeader>
        </Section.SubSection>
      </Section.Content>
    </AppCard>
  );
};

export default EventTypeAppCard;
