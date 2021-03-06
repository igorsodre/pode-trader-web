import { UserPokemon } from './../data/models/pokemon-terface';
export const calculateTotalBaseXP = (pokemons: UserPokemon[]): number => {
  let sum = 0;
  pokemons.forEach((p) => {
    sum += p.pokemon.baseExperience;
  });
  return sum;
};
