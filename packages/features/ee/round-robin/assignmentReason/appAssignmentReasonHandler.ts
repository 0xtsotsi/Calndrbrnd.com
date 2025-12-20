import { assignmentReasonHandler as salesforceAssignmentReasonHandler } from "@calndrbrnd/app-store/salesforce/lib/assignmentReasonHandler";
import type { AssignmentReasonEnum } from "@calndrbrnd/prisma/enums";

type AppAssignmentReasonHandler = ({
  recordType,
  teamMemberEmail,
  routingFormResponseId,
  recordId,
}: {
  recordType: string;
  teamMemberEmail: string;
  routingFormResponseId: number;
  recordId?: string;
}) => Promise<{ assignmentReason: string | undefined; reasonEnum: AssignmentReasonEnum } | undefined>;

const appBookingFormHandler: Record<string, AppAssignmentReasonHandler> = {
  salesforce: salesforceAssignmentReasonHandler,
};

export default appBookingFormHandler;
