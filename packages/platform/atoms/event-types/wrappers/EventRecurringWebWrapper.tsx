import type { EventRecurringTabProps } from "@calndrbrnd/features/eventtypes/components/tabs/recurring/EventRecurringTab";
import { EventRecurringTab } from "@calndrbrnd/features/eventtypes/components/tabs/recurring/EventRecurringTab";

const EventRecurringWebWrapper = (props: EventRecurringTabProps) => {
  return <EventRecurringTab {...props} />;
};

export default EventRecurringWebWrapper;
