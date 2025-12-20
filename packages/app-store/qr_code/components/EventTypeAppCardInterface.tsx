import { useAppContextWithSchema } from "@calndrbrnd/app-store/EventTypeAppContext";
import AppCard from "@calndrbrnd/app-store/_components/AppCard";
import useIsAppEnabled from "@calndrbrnd/app-store/_utils/useIsAppEnabled";
import type { EventTypeAppCardComponent } from "@calndrbrnd/app-store/types";

import type { appDataSchema } from "../zod";
import EventTypeAppSettingsInterface from "./EventTypeAppSettingsInterface";

const EventTypeAppCard: EventTypeAppCardComponent = function EventTypeAppCard({ eventType, app, onAppInstallSuccess }) {
  const { enabled, updateEnabled } = useIsAppEnabled(app);
  const { disabled, getAppData, setAppData } = useAppContextWithSchema<typeof appDataSchema>();

  return (
    <AppCard
      onAppInstallSuccess={onAppInstallSuccess}
      app={app}
      switchOnClick={(e) => {
        updateEnabled(e);
      }}
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
