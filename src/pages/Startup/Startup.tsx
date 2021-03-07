import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext, IAppContext } from '../../data/app-context';

const Startup: React.FC = (props) => {
  const { token } = useContext(AppContext) as IAppContext;
  const getStartedPath = !token ? '/signup' : '/home';
  return (
    <header className="masthead">
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center text-center">
          <div className="col-lg-10 align-self-end">
            <h1 className="text-uppercase text-white font-weight-bold">Welcome to Poke Trader</h1>
            <hr className="divider my-4" />
          </div>
          <div className="col-lg-8 align-self-baseline">
            <p className="text-white-75 font-weight-light mb-5">
              Your new portal to trade pokemons with other pokemon enthusiasts
            </p>
            <Link to={getStartedPath} className="btn btn-primary btn-xl js-scroll-trigger">
              Get started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Startup;
