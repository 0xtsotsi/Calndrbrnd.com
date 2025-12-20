import type { AddMembersWithSwitchProps } from "@calndrbrnd/features/eventtypes/components/AddMembersWithSwitch";
import { AddMembersWithSwitch } from "@calndrbrnd/features/eventtypes/components/AddMembersWithSwitch";

export const AddMembersWithSwitchPlatformWrapper = ({ ...props }: AddMembersWithSwitchProps) => {
  return <AddMembersWithSwitch {...props} />;
};
