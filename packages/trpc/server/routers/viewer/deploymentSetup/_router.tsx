import { authedAdminProcedure } from "../../../procedures/authedProcedure";
import { router } from "../../../trpc";
import { ZUpdateInputSchema } from "./update.schema";
import { ZValidateLicenseInputSchema } from "./validateLicense.schema";

export const deploymentSetupRouter = router({
  update: authedAdminProcedure.input(ZUpdateInputSchema).mutation(async ({ input, ctx }) => {
    const { updateHandler } = await import("./update.handler");

    return updateHandler({
      ctx,
      input,
    });
  }),
  validateLicense: authedAdminProcedure.input(ZValidateLicenseInputSchema).query(async ({ input, ctx }) => {
    const { validateLicenseHandler } = await import("./validateLicense.handler");

    return validateLicenseHandler({
      ctx,
      input,
    });
  }),
});
