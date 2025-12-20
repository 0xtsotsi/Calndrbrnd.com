import { NextResponse } from "next/server";
import getIP from "@calndrbrnd/lib/getIP";

export async function GET(req: Request) {
  const requestorIp = getIP(req);
  return NextResponse.json({ ip: requestorIp });
}