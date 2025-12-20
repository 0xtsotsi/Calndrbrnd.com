import { defaultHandler } from "@calndrbrnd/lib/server/defaultHandler";

export default defaultHandler({
  GET: import("./_getAdd"),
});
