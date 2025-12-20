import { getAllWorkflows } from "@calndrbrnd/ee/workflows/lib/getAllWorkflows";
import type { Workflow as WorkflowType } from "@calndrbrnd/ee/workflows/lib/types";
import getOrgIdFromMemberOrTeamId from "@calndrbrnd/lib/getOrgIdFromMemberOrTeamId";
import { getTeamIdFromEventType } from "@calndrbrnd/lib/getTeamIdFromEventType";
import type { Prisma } from "@calndrbrnd/prisma/client";
import { WorkflowType as PrismaWorkflowType } from "@calndrbrnd/prisma/enums";
import { EventTypeMetaDataSchema } from "@calndrbrnd/prisma/zod-utils";

export async function getAllWorkflowsFromEventType(
  eventType: {
    workflows?: {
      workflow: WorkflowType;
    }[];
    teamId?: number | null;
    parentId?: number | null;
    parent?: {
      id?: number | null;
      teamId: number | null;
    } | null;
    metadata?: Prisma.JsonValue;
  } | null,
  userId?: number | null
) {
  if (!eventType) return [];

  const eventTypeWorkflows = eventType?.workflows?.map((workflowRel) => workflowRel.workflow) ?? [];

  const teamId = await getTeamIdFromEventType({
    eventType: {
      team: { id: eventType?.teamId ?? null },
      parentId: eventType?.parentId || eventType?.parent?.id || null,
    },
  });

  const orgId = await getOrgIdFromMemberOrTeamId({ memberId: userId, teamId });

  const isManagedEventType = !!eventType?.parent;

  const eventTypeMetadata = EventTypeMetaDataSchema.parse(eventType?.metadata || {});

  const workflowsLockedForUser = isManagedEventType
    ? !eventTypeMetadata?.managedEventConfig?.unlockedFields?.workflows
    : false;

  const allWorkflows = await getAllWorkflows({
    entityWorkflows: eventTypeWorkflows,
    userId,
    teamId,
    orgId,
    workflowsLockedForUser,
    type: PrismaWorkflowType.EVENT_TYPE,
  });

  return allWorkflows;
}
