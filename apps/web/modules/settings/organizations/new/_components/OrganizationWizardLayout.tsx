"use client";

import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { Alert } from "@calndrbrnd/ui/components/alert";
import { WizardLayout } from "@calndrbrnd/ui/components/layout";

interface OrganizationWizardLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  maxSteps?: number;
  isOptionalCallback?: () => void;
  footer?: React.ReactNode;
}

export function OrganizationWizardLayout({
  children,
  currentStep,
  maxSteps = 5,
  isOptionalCallback,
  footer,
}: OrganizationWizardLayoutProps) {
  const { t } = useLocale();

  const defaultFooter = <Alert severity="warning" message={t("organization_trial_workspace_warning")} />;

  return (
    <WizardLayout
      currentStep={currentStep}
      maxSteps={maxSteps}
      isOptionalCallback={isOptionalCallback}
      footer={footer ?? defaultFooter}>
      {children}
    </WizardLayout>
  );
}
