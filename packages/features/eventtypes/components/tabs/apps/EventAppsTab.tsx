import Link from "next/link";
import { useFormContext } from "react-hook-form";

import { EventTypeAppCard } from "@calndrbrnd/app-store/_components/EventTypeAppCardInterface";
import type { EventTypeAppCardComponentProps } from "@calndrbrnd/app-store/types";
import type { EventTypeAppsList } from "@calndrbrnd/app-store/utils";
import useAppsData from "@calndrbrnd/features/apps/hooks/useAppsData";
import useLockedFieldsManager from "@calndrbrnd/features/ee/managed-event-types/hooks/useLockedFieldsManager";
import type { FormValues, EventTypeSetupProps, EventTypeApps } from "@calndrbrnd/features/eventtypes/lib/types";
import ServerTrans from "@calndrbrnd/lib/components/ServerTrans";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { trpc } from "@calndrbrnd/trpc/react";
import { Alert } from "@calndrbrnd/ui/components/alert";
import { Button } from "@calndrbrnd/ui/components/button";
import { EmptyScreen } from "@calndrbrnd/ui/components/empty-screen";
import { Section } from "@calndrbrnd/ui/components/section";

export type EventType = Pick<EventTypeSetupProps, "eventType">["eventType"] &
  EventTypeAppCardComponentProps["eventType"];

export const EventAppsTab = ({
  eventType,
  eventTypeApps,
  isPendingApps,
}: {
  eventType: EventType;
  eventTypeApps?: EventTypeApps;
  isPendingApps: boolean;
}) => {
  const { t } = useLocale();

  const utils = trpc.useUtils();

  const formMethods = useFormContext<FormValues>();
  const installedApps =
    eventTypeApps?.items.filter((app) => app.userCredentialIds.length || app.teams.length) || [];
  const notInstalledApps =
    eventTypeApps?.items.filter((app) => !app.userCredentialIds.length && !app.teams.length) || [];

  const { getAppDataGetter, getAppDataSetter, eventTypeFormMetadata } = useAppsData();

  const { shouldLockDisableProps, isManagedEventType, isChildrenManagedEventType } = useLockedFieldsManager({
    eventType,
    translate: t,
    formMethods,
  });
  const appsDisableProps = shouldLockDisableProps("apps", { simple: true });
  const lockedText = appsDisableProps.isLocked ? "locked" : "unlocked";

  const handleAppInstallSuccess = (appId: string) => () => {
    utils.viewer.apps.appById.invalidate({ appId });
    utils.viewer.apps.integrations.invalidate({
      extendsFeature: "EventType",
      ...(eventType.team?.id && { teamId: eventType.team.id }),
    });
  };

  const appsWithTeamCredentials = eventTypeApps?.items.filter((app) => app.teams.length) || [];
  const cardsForAppsWithTeams = appsWithTeamCredentials.map((app) => {
    const appCards = [];

    if (app.userCredentialIds.length) {
      appCards.push(
        <EventTypeAppCard
          getAppData={getAppDataGetter(app.slug as EventTypeAppsList)}
          setAppData={getAppDataSetter(
            app.slug as EventTypeAppsList,
            app.categories,
            app.userCredentialIds[0]
          )}
          key={app.slug}
          app={app}
          eventType={eventType}
          eventTypeFormMetadata={eventTypeFormMetadata}
          onAppInstallSuccess={handleAppInstallSuccess(app.slug)}
        />
      );
    }

    for (const team of app.teams) {
      if (team) {
        appCards.push(
          <EventTypeAppCard
            getAppData={getAppDataGetter(app.slug as EventTypeAppsList)}
            setAppData={getAppDataSetter(app.slug as EventTypeAppsList, app.categories, team.credentialId)}
            key={app.slug + team?.credentialId}
            app={{
              ...app,
              // credentialIds: team?.credentialId ? [team.credentialId] : [],
              credentialOwner: {
                name: team.name,
                avatar: team.logoUrl,
                teamId: team.teamId,
                credentialId: team.credentialId,
              },
            }}
            eventType={eventType}
            eventTypeFormMetadata={eventTypeFormMetadata}
            disabled={shouldLockDisableProps("apps").disabled}
            onAppInstallSuccess={handleAppInstallSuccess(app.slug)}
          />
        );
      }
    }
    return appCards;
  });

  return (
    <>
      <div>
        <div className="flex flex-col gap-4 before:border-0">
          {(isManagedEventType || isChildrenManagedEventType) && (
            <Alert
              severity={appsDisableProps.isLocked ? "neutral" : "info"}
              className="mb-2"
              title={
                <ServerTrans
                  t={t}
                  i18nKey={`${lockedText}_${isManagedEventType ? "for_members" : "by_team_admins"}`}
                />
              }
              actions={<div className="flex h-full items-center">{appsDisableProps.LockedIcon}</div>}
              message={
                <ServerTrans
                  t={t}
                  i18nKey={`apps_${lockedText}_${
                    isManagedEventType ? "for_members" : "by_team_admins"
                  }_description`}
                />
              }
            />
          )}
          {!isPendingApps && !installedApps?.length ? (
            <EmptyScreen
              Icon="grid-3x3"
              headline={t("empty_installed_apps_headline")}
              description={t("empty_installed_apps_description")}
              buttonRaw={
                appsDisableProps.disabled ? (
                  <Button StartIcon="lock" color="secondary" disabled>
                    {t("locked_by_team_admin")}
                  </Button>
                ) : (
                  <Button target="_blank" color="secondary" href="/apps">
                    {t("empty_installed_apps_button")}{" "}
                  </Button>
                )
              }
            />
          ) : null}
          {cardsForAppsWithTeams.map((apps) => apps.map((cards) => cards))}
          {installedApps.map((app) => {
            if (!app.teams.length)
              return (
                <EventTypeAppCard
                  getAppData={getAppDataGetter(app.slug as EventTypeAppsList)}
                  setAppData={getAppDataSetter(
                    app.slug as EventTypeAppsList,
                    app.categories,
                    app.userCredentialIds[0]
                  )}
                  key={app.slug}
                  app={app}
                  eventType={eventType}
                  eventTypeFormMetadata={eventTypeFormMetadata}
                  onAppInstallSuccess={handleAppInstallSuccess(app.slug)}
                />
              );
          })}
        </div>
      </div>
      {/* TODO: Add back after salesforce v3 dev */}
      {!appsDisableProps.disabled && (
        <div className="bg-cal-muted mt-4 rounded-2xl p-4">
          {!isPendingApps && notInstalledApps?.length ? (
            <div className="mb-4 flex flex-col">
              <Section.Title>{t("available_apps_lower_case")}</Section.Title>
              <Section.Description>
                <ServerTrans
                  t={t}
                  i18nKey="available_apps_desc"
                  components={[
                    <Link key="available_apps_desc" className="cursor-pointer underline" href="/apps">
                      App Store
                    </Link>,
                  ]}
                />
              </Section.Description>
            </div>
          ) : null}
          <div className="bg-default border-muted flex flex-col gap-4 rounded-xl border p-3">
            {notInstalledApps?.map((app) => (
              <EventTypeAppCard
                getAppData={getAppDataGetter(app.slug as EventTypeAppsList)}
                setAppData={getAppDataSetter(app.slug as EventTypeAppsList, app.categories)}
                key={app.slug}
                app={app}
                eventType={eventType}
                eventTypeFormMetadata={eventTypeFormMetadata}
                onAppInstallSuccess={handleAppInstallSuccess(app.slug)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
