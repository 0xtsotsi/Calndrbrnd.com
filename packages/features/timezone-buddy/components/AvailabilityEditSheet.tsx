import { useFieldArray, useForm, useFormContext } from "react-hook-form";

import dayjs from "@calndrbrnd/dayjs";
import { TimezoneSelect } from "@calndrbrnd/features/components/timezone-select";
import DateOverrideInputDialog from "@calndrbrnd/features/schedules/components/DateOverrideInputDialog";
import DateOverrideList from "@calndrbrnd/features/schedules/components/DateOverrideList";
import Schedule from "@calndrbrnd/features/schedules/components/Schedule";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { HttpError } from "@calndrbrnd/lib/http-error";
import type { RouterOutputs } from "@calndrbrnd/trpc/react";
import { trpc } from "@calndrbrnd/trpc/react";
import useMeQuery from "@calndrbrnd/trpc/react/hooks/useMeQuery";
import type { Schedule as ScheduleType, TimeRange, WorkingHours } from "@calndrbrnd/types/schedule";
import { Alert } from "@calndrbrnd/ui/components/alert";
import { Button } from "@calndrbrnd/ui/components/button";
import { Form } from "@calndrbrnd/ui/components/form";
import { Label } from "@calndrbrnd/ui/components/form";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@calndrbrnd/ui/components/sheet";
import { showToast } from "@calndrbrnd/ui/components/toast";

import type { SliderUser } from "./AvailabilitySliderTable";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser?: SliderUser | null;
}

type AvailabilityFormValues = {
  name: string;
  schedule: ScheduleType;
  dateOverrides: { ranges: TimeRange[] }[];
  timeZone: string;
  isDefault: boolean;
};

const useSettings = () => {
  const { data } = useMeQuery();
  return {
    userTimeFormat: data?.timeFormat ?? 12,
  };
};

const DateOverride = ({
  workingHours,
  disabled,
  handleSubmit,
}: {
  workingHours: WorkingHours[];
  disabled?: boolean;
  handleSubmit: (data: AvailabilityFormValues) => void;
}) => {
  const { userTimeFormat } = useSettings();

  const { append, replace, fields } = useFieldArray<AvailabilityFormValues, "dateOverrides">({
    name: "dateOverrides",
  });
  const { getValues } = useFormContext();
  const excludedDates = fields.map((field) => dayjs(field.ranges[0].start).utc().format("YYYY-MM-DD"));
  const { t } = useLocale();

  const handleAvailabilityUpdate = async () => {
    const updatedValues = getValues() as AvailabilityFormValues;
    handleSubmit(updatedValues);
  };
  return (
    <div className="">
      <Label>{t("date_overrides")}</Label>
      <div className="stack-y-2">
        <DateOverrideList
          excludedDates={excludedDates}
          replace={replace}
          fields={fields}
          hour12={Boolean(userTimeFormat === 12)}
          workingHours={workingHours}
          userTimeFormat={userTimeFormat}
          handleAvailabilityUpdate={handleAvailabilityUpdate}
        />
        <DateOverrideInputDialog
          userTimeFormat={userTimeFormat}
          workingHours={workingHours}
          excludedDates={excludedDates}
          onChange={(ranges) => {
            ranges.forEach((range) => append({ ranges: [range] }));
            handleAvailabilityUpdate();
          }}
          Trigger={
            <Button color="secondary" StartIcon="plus" data-testid="add-override" disabled={disabled}>
              {t("add_an_override")}
            </Button>
          }
        />
      </div>
    </div>
  );
};

export function AvailabilityEditSheet(props: Props) {
  // This sheet will not be rendered without a selected user
  const userId = props.selectedUser?.id as number;
  const { data, isPending } = trpc.viewer.availability.schedule.getScheduleByUserId.useQuery({
    userId: userId,
  });

  // TODO: reimplement Skeletons for this page in here
  if (isPending) return null;

  if (!data) return null;

  // We wait for the schedule to be loaded before rendering the form since `defaultValues`
  // cannot be redeclared after first render. And using `values` will trigger a form reset
  // when revalidating.
  return <AvailabilityEditSheetForm {...props} data={data} isPending={isPending} />;
}

