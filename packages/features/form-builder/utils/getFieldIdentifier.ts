import { getValidRhfFieldName } from "@calndrbrnd/lib/getValidRhfFieldName";

export const getFieldIdentifier = (name: string) => {
  return getValidRhfFieldName(name);
};
