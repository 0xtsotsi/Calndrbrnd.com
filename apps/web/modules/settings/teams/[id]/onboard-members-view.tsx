"use client";

import AddNewTeamMembers from "@calndrbrnd/features/ee/teams/components/AddNewTeamMembers";
import { WizardLayout } from "@calndrbrnd/ui/components/layout";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
  <WizardLayout currentStep={2} maxSteps={3}>
    {children}
  </WizardLayout>
);

export default AddNewTeamMembers;
