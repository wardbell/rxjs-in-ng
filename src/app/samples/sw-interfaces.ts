export type RootMovies = RootObject<Movie[]>;

export interface RootObject<T> {
    count: number;
    next?: any;
    previous?: any;
    results: T ;
}

export interface Movie {
    title: string;
    episode_id?: number;
    opening_crawl?: string;
    director?: string;
    producer?: string;
    release_date: string;
    characters?: string[];
    planets?: string[];
    starships?: string[];
    vehicles?: string[];
    species?: string[];
    created?: Date;
    edited?: Date;
    url?: string;
    id: number;
}

export interface NewMovieData extends Movie {
  year?: string;
}

export interface People {
    name: string;
    height?: string;
    mass?: string;
    hair_color?: string;
    skin_color?: string;
    eye_color?: string;
    birth_year?: string;
    gender?: string;
    homeworld?: string;
    films?: string[];
    species?: string[];
    vehicles?: string[];
    starships?: string[];
    created?: Date;
    edited?: Date;
    url?: string;
    id?: number;
}

export type RootPeople = RootObject<People[]>;
