import { enrichUserWithDelegationCredentialsIncludeServiceAccountKey } from "@calndrbrnd/app-store/delegationCredential";
import { withSelectedCalendars } from "@calndrbrnd/lib/server/withSelectedCalendars";
import { availabilityUserSelect } from "@calndrbrnd/prisma";
import { prisma } from "@calndrbrnd/prisma";
import type { Prisma } from "@calndrbrnd/prisma/client";
import { credentialForCalendarServiceSelect } from "@calndrbrnd/prisma/selects/credential";

export async function findUsersForAvailabilityCheck({ where }: { where: Prisma.UserWhereInput }) {
  const user = await prisma.user.findFirst({
    where,
    select: {
      ...availabilityUserSelect,
      selectedCalendars: true,
      credentials: {
        select: credentialForCalendarServiceSelect,
      },
    },
  });

  if (!user) {
    return null;
  }

  return await enrichUserWithDelegationCredentialsIncludeServiceAccountKey({
    user: withSelectedCalendars(user),
  });
}
