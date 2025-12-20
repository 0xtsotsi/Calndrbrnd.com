import type { NextApiRequest, NextApiResponse } from "next";

import { HttpError } from "@calndrbrnd/lib/http-error";
import { defaultHandler } from "@calndrbrnd/lib/server/defaultHandler";
import { defaultResponder } from "@calndrbrnd/lib/server/defaultResponder";
import { MembershipRole, UserPermissionRole } from "@calndrbrnd/prisma/enums";
import { createContext } from "@calndrbrnd/trpc/server/createContext";
import { viewerTeamsRouter } from "@calndrbrnd/trpc/server/routers/viewer/teams/_router";
import { createCallerFactory } from "@calndrbrnd/trpc/server/trpc";
import type { UserProfile } from "@calndrbrnd/types/UserProfile";

import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

import { withMiddleware } from "~/lib/helpers/withMiddleware";

import authMiddleware, { checkPermissions } from "./_auth-middleware";

const patchHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await checkPermissions(req, { in: [MembershipRole.OWNER, MembershipRole.ADMIN] });
  async function sessionGetter() {
    return {
      user: {
        id: req.userId,
        username: "" /* Not used in this context */,
        role: req.isSystemWideAdmin ? UserPermissionRole.ADMIN : UserPermissionRole.USER,
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
    };
  }
  /** @see https://trpc.io/docs/server-side-calls */
  const ctx = await createContext({ req, res }, sessionGetter);
  try {
    const createCaller = createCallerFactory(viewerTeamsRouter);
    const caller = createCaller(ctx);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await caller.publish(req.query as any /* Let tRPC handle this */);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      const statusCode = getHTTPStatusCodeFromError(cause);
      throw new HttpError({ statusCode, message: cause.message });
    }
    throw cause;
  }
};

export default withMiddleware()(
  defaultResponder(async (req: NextApiRequest, res: NextApiResponse) => {
    await authMiddleware(req);
    return defaultHandler({
      PATCH: Promise.resolve({ default: defaultResponder(patchHandler) }),
    })(req, res);
  })
);
