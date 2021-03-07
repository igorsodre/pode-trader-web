import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext, IAppContext } from '../../data/app-context';

const Home: React.FC = (props) => {
  const { currentUser } = useContext(AppContext) as IAppContext;
  return (
    <header className="masthead">
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center text-center">
          <div className="col-lg-10 align-self-end">
            <h1 className="text-uppercase text-white font-weight-bold">Welcome {currentUser?.name}</h1>
            <hr className="divider my-4" />
          </div>
          <div className="col-lg-8 align-self-baseline">
            <p className="text-white-75 font-weight-light mb-5">
              Go to my pokemons page to add pokemons to your pokedex
            </p>
            <Link to="/pokemons" className="btn btn-primary btn-xl js-scroll-trigger">
              Check Pokedex
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;
