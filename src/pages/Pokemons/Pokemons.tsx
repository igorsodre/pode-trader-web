import React, { useEffect, useState } from 'react';
import Card from '../../components/UiElements/Card';
import PokeList from './PokeList';
import PokemonSearch from './PokemonSearch';
import './Pokemon.scss';
import { usePokemon } from '../../hooks/pokemon-service';
import { PokemonStats } from '../../data/models/pokemon-terface';
import MyPokemons from './MyPokemons';
const Pokemons: React.FC = (props) => {
  const { fetchPokemons, getPokemonsForLoggedUser, addPokemonToUser, removePokemonFromUser } = usePokemon();
  const [pokelist, setPokeList] = useState<PokemonStats[]>([]);
  const [usersPokemons, setUsersPokemons] = useState<PokemonStats[]>([]);
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

  const removePokemonFromUserHandler = async (pokemonId: number) => {
    try {
      await removePokemonFromUser(pokemonId);
      setUsersPokemons((oldValues) => oldValues.filter((p) => p.id !== pokemonId));
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
      <div className="row">
        <div className="col">
          <Card>
            <MyPokemons onDeletePokemon={removePokemonFromUserHandler} pokeList={usersPokemons} />
          </Card>
        </div>
        <div className="col">
          <Card>
            <div className="row">
              <PokemonSearch />
            </div>
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
