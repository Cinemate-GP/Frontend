'use client';
import { useEffect, useState } from 'react';

export const useCookie = () => {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const cookie = document.cookie;
    const tokenCookie = cookie.split(';').find(c => c.trim().startsWith('token='));
    
    if (tokenCookie) {
      // Extract just the token value, without any trailing data
      const tokenValue = tokenCookie.split('=')[1].split(';')[0].trim();
      setToken(tokenValue);
    }
  }, []);

  return token;
};