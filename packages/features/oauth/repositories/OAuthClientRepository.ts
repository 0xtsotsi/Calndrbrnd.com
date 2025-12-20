import type { PrismaClient } from "@calndrbrnd/prisma";

export class OAuthClientRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByClientId(clientId: string) {
    return await this.prisma.oAuthClient.findFirst({
      where: {
        clientId: clientId,
      },
      select: {
        redirectUri: true,
        clientSecret: true,
        clientType: true,
      },
    });
  }
}
