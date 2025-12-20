"use client";

import { CreateANewLicenseKeyForm } from "@calndrbrnd/features/ee/deployment/licensekey/CreateLicenseKeyForm";
import { WizardLayout } from "@calndrbrnd/ui/components/layout";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <WizardLayout currentStep={1} maxSteps={2}>
      {children}
    </WizardLayout>
  );
};

export default CreateANewLicenseKeyForm;
