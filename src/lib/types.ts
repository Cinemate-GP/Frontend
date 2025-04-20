export type movieType = {
    id?: number,
    title: string,
    image: string
    rating?: number
}


export type Movie = {
   backdropPath:string
    language:string
    imdbRating:string
    tmdbId: number;
    title: string;
    tagline: string;
    overview: string;
    posterPath: string;
    runtime: number;
    rottenTomatoesRating:string,
    metacriticRating:string,
    mpa:string,
    releaseDate: string;
    trailer: string;
    actors?: {
      id: number;
      name: string;
      character: string;
      profilePath: string;
    }[]
    genresDetails?: {
      id:number,
      name:string
    }[] ; // Change to `Genre[]` if you define a Genre type
  };
  export type Actor = {
    id: number,
    name:string,
    biography:string,
    birthday:string,
    popularity:string,
    profilePath:string,
    movies:Movie[]
    
  }

  export interface ProfileCard {
    id?: number;
    tmdbId: number;
    imdbRating: string;
    title: string;
    poster_path: string;
  }