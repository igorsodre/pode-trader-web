import React from 'react';
import { UserPokemon } from '../../data/models/pokemon-terface';

interface MyPokemonsProps {
  pokeList: UserPokemon[];
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
            <tr key={p.pokemon.name + index}>
              <td>{p.pokemon.name}</td>
              <td>{p.pokemon.baseExperience}</td>
              <td>{p.pokemon.species}</td>
              <td>{p.pokemon.height}</td>
              <td>{p.pokemon.weight}</td>
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
