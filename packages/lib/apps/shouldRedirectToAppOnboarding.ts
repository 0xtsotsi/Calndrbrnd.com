import type { AppMeta } from "@calndrbrnd/types/App";

export const shouldRedirectToAppOnboarding = (appMetadata: AppMeta) => {
  const hasEventTypes = appMetadata?.extendsFeature == "EventType";
  return hasEventTypes;
};
