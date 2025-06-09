import { getCookie, tryRefreshToken } from "./utils";

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  let token = getCookie("token");
  const refreshToken = getCookie("refreshToken");

  const makeHeaders = (token?: string) => {
    const headers = new Headers(options.headers || {});

    if (token) headers.set("Authorization", `Bearer ${token}`);

    // Set Content-Type only if body is not FormData
    const isFormData = options.body instanceof FormData;
    if (!isFormData) {
      headers.set("Content-Type", "application/json");
    }

    return headers;
  };

  // First try
  let response = await fetch(url, {
    ...options,
    headers: makeHeaders(token as string),
  });

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
      response = await fetch(url, {
        ...options,
        headers: makeHeaders(token as string),
      });
    }
  }

  return response;
}
