import type { NextApiRequest } from "next";

import { HttpError } from "@calndrbrnd/lib/http-error";
import prisma from "@calndrbrnd/prisma";
import type { Prisma } from "@calndrbrnd/prisma/client";
import { MembershipRole } from "@calndrbrnd/prisma/enums";

import { schemaQueryTeamId } from "~/lib/validations/shared/queryTeamId";

async function authMiddleware(req: NextApiRequest) {
  const { userId, isSystemWideAdmin } = req;
  const { teamId } = schemaQueryTeamId.parse(req.query);
  /** Admins can skip the ownership verification */
  if (isSystemWideAdmin) return;
  /** Non-members will see a 404 error which may or not be the desired behavior. */
  await prisma.team.findFirstOrThrow({
    where: { id: teamId, members: { some: { userId } } },
  });
}

export async function checkPermissions(
  req: NextApiRequest,
  role: Prisma.MembershipWhereInput["role"] = MembershipRole.OWNER
) {
  const { userId, isSystemWideAdmin } = req;
  const { teamId } = schemaQueryTeamId.parse({
    teamId: req.query.teamId,
    version: req.query.version,
    apiKey: req.query.apiKey,
  });
  return canUserAccessTeamWithRole(userId, isSystemWideAdmin, teamId, role);
}

export async function canUserAccessTeamWithRole(
  userId: number,
  isSystemWideAdmin: boolean,
  teamId: number,
  role: Prisma.MembershipWhereInput["role"] = MembershipRole.OWNER
) {
  const args: Prisma.TeamFindFirstArgs = { where: { id: teamId } };
  /** If not ADMIN then we check if the actual user belongs to team and matches the required role */
  if (!isSystemWideAdmin) args.where = { ...args.where, members: { some: { userId, role } } };
  const team = await prisma.team.findFirst(args);
  if (!team) throw new HttpError({ statusCode: 401, message: `Unauthorized: OWNER or ADMIN role required` });
  return team;
}

export default authMiddleware;
