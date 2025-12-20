import { TeamRepository } from "@calndrbrnd/features/ee/teams/repositories/TeamRepository";
import type { WorkflowType } from "@calndrbrnd/features/ee/workflows/components/WorkflowListPage";
import { WorkflowRepository } from "@calndrbrnd/features/ee/workflows/repositories/WorkflowRepository";
// import dayjs from "@calndrbrnd/dayjs";
// import { getErrorFromUnknown } from "@calndrbrnd/lib/errors";
import { addPermissionsToWorkflows } from "@calndrbrnd/features/workflows/repositories/WorkflowPermissionsRepository";
import type { PrismaClient } from "@calndrbrnd/prisma";
import { MembershipRole } from "@calndrbrnd/prisma/enums";
import type { TrpcSessionUser } from "@calndrbrnd/trpc/server/types";

import type { TListInputSchema } from "./list.schema";

type ListOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    prisma: PrismaClient;
  };
  input: TListInputSchema;
};

export const listHandler = async ({ ctx, input }: ListOptions) => {
  const workflows: WorkflowType[] = [];
  const teamRepository = new TeamRepository(ctx.prisma);

  const org = await teamRepository.findOrganization({
    teamId: input.teamId,
    userId: input.userId || ctx.user.id,
  });

  if (org) {
    const activeOrgWorkflows = await WorkflowRepository.findActiveOrgWorkflows({
      orgId: org.id,
      userId: ctx.user.id,
      teamId: input.teamId!,
      excludeFormTriggers: input.includeOnlyEventTypeWorkflows,
    });
    workflows.push(
      ...activeOrgWorkflows.map((workflow) => {
        return { ...workflow, isOrg: true, readOnly: true };
      })
    );
  }

  if (input && input.teamId) {
    const teamWorkflows: WorkflowType[] = await WorkflowRepository.findTeamWorkflows({
      teamId: input.teamId,
      userId: ctx.user.id,
      excludeFormTriggers: input.includeOnlyEventTypeWorkflows,
    });
    const workflowsWithReadOnly = teamWorkflows.map((workflow) => {
      const readOnly = !!workflow.team?.members?.find(
        (member) => member.userId === ctx.user.id && member.role === MembershipRole.MEMBER
      );
      return { ...workflow, readOnly };
    });

    workflows.push(...workflowsWithReadOnly);

    // Add permissions to each workflow
    const workflowsWithPermissions = await addPermissionsToWorkflows(workflows, ctx.user.id);

    // Filter workflows based on view permission
    const filteredWorkflows = workflowsWithPermissions.filter((workflow) => workflow.permissions.canView);

    return { workflows: filteredWorkflows };
  }

  if (input && input.userId) {
    const userWorkflows: WorkflowType[] = await WorkflowRepository.findUserWorkflows({
      userId: ctx.user.id,
      excludeFormTriggers: input.includeOnlyEventTypeWorkflows,
    });

    workflows.push(...userWorkflows);

    // Add permissions to each workflow
    const workflowsWithPermissions = await addPermissionsToWorkflows(workflows, ctx.user.id);

    // Filter workflows based on view permission
    const filteredWorkflows = workflowsWithPermissions.filter((workflow) => workflow.permissions.canView);

    return { workflows: filteredWorkflows };
  }

  const allWorkflows = await WorkflowRepository.findAllWorkflows({
    userId: ctx.user.id,
    excludeFormTriggers: input.includeOnlyEventTypeWorkflows,
  });

  const workflowsWithReadOnly: WorkflowType[] = allWorkflows.map((workflow) => {
    const readOnly = !!workflow.team?.members?.find(
      (member) => member.userId === ctx.user.id && member.role === MembershipRole.MEMBER
    );

    return { readOnly, ...workflow };
  });

  workflows.push(...workflowsWithReadOnly);

  // Add permissions to each workflow
  const workflowsWithPermissions = await addPermissionsToWorkflows(workflows, ctx.user.id);

  // Filter workflows based on view permission
  const filteredWorkflows = workflowsWithPermissions.filter((workflow) => workflow.permissions.canView);

  return { workflows: filteredWorkflows };
};
