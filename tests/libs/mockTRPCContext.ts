import type { NextApiRequest, NextApiResponse } from "next";

import { UserPermissionRole } from "@calndrbrnd/prisma/enums";
import type { GetSessionFn } from "@calndrbrnd/trpc/server/createContext";
import { createContext } from "@calndrbrnd/trpc/server/createContext";
import type { UserProfile } from "@calndrbrnd/types/UserProfile";

const sessionGetter: GetSessionFn = () =>
  Promise.resolve({
    user: {
      name: "",
      email: "",
      image: "",
      id: 1,
      username: "" /* Not used in this context */,
      role: UserPermissionRole.USER,
      profile: {
        id: null,
        organizationId: null,
        organization: null,
        username: "",
        upId: "",
      } satisfies UserProfile,
    },
    hasValidLicense: true /* To comply with TS signature */,
    expires: "" /* Not used in this context */,
    upId: "",
  });

export async function mockTRPCContext() {
  const req: NextApiRequest = { url: "/api/clients", headers: { "accept-language": "en" } } as NextApiRequest;
  const res: NextApiResponse = {} as NextApiResponse;
  const ctx = await createContext({ req, res }, sessionGetter);
  return ctx;
}
