"use client";

import SectionTitle from "../SectionTitle";
import MovieReviewForm from "./MovieReviewForm";
import MovieReviewList from "./MovieReviewList";

interface MovieProps {
  tmdbId: number | undefined;
  title: string | undefined;
  poster_path: string | undefined;
}

export default function Reviews({ tmdbId, title, poster_path }: MovieProps) {
  
  

  return (
    <div className="bg-black rounded-lg mb-[4rem] section">
      <SectionTitle title="Reviews" />

      <div className="mt-4 flex flex-col lg:flex-row">
        {/* Review Form */}
        <MovieReviewForm
          tmdbId={tmdbId!}
          title={title!}
          poster_path={poster_path!}
        />
        {/* Reviews List */}
        <MovieReviewList/>
      </div>
    </div>
  );
}
