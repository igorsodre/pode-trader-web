import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext, IAppContext } from '../../data/app-context';

const NavBar: React.FC = (props) => {
  const ctx = useContext(AppContext) as IAppContext;

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
        <span className="navbar-text">|Logged in as: {ctx.currentUser?.name}|</span>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/pokemons">
          Meus Pokemons
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          Poke Trader
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">{displyedNavLinks}</ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
