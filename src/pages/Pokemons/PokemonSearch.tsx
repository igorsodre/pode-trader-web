import React, { useState } from 'react';
import { PokemonStats } from '../../data/models/pokemon-terface';

interface PokemonSearchProps {
  searchResultList: PokemonStats[];
  onSearchPokemon: (name: string) => void;
  onAddPokeItem: (pokemonId: number) => void;
}
const PokemonSearch: React.FC<PokemonSearchProps> = (props) => {
  const [pokeName, setPokename] = useState('');

  const content = props.searchResultList.length ? (
    <div className="d-flex justify-content-center">
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Base experience</th>
            <th scope="col">Species</th>
            <th scope="col">Add to my pokedex</th>
          </tr>
        </thead>
        <tbody>
          {props.searchResultList.map((p, index) => (
            <tr key={p.name + index}>
              <td>{p.name}</td>
              <td>{p.baseExperience}</td>
              <td>{p.species}</td>
              <td>
                <button className="btn btn-secondary" onClick={() => props.onAddPokeItem(p.id)}>
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <p>No results found</p>
    </div>
  );
  return (
    <div className="col pokemon-search-component">
      <h4>Find pokemons to add to your pokedex</h4>
      <form className="form-inline d-flex justify-content-center" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group mx-sm-3 mb-2">
          <label htmlFor="pokeSearch" className="sr-only">
            Pokemon
          </label>
          <input
            value={pokeName}
            onChange={(e) => setPokename(e.target.value)}
            type="text"
            className="form-control"
            id="pokeSearch"
            placeholder="pokemon name"
          />
        </div>
        <button
          className="btn btn-primary mb-2"
          onClick={(e) => {
            e.preventDefault();
            props.onSearchPokemon(pokeName);
          }}
        >
          Searchsss
        </button>
      </form>
      {content}
    </div>
  );
};

export default PokemonSearch;
