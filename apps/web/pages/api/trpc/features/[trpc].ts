import { featureFlagRouter } from "@calndrbrnd/features/flags/server/router";
import { createNextApiHandler } from "@calndrbrnd/trpc/server/createNextApiHandler";

export default createNextApiHandler(featureFlagRouter, true, "features");
