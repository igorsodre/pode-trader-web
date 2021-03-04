import React from 'react';
import { PokemonStats } from '../../data/models/pokemon-terface';

interface MyPokemonsProps {
  pokeList: PokemonStats[];
  onDeletePokemon: (pokemonId: number) => void;
}
const MyPokemons: React.FC<MyPokemonsProps> = (props) => {
  return (
    <div className="col pokemon-user-pokemons-component">
      <h4> My Pokemons</h4>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Base experience</th>
            <th scope="col">Species</th>
            <th scope="col">height</th>
            <th scope="col">weight</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {props.pokeList.map((p, index) => (
            <tr key={p.name + index}>
              <td>{p.name}</td>
              <td>{p.baseExperience}</td>
              <td>{p.species}</td>
              <td>{p.height}</td>
              <td>{p.weight}</td>
              <td>
                <button className="btn btn-secondary" onClick={() => props.onDeletePokemon(p.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPokemons;
