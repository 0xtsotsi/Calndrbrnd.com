import type { EventRecurringTabProps } from "@calndrbrnd/features/eventtypes/components/tabs/recurring/EventRecurringTab";
import { EventRecurringTab } from "@calndrbrnd/features/eventtypes/components/tabs/recurring/EventRecurringTab";

const EventRecurringTabPlatformWrapper = (props: EventRecurringTabProps) => {
  return <EventRecurringTab {...props} />;
};

export default EventRecurringTabPlatformWrapper;
