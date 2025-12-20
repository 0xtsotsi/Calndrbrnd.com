import type { SelectedSlots } from "@calndrbrnd/prisma/client";

export type SelectedSlot = Pick<
  SelectedSlots,
  "id" | "uid" | "eventTypeId" | "slotUtcStartDate" | "slotUtcEndDate" | "releaseAt" | "isSeat"
>;
