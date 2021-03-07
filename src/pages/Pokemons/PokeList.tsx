import React from 'react';
import { PokemonStats } from '../../data/models/pokemon-terface';

interface PokeListProps {
  pokeList: PokemonStats[];
  onAddPokeItem: (pokemonId: number) => void;
  onPreviousListPage: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onNextListPage: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
const PokeList: React.FC<PokeListProps> = (props) => {
  return (
    <div className="col pokemon-list-component">
      <h4>Pokemon list</h4>

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
          {props.pokeList.map((p, index) => (
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
      <nav aria-label="Pagination links">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="/" aria-label="Previous" onClick={props.onPreviousListPage}>
              <span aria-hidden="true">&laquo; Previous</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>

          <li className="page-item">
            <a className="page-link" href="/" aria-label="Next" onClick={props.onNextListPage}>
              <span aria-hidden="true"> Next&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PokeList;
