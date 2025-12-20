import { WEBSITE_URL } from "@calndrbrnd/lib/constants";
import slugify from "@calndrbrnd/lib/slugify";

interface ResponseUsernameApi {
  available: boolean;
  premium: boolean;
  message?: string;
  suggestion?: string;
}

export async function checkPremiumUsername(_username: string): Promise<ResponseUsernameApi> {
  const username = slugify(_username);
  const response = await fetch(`${WEBSITE_URL}/api/username`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
    method: "POST",
    mode: "cors",
  });

  const json = await response.json();
  return json;
}
