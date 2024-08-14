export interface Character {
  name: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  homeworld: string;
}

export interface Film {
  title: string;
}

export interface Specie {
  name: string;
}

export interface Vehicle {
  name: string;
}

export interface Starship {
  name: string;
}

export interface Planet {
  name: string;
}

export interface CharacterDetails {
  name: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  homeworld: string;
}
