import { beforeEach, vi, expect } from "vitest";
import { mockReset, mockDeep } from "vitest-mock-extended";

import type * as payments from "@calndrbrnd/features/ee/teams/lib/payments";

vi.mock("@calndrbrnd/features/ee/teams/lib/payments", () => paymentsMock);

beforeEach(() => {
  mockReset(paymentsMock);
});

const paymentsMock = mockDeep<typeof payments>();

export const paymentsScenarios = {};
export const paymentsExpects = {
  expectQuantitySubscriptionToBeUpdatedForTeam: (teamId: number) => {
    expect(paymentsMock.updateQuantitySubscriptionFromStripe).toHaveBeenCalledWith(teamId);
  },
};

export default paymentsMock;
