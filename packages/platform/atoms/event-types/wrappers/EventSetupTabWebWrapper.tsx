import { useSession } from "next-auth/react";

import { useOrgBranding } from "@calndrbrnd/features/ee/organizations/context/provider";
import type { EventSetupTabProps } from "@calndrbrnd/features/eventtypes/components/tabs/setup/EventSetupTab";
import { EventSetupTab } from "@calndrbrnd/features/eventtypes/components/tabs/setup/EventSetupTab";
import { WEBSITE_URL } from "@calndrbrnd/lib/constants";
import { localeOptions } from "@calndrbrnd/lib/i18n";

const EventSetupTabWebWrapper = (props: EventSetupTabProps) => {
  const orgBranding = useOrgBranding();
  const session = useSession();
  const urlPrefix = orgBranding
    ? orgBranding?.fullDomain.replace(/^(https?:|)\/\//, "")
    : `${WEBSITE_URL?.replace(/^(https?:|)\/\//, "")}`;
  return (
    <EventSetupTab
      urlPrefix={urlPrefix}
      hasOrgBranding={!!orgBranding}
      orgId={session.data?.user.org?.id}
      localeOptions={localeOptions}
      {...props}
    />
  );
};

export default EventSetupTabWebWrapper;
