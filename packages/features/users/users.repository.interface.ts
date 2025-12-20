import type { User } from "@calndrbrnd/prisma/client";

export interface IUsersRepository {
  updateLastActiveAt(userId: number): Promise<User>;
}
