export interface PokemonStats {
  name: string;
  baseExperience: number;
  height: number;
  weight: number;
  species: string;
  id: number;
}

export interface UserPokemon {
  id: number;
  pokemon: PokemonStats;
}
