import { beforeEach, vi } from "vitest";
import { mockReset, mockDeep } from "vitest-mock-extended";

import type * as videoClient from "@calndrbrnd/features/conferencing/lib/videoClient";

vi.mock("@calndrbrnd/features/conferencing/lib/videoClient", () => videoClientMock);

beforeEach(() => {
  mockReset(videoClientMock);
});

const videoClientMock = mockDeep<typeof videoClient>();
export default videoClientMock;
