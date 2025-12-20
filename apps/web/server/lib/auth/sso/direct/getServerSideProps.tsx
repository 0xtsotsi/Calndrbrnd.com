import { samlProductID, samlTenantID } from "@calndrbrnd/features/ee/sso/lib/saml";

export async function getServerSideProps() {
  return {
    props: {
      samlTenantID,
      samlProductID,
    },
  };
}
