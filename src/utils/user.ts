import type { RequestEventAction } from "@builder.io/qwik-city";
import type { ErrorResponse } from "./fetch";
import { tursoClient } from "./turso";

export async function addDeleteRequest(
  req: RequestEventAction<QwikCityPlatform>,
  authState: any,
): Promise<boolean | ErrorResponse> {
  const userId = authState.user?.local_id;
  if (!userId) {
    throw new Error("Invalid user");
  }
  try {
    const db = tursoClient(req);
    await db.execute({
      sql: `INSERT INTO user_data_deletion_request (accepted, user_id) VALUES (?, ?)`,
      args: [true, userId],
    });
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function addSupportRequest(
  req: RequestEventAction<QwikCityPlatform>,
  email: string,
  subject: string,
  message: string,
): Promise<boolean | ErrorResponse> {
  if (!(email && subject && message)) {
    throw new Error("All are required");
  }
  try {
    const db = tursoClient(req);
    await db.execute({
      sql: `INSERT INTO support (email, subject, message) VALUES (?, ?, ?)`,
      args: [email, subject, message],
    });
    return true;
  } catch (error: any) {
    throw new Error(error);
  }
}
