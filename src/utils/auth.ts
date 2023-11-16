import type { Cookie } from "@builder.io/qwik-city";
import jsonwebtoken from "@tsndr/cloudflare-worker-jwt";
import type { AuthState, ErrorResponse } from "./fetch";
import { getAccessTokenFromCookie } from "./fetch";
import { callApi } from "./fetch";
import type { JwtUser } from "~/types";

export const AUTHTOKEN_NAME: string = "fugit.app:user";

export const isUserAuthenticated = async (cookie: Cookie) => {
  return cookie.has(AUTHTOKEN_NAME);
};

export function decodeAccessToken(token: string): JwtUser {
  const { payload } = jsonwebtoken.decode(token);
  return payload as JwtUser;
}

interface PhoneAuth {
  phone: string;
}

interface PhoneConfirm {
  code: string;
  phone: string;
}

export const verify = async (
  { phone }: PhoneAuth,
  cookie: Cookie,
  baseUrl: string,
): Promise<JwtPayloadToUser | ErrorResponse> => {
  try {
    const data: any = await callApi(
      {
        endpoint: "/phone/verify",
        method: "POST",
        body: {
          phone: `+91${phone}`,
        },
      },
      baseUrl,
      cookie,
    );
    if (data.error) {
      throw new Error(data);
    }
    return data;
  } catch (e: any) {
    return e;
  }
};

export const confirm = async (
  { code, phone }: PhoneConfirm,
  cookie: Cookie,
  baseUrl: string,
): Promise<JwtPayloadToUser | ErrorResponse> => {
  try {
    const data: any = await callApi(
      {
        endpoint: "/phone/confirm",
        method: "POST",
        body: {
          code,
          phone: `+91${phone}`,
        },
      },
      baseUrl,
      cookie,
    );
    if (data.error) {
      throw new Error(data);
    }
    return data;
  } catch (e: any) {
    return e;
  }
};

export const signOut = async (cookie: Cookie) => {
  await cookie.delete(AUTHTOKEN_NAME, { path: "/" });
  return null;
};

export interface JwtPayloadToUser {
  iss: string;
  aud: string | undefined;
  auth_time: number;
  id: string;
  exp: number;
  iat: number;
  email: string;
  sign_in_provider: string;
}

export async function refreshAccessToken(
  authState: AuthState,
  baseUrl: string,
): Promise<AuthState | null> {
  const refreshToken = authState.refresh_token;

  try {
    const body = {
      refresh_token: refreshToken,
    };
    const responseData: any = await callApi(
      {
        endpoint: "/accounts/access-token",
        method: "POST",
        body,
      },
      baseUrl,
    );
    return responseData?.data as AuthState;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}

export async function refreshAndSaveAccessToken(
  cookie: Cookie,
  baseUrl: string,
): Promise<AuthState | null> {
  const authState = await getAccessTokenFromCookie(cookie);
  const refreshToken = authState.refresh_token;
  try {
    const body = {
      refresh_token: refreshToken,
    };

    const responseData: any = await callApi(
      {
        endpoint: "/accounts/access-token",
        method: "POST",
        body,
      },
      baseUrl,
    );

    const tokenData: AuthState = responseData?.data;
    cookie.set(AUTHTOKEN_NAME, JSON.stringify(tokenData), {
      httpOnly: true,
      maxAge: [tokenData.expires_in as number, "seconds"],
      path: "/",
    });
    return tokenData;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}
