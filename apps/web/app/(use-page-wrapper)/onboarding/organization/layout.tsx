import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { getServerSession } from "@calndrbrnd/features/auth/lib/getServerSession";
import { isCompanyEmail } from "@calndrbrnd/features/ee/organizations/lib/utils";
import { OnboardingPathService } from "@calndrbrnd/features/onboarding/lib/onboarding-path.service";
import { UserRepository } from "@calndrbrnd/features/users/repositories/UserRepository";
import { prisma } from "@calndrbrnd/prisma";

import { buildLegacyRequest } from "@lib/buildLegacyCtx";

export default async function OrganizationOnboardingLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession({ req: buildLegacyRequest(await headers(), await cookies()) });

  if (!session?.user?.id) {
    return redirect("/auth/login");
  }

  const userEmail = session.user.email || "";
  const userId = session.user.id;

  const gettingStartedPath = await OnboardingPathService.getGettingStartedPath(prisma);

  if (!isCompanyEmail(userEmail)) {
    return redirect(gettingStartedPath);
  }

  const userRepository = new UserRepository(prisma);
  const { organizations } = await userRepository.findOrganizations({ userId });

  if (organizations.length > 0) {
    return redirect(gettingStartedPath);
  }

  return children;
}
