import dynamic from "next/dynamic";

import { DynamicComponent } from "@calndrbrnd/app-store/_components/DynamicComponent";

export const AppSetupMap = {
  alby: dynamic(() => import("@calndrbrnd/web/components/apps/alby/Setup")),
  "apple-calendar": dynamic(() => import("@calndrbrnd/web/components/apps/applecalendar/Setup")),
  exchange: dynamic(() => import("@calndrbrnd/web/components/apps/exchangecalendar/Setup")),
  "exchange2013-calendar": dynamic(() => import("@calndrbrnd/web/components/apps/exchange2013calendar/Setup")),
  "exchange2016-calendar": dynamic(() => import("@calndrbrnd/web/components/apps/exchange2016calendar/Setup")),
  "caldav-calendar": dynamic(() => import("@calndrbrnd/web/components/apps/caldavcalendar/Setup")),
  "ics-feed": dynamic(() => import("@calndrbrnd/web/components/apps/ics-feedcalendar/Setup")),
  make: dynamic(() => import("@calndrbrnd/web/components/apps/make/Setup")),
  sendgrid: dynamic(() => import("@calndrbrnd/web/components/apps/sendgrid/Setup")),
  stripe: dynamic(() => import("@calndrbrnd/web/components/apps/stripepayment/Setup")),
  paypal: dynamic(() => import("@calndrbrnd/web/components/apps/paypal/Setup")),
  hitpay: dynamic(() => import("@calndrbrnd/web/components/apps/hitpay/Setup")),
  btcpayserver: dynamic(() => import("@calndrbrnd/web/components/apps/btcpayserver/Setup")),
};

export const AppSetupPage = (props: { slug: string }) => {
  return <DynamicComponent<typeof AppSetupMap> componentMap={AppSetupMap} {...props} />;
};

export default AppSetupPage;
