import { getCookie, tryRefreshToken } from "./utils";

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  let token = getCookie("token");
  const refreshToken = getCookie("refreshToken");

  const makeHeaders = (token?: string) => ({
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  });

  // First try
  let response = await fetch(url, { ...options, headers: makeHeaders(token as string) });

  // If token is expired
  if (response.status === 401 && refreshToken) {
    // Avoid multiple refresh attempts
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = tryRefreshToken().finally(() => {
        isRefreshing = false;
      });
    }

    const success = await refreshPromise;
    if (success) {
      token = getCookie("token"); // get updated token
      response = await fetch(url, { ...options, headers: makeHeaders(token as string) });
    }
  }

  return response;
}
