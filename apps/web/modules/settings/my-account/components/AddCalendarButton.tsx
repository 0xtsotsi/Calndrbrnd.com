"use client";

import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { Button } from "@calndrbrnd/ui/components/button";

const AddCalendarButton = () => {
  const { t } = useLocale();

  return (
    <>
      <Button color="secondary" StartIcon="plus" href="/apps/categories/calendar">
        {t("add_calendar")}
      </Button>
    </>
  );
};

export default AddCalendarButton;
