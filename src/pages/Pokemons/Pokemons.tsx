import React, { useEffect, useState } from 'react';

import Card from '../../components/UiElements/Card';
import { PokemonStats, UserPokemon } from '../../data/models/pokemon-terface';
import { usePokemon } from '../../hooks/pokemon-service';
import './Pokemon.scss';
import MyPokemons from './MyPokemons';
import PokeList from './PokeList';
import PokemonSearch from './PokemonSearch';
import LoadingSpinner from '../../components/UiElements/LoadingSpinner';

const Pokemons: React.FC = (props) => {
  const {
    fetchPokemons,
    getPokemonsForLoggedUser,
    serachPokemons,
    addPokemonToUser,
    removePokemonFromUser,
    isLoadding,
  } = usePokemon();
  const [pokelist, setPokeList] = useState<PokemonStats[]>([]);
  const [usersPokemons, setUsersPokemons] = useState<UserPokemon[]>([]);
  const [pokeSearchResult, setPokeSearchResult] = useState<PokemonStats[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const nextPageHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const page = currentPage + 1;
    fetchAndSetPokemonsForPage(page);
  };

  const previousPageHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    if (currentPage <= 0) return;
    const page = currentPage - 1;
    fetchAndSetPokemonsForPage(page);
  };

  const searchPokemonHandler = async (pokeName: string) => {
    console.log(pokeName);
    if (!pokeName) return;
    try {
      const result = await serachPokemons(pokeName);
      setPokeSearchResult(result);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAndSetPokemonsForPage = async (page: number) => {
    try {
      const result = await fetchPokemons(page);
      setCurrentPage(page);
      setPokeList(result);
    } catch (err) {
      console.log(err);
    }
  };

  const addPokemonToUserHandler = async (pokemonId: number) => {
    try {
      const result = await addPokemonToUser(pokemonId);
      setUsersPokemons((oldValues) => [...oldValues, result]);
    } catch (err) {
      console.log(err);
    }
  };

  const removePokemonFromUserHandler = async (userPokemonId: number) => {
    try {
      await removePokemonFromUser(userPokemonId);
      setUsersPokemons((oldValues) => oldValues.filter((p) => p.id !== userPokemonId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchPokemons(0);
        setPokeList(result);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [fetchPokemons]);

  useEffect(() => {
    (async () => {
      try {
        const result = await getPokemonsForLoggedUser();
        setUsersPokemons(result);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [getPokemonsForLoggedUser]);

  return (
    <div className="container-fluid">
      {isLoadding && <LoadingSpinner asOverlay />}
      <div className="row">
        <div className="col">
          <Card>
            <MyPokemons onDeletePokemon={removePokemonFromUserHandler} pokeList={usersPokemons} />
          </Card>
        </div>

        <div className="col">
          <Card>
            <div className="row">
              <PokemonSearch
                onAddPokeItem={addPokemonToUserHandler}
                onSearchPokemon={searchPokemonHandler}
                searchResultList={pokeSearchResult}
              />
            </div>
            <hr className="mt-5 mb-5"></hr>
            <div className="row">
              <PokeList
                onAddPokeItem={addPokemonToUserHandler}
                onNextListPage={nextPageHandler}
                onPreviousListPage={previousPageHandler}
                pokeList={pokelist}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pokemons;
