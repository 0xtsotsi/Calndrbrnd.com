import type { AddMembersWithSwitchProps } from "@calndrbrnd/features/eventtypes/components/AddMembersWithSwitch";
import { AddMembersWithSwitch } from "@calndrbrnd/features/eventtypes/components/AddMembersWithSwitch";
import { trpc } from "@calndrbrnd/trpc";

export const AddMembersWithSwitchWebWrapper = ({ ...props }: AddMembersWithSwitchProps) => {
  const utils = trpc.useUtils();

  utils.viewer.appRoutingForms.getAttributesForTeam.prefetch({
    teamId: props.teamId,
  });
  return <AddMembersWithSwitch {...props} />;
};
