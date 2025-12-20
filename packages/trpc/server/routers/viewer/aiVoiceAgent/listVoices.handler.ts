import { createDefaultAIPhoneServiceProvider } from "@calndrbrnd/features/calAIPhone";

import type { TrpcSessionUser } from "../../../types";

type ListVoicesHandlerOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
  };
};

export const listVoicesHandler = async (_options: ListVoicesHandlerOptions) => {
  const aiService = createDefaultAIPhoneServiceProvider();

  return await aiService.listVoices();
};