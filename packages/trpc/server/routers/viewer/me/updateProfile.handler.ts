import { keyBy } from "lodash";
import type { GetServerSidePropsContext, NextApiResponse } from "next";

import { getPremiumMonthlyPlanPriceId } from "@calndrbrnd/app-store/stripepayment/lib/utils";
import { getBillingProviderService } from "@calndrbrnd/ee/billing/di/containers/Billing";
import { sendChangeOfEmailVerification } from "@calndrbrnd/features/auth/lib/verifyEmail";
import { updateNewTeamMemberEventTypes } from "@calndrbrnd/features/ee/teams/lib/queries";
import { FeaturesRepository } from "@calndrbrnd/features/flags/features.repository";
import { checkUsername } from "@calndrbrnd/features/profile/lib/checkUsername";
import { ScheduleRepository } from "@calndrbrnd/features/schedules/repositories/ScheduleRepository";
import hasKeyInMetadata from "@calndrbrnd/lib/hasKeyInMetadata";
import { HttpError } from "@calndrbrnd/lib/http-error";
import logger from "@calndrbrnd/lib/logger";
import { uploadAvatar } from "@calndrbrnd/lib/server/avatar";
import { getTranslation } from "@calndrbrnd/lib/server/i18n";
import { resizeBase64Image } from "@calndrbrnd/lib/server/resizeBase64Image";
import slugify from "@calndrbrnd/lib/slugify";
import { validateBookerLayouts } from "@calndrbrnd/lib/validateBookerLayouts";
import { prisma } from "@calndrbrnd/prisma";
import { Prisma } from "@calndrbrnd/prisma/client";
import type { JsonValue } from "@calndrbrnd/types/Json";
import { userMetadata as userMetadataSchema } from "@calndrbrnd/prisma/zod-utils";
import type { TrpcSessionUser } from "@calndrbrnd/trpc/server/types";

import { TRPCError } from "@trpc/server";

import { updateUserMetadataAllowedKeys, type TUpdateProfileInputSchema } from "./updateProfile.schema";

const log = logger.getSubLogger({ prefix: ["updateProfile"] });
type UpdateProfileOptions = {
  ctx: {
    user: NonNullable<TrpcSessionUser>;
    res?: NextApiResponse | GetServerSidePropsContext["res"];
  };
  input: TUpdateProfileInputSchema;
};

