import ConnectionInfo from "@calndrbrnd/ee/sso/components/ConnectionInfo";
import LicenseRequired from "@calndrbrnd/features/ee/common/components/LicenseRequired";
import OIDCConnection from "@calndrbrnd/features/ee/sso/components/OIDCConnection";
import SAMLConnection from "@calndrbrnd/features/ee/sso/components/SAMLConnection";
import { useLocale } from "@calndrbrnd/lib/hooks/useLocale";
import { trpc } from "@calndrbrnd/trpc/react";
import { Alert } from "@calndrbrnd/ui/components/alert";
import { SkeletonText, SkeletonContainer } from "@calndrbrnd/ui/components/skeleton";

const SkeletonLoader = () => {
  return (
    <SkeletonContainer>
      <div className="divide-subtle border-subtle stack-y-6 rounded-b-xl border border-t-0 px-6 py-4">
        <SkeletonText className="h-8 w-full" />
        <SkeletonText className="h-8 w-full" />
        <SkeletonText className="h-8 w-full" />
      </div>
    </SkeletonContainer>
  );
};

export default function SSOConfiguration({ teamId }: { teamId: number | null }) {
  const { t } = useLocale();

  const { data: connection, isPending, error } = trpc.viewer.saml.get.useQuery({ teamId });

  if (isPending) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <>
        <Alert severity="warning" message={t(error.message)} className="mt-4" />
      </>
    );
  }

  // No connection found
  if (!connection) {
    return (
      <LicenseRequired>
        <div className="[&>*]:border-subtle flex flex-col [&>*:last-child]:rounded-b-xl *:border *:border-t-0 *:px-4 *:py-6 *:sm:px-6">
          <SAMLConnection teamId={teamId} connection={null} />
          <OIDCConnection teamId={teamId} connection={null} />
        </div>
      </LicenseRequired>
    );
  }

  return (
    <LicenseRequired>
      <div className="[&>*]:border-subtle flex flex-col [&>*:last-child]:rounded-b-xl *:border *:border-t-0 *:px-4 *:py-6 *:sm:px-6">
        {connection.type === "saml" ? (
          <SAMLConnection teamId={teamId} connection={connection} />
        ) : (
          <OIDCConnection teamId={teamId} connection={connection} />
        )}
        <ConnectionInfo teamId={teamId} connection={connection} />
      </div>
    </LicenseRequired>
  );
}
