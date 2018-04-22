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
    homeworld?: string; // url of the homeworld
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

export interface Planet {
    climate: string; // 'Arid',
    created: string; // 2014-12-09T13:50:49.641000Z,
    diameter: number; // 10465,
    edited: string; // 2014-12-15T13:48:16.167217Z,
    films: string[] //  ['https://swapi.co/api/films/1/'],
    gravity: number; // 1,
    name: string; // 'Tatooine',
    orbital_period: number; // 304,
    population: number; // 120000,
    residents: string[]; // ['https://swapi.co/api/people/1/'],
    rotation_period: number; // 23,
    surface_water: number; // 1,
    terrain: string; // 'Dessert',
    url: string; // 'https://swapi.co/api/planets/1/'
}
