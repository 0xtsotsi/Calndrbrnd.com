"use client";

import getBrandColours from "@calndrbrnd/lib/getBrandColours";
import useTheme from "@calndrbrnd/lib/hooks/useTheme";
import useMeQuery from "@calndrbrnd/trpc/react/hooks/useMeQuery";
import { useCalcomTheme } from "@calndrbrnd/ui/styles";

export const useAppTheme = () => {
  const { data: user } = useMeQuery();
  const brandTheme = getBrandColours({
    lightVal: user?.brandColor,
    darkVal: user?.darkBrandColor,
  });
  useCalcomTheme(brandTheme);
  useTheme(user?.appTheme);
};
