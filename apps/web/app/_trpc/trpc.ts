"use client";

import type { AppRouter } from "@calndrbrnd/trpc/types/server/routers/_app";

import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>({});
