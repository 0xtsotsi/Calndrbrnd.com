import { isAuthorized } from "@calndrbrnd/features/ee/workflows/lib/isAuthorized";
import { WorkflowRepository } from "@calndrbrnd/features/ee/workflows/repositories/WorkflowRepository";
import { addPermissionsToWorkflow } from "@calndrbrnd/features/workflows/repositories/WorkflowPermissionsRepository";
import type { TrpcSessionUser } from "@calndrbrnd/trpc/server/types";

import { TRPCError } from "@trpc/server";

import type { TGetInputSchema } from "./get.schema";

type GetOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TGetInputSchema;
};

export const getHandler = async ({ ctx, input }: GetOptions) => {
  const workflow = await WorkflowRepository.getById({ id: input.id });

  const isUserAuthorized = await isAuthorized(workflow, ctx.user.id, "workflow.read");

  if (!isUserAuthorized) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }

  if (!workflow) {
    return workflow;
  }

  // Add permissions to the workflow
  const workflowWithPermissions = await addPermissionsToWorkflow(workflow, ctx.user.id);

  return workflowWithPermissions;
};
