import { getCookie, tryRefreshToken } from "./utils";

let isRefreshing = false;

/** Main fetch wrapper */
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

  // First request
  let response = await fetch(url, { ...options, headers: makeHeaders(token as string) });

  // If unauthorized and refreshToken exists, try refresh once
  if (response.status === 401 && refreshToken && !isRefreshing) {
    console.log("🔁 Got 401, trying token refresh...");
    isRefreshing = true;
    const success = await tryRefreshToken();
    isRefreshing = false;

    if (success) {
      token = getCookie("token"); // get new token
      // Retry the original request with new token
      response = await fetch(url, { ...options, headers: makeHeaders(token as string) });
    }
  }

  return response;
}