export const updateProfileHandler = async ({ ctx, input }: UpdateProfileOptions) => {
  const { user } = ctx;
  const billingService = getBillingProviderService();
  const userMetadata = handleUserMetadata({ ctx, input });
  const locale = input.locale || user.locale;
  const featuresRepository = new FeaturesRepository(prisma);
  const emailVerification = await featuresRepository.checkIfFeatureIsEnabledGlobally("email-verification");

  const { travelSchedules, ...rest } = input;

  const secondaryEmails = input?.secondaryEmails || [];
  delete input.secondaryEmails;

  const data: Prisma.UserUpdateInput = {
    ...rest,
    metadata: userMetadata,
    secondaryEmails: undefined,
  };

  let isPremiumUsername = false;

  const layoutError = validateBookerLayouts(input?.metadata?.defaultBookerLayouts || null);
  if (layoutError) {
    const t = await getTranslation(locale, "common");
    throw new TRPCError({ code: "BAD_REQUEST", message: t(layoutError) });
  }

  if (input.username && !user.organizationId) {
    const username = slugify(input.username);
    // Only validate if we're changing usernames
    if (username !== user.username) {
      data.username = username;
      const response = await checkUsername(username);
      isPremiumUsername = response.premium;
      if (!response.available) {
        const t = await getTranslation(locale, "common");
        throw new TRPCError({ code: "BAD_REQUEST", message: t("username_already_taken") });
      }
    }
  } else if (input.username && user.organizationId && user.movedToProfileId) {
    // don't change user.username if we have profile.username
    delete data.username;
  }

  if (isPremiumUsername) {
    const stripeCustomerId = userMetadata?.stripeCustomerId;
    const isPremium = userMetadata?.isPremium;
    if (!isPremium || !stripeCustomerId) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "User is not premium" });
    }

    const stripeSubscriptions = await billingService.getSubscriptions(stripeCustomerId);

    if (!stripeSubscriptions || !stripeSubscriptions.length) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No stripeSubscription found",
      });
    }

    // Iterate over subscriptions and look for premium product id and status active
    // @TODO: iterate if stripeSubscriptions.hasMore is true
    const isPremiumUsernameSubscriptionActive = stripeSubscriptions.some(
      (subscription) =>
        subscription.items.data[0].price.id === getPremiumMonthlyPlanPriceId() &&
        subscription.status === "active"
    );

    if (!isPremiumUsernameSubscriptionActive) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "You need to pay for premium username",
      });
    }
  }
  const hasEmailBeenChanged = data.email && user.email !== data.email;

  let secondaryEmail:
    | {
        id: number;
        emailVerified: Date | null;
      }
    | null
    | undefined;
  const primaryEmailVerified = user.emailVerified;
  if (hasEmailBeenChanged) {
    secondaryEmail = await prisma.secondaryEmail.findUnique({
      where: {
        email: input.email,
        userId: user.id,
      },
      select: {
        id: true,
        emailVerified: true,
      },
    });
    if (emailVerification) {
      if (secondaryEmail?.emailVerified) {
        data.emailVerified = secondaryEmail.emailVerified;
      } else {
        // Set metadata of the user so we can set it to this updated email once it is confirmed
        data.metadata = {
          ...userMetadata,
          emailChangeWaitingForVerification: input.email?.toLocaleLowerCase(),
        };

        // Check to ensure this email isn't in use
        // Don't include email in the data payload if we need to verify
        delete data.email;
      }
    } else {
      log.warn("Profile Update - Email verification is disabled - Skipping");
      data.emailVerified = null;
    }
  }

  // if defined AND a base 64 string, upload and update the avatar URL
  if (
    input.avatarUrl &&
    (input.avatarUrl.startsWith("data:image/png;base64,") ||
      input.avatarUrl.startsWith("data:image/jpeg;base64,") ||
      input.avatarUrl.startsWith("data:image/jpg;base64,"))
  ) {
    data.avatarUrl = await uploadAvatar({
      avatar: await resizeBase64Image(input.avatarUrl),
      userId: user.id,
    });
  }

  if (input.completedOnboarding) {
    const userTeams = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        teams: {
          select: {
            id: true,
          },
        },
      },
    });
    if (userTeams && userTeams.teams.length > 0) {
      await Promise.all(
        userTeams.teams.map(async (team) => {
          await updateNewTeamMemberEventTypes(user.id, team.id);
        })
      );
    }
  }

  if (travelSchedules) {
    const existingSchedules = await prisma.travelSchedule.findMany({
      where: {
        userId: user.id,
      },
    });

    const schedulesToDelete = existingSchedules.filter(
      (schedule) =>
        !travelSchedules || !travelSchedules.find((scheduleInput) => scheduleInput.id === schedule.id)
    );

    await prisma.travelSchedule.deleteMany({
      where: {
        userId: user.id,
        id: {
          in: schedulesToDelete.map((schedule) => schedule.id) as number[],
        },
      },
    });

    await prisma.travelSchedule.createMany({
      data: travelSchedules
        .filter((schedule) => !schedule.id)
        .map((schedule) => {
          return {
            userId: user.id,
            startDate: schedule.startDate,
            endDate: schedule.endDate,
            timeZone: schedule.timeZone,
          };
        }),
    });
  }

  const updatedUserSelect = {
    select: {
      id: true,
      username: true,
      email: true,
      identityProvider: true,
      identityProviderId: true,
      metadata: true,
      name: true,
      createdDate: true,
      avatarUrl: true,
      locale: true,
      schedules: {
        select: {
          id: true,
        },
      },
    },
  } satisfies Prisma.UserDefaultArgs;

  // Explicit type to avoid Prisma.UserGetPayload conditional types leaking into .d.ts files
  type UpdatedUserResult = {
    id: number;
    username: string | null;
    email: string;
    identityProvider: string | null;
    identityProviderId: string | null;
    metadata: JsonValue;
    name: string | null;
    createdDate: Date;
    avatarUrl: string | null;
    locale: string | null;
    schedules: { id: number }[];
  };

  let updatedUser: UpdatedUserResult;

  try {
    updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data,
      ...updatedUserSelect,
    });
  } catch (e) {
    // Catch unique constraint failure on email field.
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      const meta = e.meta as { target: string[] };
      if (meta.target.indexOf("email") !== -1) {
        throw new HttpError({ statusCode: 409, message: "email_already_used" });
      }
    }
    throw e; // make sure other errors are rethrown
  }

  if (user.timeZone !== data.timeZone && updatedUser.schedules.length > 0) {
    // on timezone change update timezone of default schedule
    const scheduleRepository = new ScheduleRepository(prisma);
    const defaultScheduleId = await scheduleRepository.getDefaultScheduleId(user.id);

    if (!user.defaultScheduleId) {
      // set default schedule if not already set
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          defaultScheduleId,
        },
      });
    }

    await prisma.schedule.updateMany({
      where: {
        id: defaultScheduleId,
      },
      data: {
        timeZone: data.timeZone,
      },
    });
  }

  // Notify stripe about the change
  if (updatedUser && updatedUser.metadata && hasKeyInMetadata(updatedUser, "stripeCustomerId")) {
    const stripeCustomerId = `${updatedUser.metadata.stripeCustomerId}`;
    await billingService.updateCustomer({
      customerId: stripeCustomerId,
      email: updatedUser.email,
      userId: updatedUser.id,
    });
  }

  if (updatedUser && hasEmailBeenChanged) {
    // Skip sending verification email when user tries to change his primary email to a verified secondary email
    if (secondaryEmail?.emailVerified) {
      secondaryEmails.push({
        id: secondaryEmail.id,
        email: user.email,
        isDeleted: false,
      });
    } else {
      await sendChangeOfEmailVerification({
        user: {
          username: updatedUser.username ?? "Nameless User",
          emailFrom: user.email,
          // We know email has been changed here so we can use input

          emailTo: input.email!,
        },
      });
    }
  }

  if (secondaryEmails.length) {
    const recordsToDelete = secondaryEmails
      .filter((secondaryEmail) => secondaryEmail.isDeleted)
      .map((secondaryEmail) => secondaryEmail.id);
    if (recordsToDelete.length) {
      await prisma.secondaryEmail.deleteMany({
        where: {
          id: {
            in: recordsToDelete,
          },
          userId: updatedUser.id,
        },
      });
    }

    const modifiedRecords = secondaryEmails.filter((secondaryEmail) => !secondaryEmail.isDeleted);
    if (modifiedRecords.length) {
      const secondaryEmailsFromDB = await prisma.secondaryEmail.findMany({
        where: {
          id: {
            in: secondaryEmails.map((secondaryEmail) => secondaryEmail.id),
          },
          userId: updatedUser.id,
        },
      });

      const keyedSecondaryEmailsFromDB = keyBy(secondaryEmailsFromDB, "id");

      const recordsToModifyQueue = modifiedRecords.map((updated) => {
        let emailVerified = keyedSecondaryEmailsFromDB[updated.id].emailVerified;
        if (secondaryEmail?.id === updated.id) {
          emailVerified = primaryEmailVerified;
        } else if (updated.email !== keyedSecondaryEmailsFromDB[updated.id].email) {
          emailVerified = null;
        }

        return prisma.secondaryEmail.update({
          where: {
            id: updated.id,
            userId: updatedUser.id,
          },
          data: {
            email: updated.email,
            emailVerified,
          },
        });
      });

      await prisma.$transaction(recordsToModifyQueue);
    }
  }

  return {
    ...input,
    email: emailVerification && !secondaryEmail?.emailVerified ? user.email : input.email,
    avatarUrl: updatedUser.avatarUrl,
    hasEmailBeenChanged,
    sendEmailVerification: emailVerification && !secondaryEmail?.emailVerified,
  };
};

const cleanMetadataAllowedUpdateKeys = (metadata: TUpdateProfileInputSchema["metadata"]) => {
  if (!metadata) {
    return {};
  }
  const cleanedMetadata = updateUserMetadataAllowedKeys.safeParse(metadata);
  if (!cleanedMetadata.success) {
    logger.error("Error cleaning metadata", cleanedMetadata.error);
    return {};
  }

  return cleanedMetadata.data;
};

const handleUserMetadata = ({ ctx, input }: UpdateProfileOptions) => {
  const { user } = ctx;
  const cleanMetadata = cleanMetadataAllowedUpdateKeys(input.metadata);
  const userMetadata = userMetadataSchema.parse(user.metadata);
  // Required so we don't override and delete saved values
  return { ...userMetadata, ...cleanMetadata };
};
