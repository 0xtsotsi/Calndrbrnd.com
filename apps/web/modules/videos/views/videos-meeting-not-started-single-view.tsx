"use client";

import dayjs from "@calndrbrnd/dayjs";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { detectBrowserTimeFormat } from "@calndrbrnd/lib/timeFormat";
import type { inferSSRProps } from "@calndrbrnd/types/inferSSRProps";
import { Icon } from "@calndrbrnd/ui/components/icon";
import { Button } from "@calndrbrnd/ui/components/button";
import { EmptyScreen } from "@calndrbrnd/ui/components/empty-screen";

import type { getServerSideProps } from "@lib/video/meeting-not-started/[uid]/getServerSideProps";

export type PageProps = inferSSRProps<typeof getServerSideProps>;

export default function MeetingNotStarted(props: PageProps) {
  const { t } = useLocale();
  return (
    <>
      <main className="mx-auto my-24 max-w-3xl">
        <EmptyScreen
          Icon="clock"
          headline={t("this_meeting_has_not_started_yet")}
          description={
            <>
              <h2 className="mb-2 text-center font-medium">{props.booking.title}</h2>
              <p className="text-subtle text-center">
                <Icon name="calendar" className="-mt-1 mr-1 inline-block h-4 w-4" />
                {dayjs(props.booking.startTime).format(`${detectBrowserTimeFormat}, dddd DD MMMM YYYY`)}
              </p>
            </>
          }
          buttonRaw={
            <Button data-testid="return-home" href="/event-types" EndIcon="arrow-right">
              {t("go_back")}
            </Button>
          }
        />
      </main>
    </>
  );
}
