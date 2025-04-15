"use client";
import MovieCard from "@/components/MovieCard";
import SectionTitle from "@/components/SectionTitle";
import { useEffect, useState } from "react";

interface Liked {
  movieId:number
  poster_path:number
  title:string 
  tmdbId:number
}
const Liked = () => {
const [likedMovies, setLikedMovies] = useState<Liked[] | null>(null);
const token = document.cookie.split("=")[1];
  
  useEffect(()=> {
    (async function (){
      try {
        const res = await fetch("/api/Profile/LikedMovies",{
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setLikedMovies(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      
    })()
  },[token])

  return (
    <div className="mt-5">
      <SectionTitle title="Liked Movies" />
      {likedMovies?.length === 0 && <p>There is no Liked Movies yet</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 rounded-lg">
        {likedMovies?.map((movie) => (
          <MovieCard
            key={movie.tmdbId}
            tmdbid={movie.tmdbId}
            title={movie.title}
            image={`https://image.tmdb.org/t/p/original//${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Liked;
