export type NavLink  = {
    name: string;
    path: string;
}
export type SignUpData = {
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
}
export type Movie= {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    backdrop_path:string;
    genre_ids:number[];
    formats:string[]
    runtime:string;
    release_date:string;
    vote_average:string;
}
  export type Animation= {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    backdrop_path:string;
    genre_ids:number[];
    formats:string[]
    runtime:string;
    release_date:string;
    vote_average:string;
}
export type Genre = {
    id:number;
    name:string;
}
export type Serie = {
    id: number;
    name: string;
    first_air_date: string;
    backdrop_path: string;
    poster_path:string
    last_episode_to_air:{
        season_number:number;
        episode_number:number;
    };
    last_air_date:number;
    updated_at: string; 
};
  
export type RegisterData = Omit<SignUpData, 'confirmPassword'>;
export type LoginData = Omit<RegisterData, 'name'>;