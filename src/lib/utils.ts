
export const capitalizeString = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getProgress = (ratedCount: number, totalMovies: number) => {
  return (ratedCount / totalMovies) * 100;
};

export const isRatingComplete = (
  ratedMovies: { label: string; movieId: number }[],
  minRatings: number
) => {
  return ratedMovies.length >= minRatings;
};

export const FormateBirthDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const FormatDate = (date: string | Date) => {
  const isoDate = new Date(date);
  return isoDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


export const truncateText = (
  str: string,
  isExpanded: boolean,
  maxLength: number
) => {
  if (str.length > maxLength) {
    return isExpanded ? str : `${str.substring(0, maxLength)}...`;
  }
  return str;
};

export function formatDuration(minutes: number | undefined) {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const now = new Date();
  const plusHour = new Date(now.getTime() - 60 * 60 * 1000);
  const diffInSeconds = Math.floor((plusHour.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 7 * 86400)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export function convertToDateTime(dateTimeString:string) {
  const date = new Date(dateTimeString);

  const formattedDate = date.toLocaleDateString(); 
  const formattedTime = date.toLocaleTimeString(); 

  return `${formattedDate} | ${formattedTime}`;
}

export const getUserId = () => {
  if (typeof window === "undefined") return null; // ✅ Only run on client
  const {user} = JSON.parse(localStorage.getItem("user") || "{}");
  if (user) {
    return user.userName
  }
  return null;
}


export function extractDigit(str:string) {
  const match = str.match(/\d/); // \d means any digit
  return match ? Number(match[0]) : null; // return the digit or null if not found
}

/** Decode JWT and return payload */
function parseJwt(token: string): { exp: number } | null {
  try {
    const base64 = token.split(".")[1];
    const decoded = JSON.parse(atob(base64));
    return decoded;
  } catch {
    return null;
  }
}

/** Check if token will expire in the next X seconds */
export function willExpireIn(token: string, seconds: number): boolean {
  const data = parseJwt(token);
  if (!data?.exp) return false;

  const now = Math.floor(Date.now() / 1000);
  console.log(data.exp - now)
  return data.exp - now <= seconds ;
}

/** Send refresh request */
export async function tryRefreshToken() {
  const res = await fetch("/api/Auth/refresh-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: getCookie("token"),
      refreshToken: getCookie("refreshToken"),
    }),
  });

  if (res.ok) {
    const data = await res.json();
    setCookie("token", data.token);
    setCookie("refreshToken", data.refreshToken);
    console.log("🔄 Token refreshed");
    return true;
  }

  return false;
}


export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null; // ✅ Only run on client
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return; // ✅ Only run on client
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

/**
 * Properly logs out the user by clearing all auth tokens and local storage
 * @param redirectPath Optional path to redirect to after logout
 */
export function logout(redirectPath?: string) {
  // Clear both auth cookies
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
  // Clear user data from localStorage
  localStorage.removeItem("user");
  
  // Redirect if path is provided
  if (redirectPath && typeof window !== "undefined") {
    window.location.href = redirectPath;
    return true;
  }
  
  return false;
}

