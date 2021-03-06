import { useCallback } from 'react';
import { GET_BASE_URL } from '../data/constants';
import { PokemonStats, UserPokemon } from '../data/models/pokemon-terface';
import { useBaseHttp } from './base-http';
import { BaseHttpHookType } from './hooks-interfaces';

interface PokemonHttpService extends BaseHttpHookType {
  fetchPokemons: (page: number) => Promise<PokemonStats[]>;
  getPokemonsForLoggedUser: () => Promise<UserPokemon[]>;
  getPokemonsForGivenUser: (userId: number) => Promise<UserPokemon[]>;
  addPokemonToUser: (pokemonId: number) => Promise<UserPokemon>;
  removePokemonFromUser: (userPokemonId: number) => Promise<string>;
}
export const usePokemon = (): PokemonHttpService => {
  const { errorText, getRequest, postRequest, isLoadding, clearError } = useBaseHttp();
  const fetchPokemons = useCallback(
    async (page: number) => {
      const endpoint = GET_BASE_URL() + '/api/pokemons/' + page;
      return getRequest<{ data: PokemonStats[] }>(endpoint).then((res) => res.data);
    },
    [getRequest],
  );

  const getPokemonsForLoggedUser = useCallback(async () => {
    const endpoint = GET_BASE_URL() + '/api/pokemons/my_pokemons';
    return getRequest<{ data: UserPokemon[] }>(endpoint).then((res) => res.data);
  }, [getRequest]);

  const getPokemonsForGivenUser = useCallback(
    async (userId: number) => {
      const endpoint = GET_BASE_URL() + '/api/pokemons/user/' + userId;
      return getRequest<{ data: UserPokemon[] }>(endpoint).then((res) => res.data);
    },
    [getRequest],
  );

  const addPokemonToUser = useCallback(
    async (pokemonId: number) => {
      const endpoint = GET_BASE_URL() + '/api/pokemons/add_pokemon_to_pokedex';
      const body = { pokemonId };
      return postRequest<{ data: UserPokemon }>(endpoint, body).then((res) => res.data);
    },
    [postRequest],
  );

  const removePokemonFromUser = useCallback(
    async (userPokemonId: number) => {
      const endpoint = GET_BASE_URL() + '/api/pokemons/remove_pokemon_from_pokedex';
      const body = { userPokemonId };
      return postRequest<{ data: string }>(endpoint, body).then((res) => res.data);
    },
    [postRequest],
  );

  return {
    errorText,
    isLoadding,
    clearError,
    fetchPokemons,
    getPokemonsForLoggedUser,
    addPokemonToUser,
    removePokemonFromUser,
    getPokemonsForGivenUser,
  };
};
