import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext, IAppContext } from '../../data/app-context';

const NavBar: React.FC = (props) => {
  const ctx = useContext(AppContext) as IAppContext;

  const { token } = useContext(AppContext) as IAppContext;
  const homePath = !token ? '/' : '/home';

  const logoutHandler = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    ctx.logout();
  };

  const displyedNavLinks = !ctx?.token ? (
    <React.Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Sign up
        </Link>
      </li>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/pokemons">
          My Pokemons
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/trades">
          My Trades
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/profile">
          Edit Profile
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={logoutHandler} href="/">
          Logout
        </a>
      </li>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3 bg-dark" id="mainNav">
        <div className="container">
          <Link to={homePath} className="navbar-brand js-scroll-trigger">
            Poke Trader
          </Link>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto my-2 my-lg-0">{displyedNavLinks}</ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
