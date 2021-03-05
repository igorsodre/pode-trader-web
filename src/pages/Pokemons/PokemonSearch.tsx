import React from 'react';
import { PokemonStats } from '../../data/models/pokemon-terface';

interface PokemonSearchProps {
  searchResultList: PokemonStats[];
  onSearchPokemon: (name: string) => void;
}
const PokemonSearch: React.FC<PokemonSearchProps> = (props) => {
  const content = props.searchResultList.length ? (
    <div className="d-flex justify-content-center">Resultados</div>
  ) : (
    <div className="d-flex justify-content-center">
      <p>No results found</p>
    </div>
  );
  return (
    <div className="col pokemon-search-component">
      <h4>Find pokemons to add to your pokedex</h4>
      <form className="form-inline d-flex justify-content-center">
        <div className="form-group mx-sm-3 mb-2">
          <label htmlFor="inputPassword2" className="sr-only">
            Pokemon
          </label>
          <input type="text" className="form-control" id="inputPassword2" placeholder="pokemon name" />
        </div>
        <button type="submit" className="btn btn-primary mb-2" onClick={() => props.onSearchPokemon('')}>
          Search
        </button>
      </form>
      {content}
    </div>
  );
};

export default PokemonSearch;
