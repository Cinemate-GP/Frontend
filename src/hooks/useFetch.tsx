'use client'
import { authFetch } from "@/lib/api";
import { useState, useEffect } from "react";
const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get token from cookie and clean it
        const token = document.cookie.split("=")[1];
        const cleanToken = token ? token.split(';')[0].trim() : '';
        
        const response = await authFetch(url,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanToken}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch data");

        const json = await response.json();
        setData(json);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
