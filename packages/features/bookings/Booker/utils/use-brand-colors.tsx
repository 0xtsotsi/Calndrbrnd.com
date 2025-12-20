import useGetBrandingColours from "@calndrbrnd/lib/getBrandColours";
import useTheme from "@calndrbrnd/lib/hooks/useTheme";
import { useCalcomTheme } from "@calndrbrnd/ui/styles";

export const useBrandColors = ({
  brandColor,
  darkBrandColor,
  theme,
}: {
  brandColor?: string;
  darkBrandColor?: string;
  theme?: string | null;
}) => {
  const brandTheme = useGetBrandingColours({
    lightVal: brandColor,
    darkVal: darkBrandColor,
  });

  useCalcomTheme(brandTheme);
  useTheme(theme);
};
