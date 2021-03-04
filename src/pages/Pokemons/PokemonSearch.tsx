import React from 'react';

// interface PokemonSearchProps {}
const PokemonSearch: React.FC = (props) => {
  return (
    <div className="col pokemon-search-component">
      <h4>Find pokemons to add to your pokedex</h4>
      <form className="form-inline">
        <div className="form-group mx-sm-3 mb-2">
          <label htmlFor="inputPassword2" className="sr-only">
            Pokemon
          </label>
          <input type="text" className="form-control" id="inputPassword2" placeholder="pokemon name" />
        </div>
        <button type="submit" className="btn btn-primary mb-2">
          Search
        </button>
      </form>
    </div>
  );
};

export default PokemonSearch;
