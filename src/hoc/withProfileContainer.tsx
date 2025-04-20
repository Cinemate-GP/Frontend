import React, { useEffect, useState } from "react";

export function withProfileContainer<T extends { tmdbId: number }>(
  WrappedComponent: React.ComponentType<{
    resources: T[] | null;
    loading: boolean;
    onDelete: (movieId: number) => void;
  }>,
  endpoint: string
) {
  return function WithProfileContainerComponent() {
    const [resources, setResources] = useState<T[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(endpoint, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${document.cookie.split("=")[1]}`,
            },
          });
          if (!res.ok) throw new Error("Failed to fetch profile data");
          const data = await res.json();
          setResources(data);
        } catch (error) {
          console.error("Failed to fetch profile data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    const handleDelete = (tmdbId: number) => {
      setResources(
        (prev) => prev?.filter((item) => item.tmdbId !== tmdbId) ?? null
      );
    };

    return (
      <WrappedComponent
        resources={resources}
        loading={loading}
        onDelete={handleDelete}
      />
    );
  };
}
