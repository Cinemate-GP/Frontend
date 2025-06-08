export interface UserDetails extends User {
  userRecentActivityResponses: Activity[];
}

export type User = {
  userId: string;
  fullName: string;
  userName: string;
  profilePic: string;
};

export type Activity = {
  tmdbId: number;
  type: string;
  posterPath: number;
  name: string;
  description: string;
  createdOn: string;
  stars: number;
};

export type Movie = {
  backdropPath: string;
  language: string;
  imdbRating: string;
  logoPath: string;
  tmdbId: number;
  title: string;
  tagline: string;
  overview: string;
  posterPath: string;
  runtime: number;
  rottenTomatoesRating: string;
  metacriticRating: string;
  mpa: string;
  releaseDate: string;
  trailer: string;
  actors?: {
    id: number;
    name: string;
    role: string;
    extra: string;
    profilePath: string;
  }[];
  genresDetails?: {
    id: number;
    name: string;
  }[];
  movieReviews?: Review[];
};
export type Review = {
  userId: number;
  userName: string;
  tmdbId: number;
  fullName: string;
  profilePic: string;
  stars: number;
  reviewId: number;
  reviewBody: string;
  reviewedOn: string;
};
export type Actor = {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  popularity: string;
  profilePath: string;
  movies: Movie[];
};

export interface ProfileCard {
  id?: number;
  tmdbId: number;
  imdbRating: string;
  title: string;
  poster_path: string;
}
