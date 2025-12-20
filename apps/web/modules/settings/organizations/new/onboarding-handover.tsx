"use client";

import { AdminOnboardingHandover } from "@calndrbrnd/features/ee/organizations/components";
import { WizardLayout } from "@calndrbrnd/ui/components/layout";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <WizardLayout currentStep={2} maxSteps={2}>
      {children}
    </WizardLayout>
  );
};

export default AdminOnboardingHandover;
