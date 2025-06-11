"use client";
import { useParams, redirect } from "next/navigation";
import { getUserId } from "@/lib/utils";
import MovieCard from "@/components/MovieCard";
import SectionTitle from "@/components/SectionTitle";
import { CardSkeleton } from "@/components/skeletons";
import useFetch from "@/hooks/useFetch";

interface Movie {
  id: number;
  tmdbId: number;
  imdbRating: string;
  title: string;
  poster_path: string;
}

const UserRecommended = () => {
  const params = useParams();
  const username = params.username as string;
  const currentUserId = getUserId();
  
  // Only allow access to own profile for this functionality
  if (username !== currentUserId) {
    redirect(`/${username}`);
  }

  const { data, loading } = useFetch<Movie[]>("/api/Movie/top-ten");
  
  return (
    <div className="mt-5">
      <SectionTitle title="Recommend Movies" />
      {loading ? (
        <CardSkeleton />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 rounded-lg">
          {data?.length === 0 && <p>There is no Recommend Movies Yet</p>}
          {data?.map((movie) => (
            <MovieCard
              key={movie.id}
              imdbRating={movie.imdbRating}
              tmdbid={movie.tmdbId}
              title={movie.title}
              image={`https://image.tmdb.org/t/p/original//${movie.poster_path}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRecommended;
