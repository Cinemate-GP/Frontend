import { getCookie, tryRefreshToken, willExpireIn } from "./utils";

let isRefreshing = false;

/** Main fetch wrapper */
export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  let token = getCookie("token");
  const refreshToken = getCookie("refreshToken");

  if (token && refreshToken && willExpireIn(token, 5) && !isRefreshing) {
    console.log("🔁 Token about to expire, refreshing before request...");
    isRefreshing = true;
    const success = await tryRefreshToken();
    isRefreshing = false;

    if (success) {
      token = getCookie("token"); // update to new token
    }
  }

  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  return fetch(url, { ...options, headers });
}

setInterval(async () => {
  const token = getCookie("token");
  const refreshToken = getCookie("refreshToken");

  // Only attempt refresh if both tokens exist
  if (token && refreshToken && willExpireIn(token, 5) && !isRefreshing) {
    isRefreshing = true;
    await tryRefreshToken();
    isRefreshing = false;
  }
}, 1000)