import { useAppContextWithSchema } from "@calndrbrnd/app-store/EventTypeAppContext";
import AppCard from "@calndrbrnd/app-store/_components/AppCard";
import useIsAppEnabled from "@calndrbrnd/app-store/_utils/useIsAppEnabled";
import type { EventTypeAppCardComponent } from "@calndrbrnd/app-store/types";

import type { appDataSchema } from "../zod";
import EventTypeAppSettingsInterface from "./EventTypeAppSettingsInterface";

const EventTypeAppCard: EventTypeAppCardComponent = function EventTypeAppCard({ app, eventType, onAppInstallSuccess }) {
  const { getAppData, setAppData, disabled } = useAppContextWithSchema<typeof appDataSchema>();
  const { enabled, updateEnabled } = useIsAppEnabled(app);

  return (
    <AppCard
      onAppInstallSuccess={onAppInstallSuccess}
      hideSettingsIcon
      app={app}
      switchOnClick={updateEnabled}
      switchChecked={enabled}
      teamId={eventType.team?.id || undefined}>
      <EventTypeAppSettingsInterface
        eventType={eventType}
        slug={app.slug}
        disabled={disabled}
        getAppData={getAppData}
        setAppData={setAppData}
      />
    </AppCard>
  );
};

export default EventTypeAppCard;
