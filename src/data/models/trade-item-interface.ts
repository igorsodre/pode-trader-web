import { PokemonStats } from './pokemon-terface';
export interface TradeItem {
  requestedPokemons: PokemonStats[];
  pokemonsGiven: PokemonStats[];
  tradeId: number;
}
