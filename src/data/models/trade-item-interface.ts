import { UserPokemon } from './pokemon-terface';

export enum TradeStaus {
  Active = 1,
  Accepted,
  Rejected,
}
export interface TradesResponse {
  tradeId: number;
  tradeStatus: TradeStaus;
  pokemonsRequested: UserPokemon[];
  pokemonsSent: UserPokemon[];
  sentByMe: boolean;
  userNameSentTo: string;
  userNameSentBy: string;
}
