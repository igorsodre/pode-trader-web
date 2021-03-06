import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AuthorizedRoute from './components/Navigation/AuthorizedRoute';
import NavBar from './components/Navigation/Navbar';
import MessagesContainer from './components/UiElements/MessagesContainer';
import Home from './pages/Home';
import Login from './pages/Login';
import NewTrade from './pages/NewTrade';
import Pokemons from './pages/Pokemons';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Startup from './pages/Startup';
import Trade from './pages/Trade';

const AppRouter: React.FC = (props) => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <MessagesContainer />
        <Switch>
          <Route path="/" component={Startup} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/login" component={Login} exact />
          <AuthorizedRoute path="/home" component={Home} exact />
          <AuthorizedRoute path="/profile" component={Profile} exact />
          <AuthorizedRoute path="/pokemons" component={Pokemons} exact />
          <AuthorizedRoute path="/trades" component={Trade} exact />
          <AuthorizedRoute path="/new-trade" component={NewTrade} exact />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
