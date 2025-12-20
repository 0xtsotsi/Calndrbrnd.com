import { BookingRepository } from "@calndrbrnd/features/bookings/repositories/BookingRepository";
import { BookingAccessService } from "@calndrbrnd/features/bookings/services/BookingAccessService";
import { managedEventReassignment } from "@calndrbrnd/features/ee/managed-event-types/reassignment";
import { prisma } from "@calndrbrnd/prisma";
import type { TrpcSessionUser } from "@calndrbrnd/trpc/server/types";

import { TRPCError } from "@trpc/server";
import type { TManagedEventReassignInputSchema } from "./managedEventReassign.schema";

type ManagedEventReassignOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
  input: TManagedEventReassignInputSchema;
};

export const managedEventReassignHandler = async ({ ctx, input }: ManagedEventReassignOptions) => {
  const { bookingId } = input;

  const bookingRepo = new BookingRepository(prisma);
  const booking = await bookingRepo.findByIdForReassignment(bookingId);

  if (!booking?.uid) {
    throw new TRPCError({ code: "NOT_FOUND", message: "Booking not found" });
  }

  const bookingAccessService = new BookingAccessService(prisma);
  const isAllowed = await bookingAccessService.doesUserIdHaveAccessToBooking({
    userId: ctx.user.id,
    bookingUid: booking.uid,
  });

  if (!isAllowed) {
    throw new TRPCError({ code: "FORBIDDEN", message: "You do not have permission" });
  }

  return await managedEventReassignment({
    bookingId,
    orgId: ctx.user.organizationId,
    reassignedById: ctx.user.id,
  });
};

export default managedEventReassignHandler;

