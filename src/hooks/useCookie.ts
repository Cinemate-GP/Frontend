import { useEffect, useState } from 'react';

export const useCookie = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Only access document after component mounts
    const cookie = document.cookie;
    const tokenValue = cookie.split("=")[1];
    setToken(tokenValue);
  }, []);

  return token;
};