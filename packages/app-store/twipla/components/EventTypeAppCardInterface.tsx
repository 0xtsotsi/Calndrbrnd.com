import { useAppContextWithSchema } from "@calndrbrnd/app-store/EventTypeAppContext";
import AppCard from "@calndrbrnd/app-store/_components/AppCard";
import useIsAppEnabled from "@calndrbrnd/app-store/_utils/useIsAppEnabled";
import type { EventTypeAppCardComponent } from "@calndrbrnd/app-store/types";
import { TextField } from "@calndrbrnd/ui/components/form";

import type { appDataSchema } from "../zod";

const EventTypeAppCard: EventTypeAppCardComponent = function EventTypeAppCard({ app, eventType, onAppInstallSuccess }) {
  const { getAppData, setAppData, disabled } = useAppContextWithSchema<typeof appDataSchema>();
  const siteId = getAppData("SITE_ID");
  const { enabled, updateEnabled } = useIsAppEnabled(app);

  return (
    <AppCard
      onAppInstallSuccess={onAppInstallSuccess}
      app={app}
      switchOnClick={(e) => {
        updateEnabled(e);
      }}
      switchChecked={enabled}
      teamId={eventType.team?.id || undefined}>
      <TextField
        disabled={disabled}
        name="Site ID"
        value={siteId}
        placeholder="Enter your Site ID"
        onChange={(e) => {
          setAppData("SITE_ID", e.target.value);
        }}
      />
    </AppCard>
  );
};

export default EventTypeAppCard;