type Data = RouterOutputs["viewer"]["availability"]["schedule"]["getScheduleByUserId"];
export function AvailabilityEditSheetForm(props: Props & { data: Data; isPending: boolean }) {
  // This sheet will not be rendered without a selected user
  const userId = props.selectedUser?.id as number;
  const { t } = useLocale();
  const utils = trpc.useUtils();

  const { data: hasEditPermission, isPending: loadingPermissions } =
    trpc.viewer.teams.hasEditPermissionForUser.useQuery({
      memberId: userId,
    });

  const { data, isPending } = props;

  const updateMutation = trpc.viewer.availability.schedule.update.useMutation({
    onSuccess: async () => {
      await utils.viewer.availability.listTeam.invalidate();
      showToast(t("success"), "success");
    },
    onError: (err) => {
      if (err instanceof HttpError) {
        const message = `${err.statusCode}: ${err.message}`;
        showToast(message, "error");
      }
    },
  });

  const form = useForm<AvailabilityFormValues>({
    defaultValues: {
      ...data,
      timeZone: data.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      schedule: data.availability || [],
    },
  });

  const watchTimezone = form.watch("timeZone");

  const handleSubmit = ({ dateOverrides, ...values }: AvailabilityFormValues) => {
    updateMutation.mutate({
      scheduleId: data.id,
      dateOverrides: dateOverrides.flatMap((override) => override.ranges),
      ...values,
    });
  };

  return (
    <Sheet open={props.open} onOpenChange={props.onOpenChange}>
      <Form
        form={form}
        id="availability-form"
        handleSubmit={async (data) => {
          // Just blocking on a UI side -> Backend will also do the validation
          if (!hasEditPermission) return;
          handleSubmit(data);
        }}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {t("edit_users_availability", {
                username: props.selectedUser?.username ?? "Nameless user",
              })}
            </SheetTitle>
          </SheetHeader>
          {!data.hasDefaultSchedule && !isPending && hasEditPermission && (
            <div className="my-2">
              <Alert severity="warning" title={t("view_only_edit_availability_not_onboarded")} />
            </div>
          )}
          {!hasEditPermission && !loadingPermissions && (
            <div className="my-2">
              <Alert severity="warning" title={t("view_only_edit_availability")} />
            </div>
          )}

          <SheetBody className="mt-4 flex flex-col stack-y-4">
            <div>
              <Label className="text-emphasis">
                <>{t("timezone")}</>
              </Label>
              <TimezoneSelect
                id="timezone"
                isDisabled={!hasEditPermission || !data.hasDefaultSchedule}
                value={watchTimezone ?? "Europe/London"}
                data-testid="timezone-select"
                onChange={(event) => {
                  if (event) form.setValue("timeZone", event.value, { shouldDirty: true });
                }}
              />
            </div>
            <div className="mt-4">
              <Label className="text-emphasis">{t("members_default_schedule")}</Label>
              {/* Remove padding from schedule without touching the component */}
              <div className="[&>*:first-child]:p-0!">
                <Schedule
                  control={form.control}
                  name="schedule"
                  weekStart={0}
                  disabled={!hasEditPermission || !data.hasDefaultSchedule}
                />
              </div>
            </div>
            <div className="mt-4">
              {data.workingHours && (
                <DateOverride
                  workingHours={data.workingHours}
                  disabled={!hasEditPermission || !data.hasDefaultSchedule}
                  handleSubmit={handleSubmit}
                />
              )}
            </div>
          </SheetBody>
          <SheetFooter>
            <SheetClose asChild>
              <Button color="secondary" className="w-full justify-center">
                {t("cancel")}
              </Button>
            </SheetClose>
            <Button
              disabled={!hasEditPermission || !data.hasDefaultSchedule}
              className="w-full justify-center"
              type="submit"
              loading={updateMutation.isPending}
              form="availability-form">
              {t("save")}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Form>
    </Sheet>
  );
}
