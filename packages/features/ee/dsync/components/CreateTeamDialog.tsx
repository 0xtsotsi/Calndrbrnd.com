import { Dialog } from "@calndrbrnd/features/components/controlled-dialog";
import { CreateANewTeamForm } from "@calndrbrnd/features/ee/teams/components";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { trpc } from "@calndrbrnd/trpc/react";
import { DialogContent } from "@calndrbrnd/ui/components/dialog";
import { revalidateTeamsList } from "@calndrbrnd/web/app/(use-page-wrapper)/(main-nav)/teams/actions";

interface CreateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateTeamDialog = (props: CreateTeamDialogProps) => {
  const { open, onOpenChange } = props;
  const { t } = useLocale();

  const utils = trpc.useUtils();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent type="creation" title={t("create_new_team")} description={t("team_will_be_under_org")}>
        <CreateANewTeamForm
          inDialog
          submitLabel="Create"
          onCancel={() => onOpenChange(false)}
          onSuccess={async () => {
            await utils.viewer.dsync.teamGroupMapping.get.invalidate();
            await utils.viewer.teams.list.invalidate();
            revalidateTeamsList();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;
