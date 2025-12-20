import { WorkspacePlatformRepository } from "@calndrbrnd/lib/server/repository/workspacePlatform";

export default async function handler() {
  const workspacePlatforms = await WorkspacePlatformRepository.findAll();

  return workspacePlatforms;
}
