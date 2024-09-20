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
    genre_ids:number[];
    runtime:string;
    release_date:string;
    vote_average:string;
  }
  export type Genre = {
    id:number;
    name:string;
  }
export type RegisterData = Omit<SignUpData, 'confirmPassword'>;
export type LoginData = Omit<RegisterData, 'name'>;