import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Select from 'react-select';
import LoadingSpinner from '../../components/UiElements/LoadingSpinner';
import { AppContext, IAppContext } from '../../data/app-context';
import { FAIR_TRADE_PERCENTAGE } from '../../data/constants';
import { UserPokemon } from '../../data/models/pokemon-terface';
import { IUser } from '../../data/models/user-interface';
import { useAuth } from '../../hooks/auth-service';
import { usePokemon } from '../../hooks/pokemon-service';
import { useTrade } from '../../hooks/trade-service';
import { calculateTotalBaseXP } from '../../util/pokemon-util';
import './NewTrade.scss';

type SelectInput = {
  value: number;
  label: string;
} | null;

const usersToSelectOptions = (users: IUser[]) => {
  return users.map((u) => ({ value: u.id, label: u.name }));
};

const pokemonToSelctOptions = (pokemons: UserPokemon[]) => {
  return pokemons.map((p) => ({ value: p.id, label: p.pokemon.name }));
};
// TODO: refactor this page into smaller components
const NewTrade: React.FC<RouteComponentProps> = (props) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<Nullable<IUser>>();

  const [loggedUserPokemons, setLoggerdUserPokemons] = useState<UserPokemon[]>([]);
  const [selectedUserPokemons, setSelectedUserPokemons] = useState<UserPokemon[]>([]);

  const [chonsenUsersPokemons, setChonseUserPokemons] = useState<UserPokemon[]>([]);
  const [loggedUserChosenPokemons, setLoggedUserChosenPokemons] = useState<UserPokemon[]>([]);

  const [inputValueSource, setInputValueSource] = useState<SelectInput[]>([]);

  const [loggedUserBaseExperience, setLoggedUserBaseExperinece] = useState(0);
  const [selectedUserBaseExperience, setSelectedUserBaseExperinece] = useState(0);

  const [fairnessTert, setFairnessText] = useState('');

  const { getAllUsers, isLoadding: isAuthLoading } = useAuth();
  const { getPokemonsForGivenUser, getPokemonsForLoggedUser, isLoadding: isPokemonLoadig } = usePokemon();
  const { addTradeRequest, isLoadding: isTradeLoading } = useTrade();
  const { addAppMessages, currentUser } = useContext(AppContext) as IAppContext;

  useEffect(() => {
    (async () => {
      try {
        const result = await getAllUsers();
        setUsers(result);
      } catch (err) {
        console.log(err);
        addAppMessages([{ type: 'ERROR', text: err.message }]);
      }
    })();
  }, [addAppMessages, getAllUsers]); // componentDidMount

  useEffect(() => {
    (async () => {
      try {
        const result = await getPokemonsForLoggedUser();
        setLoggerdUserPokemons(result);
      } catch (err) {
        console.log(err);
        addAppMessages([{ type: 'ERROR', text: err.message }]);
      }
    })();
  }, [addAppMessages, getPokemonsForLoggedUser]); // componentDidMount

  const onSelectUserToTradeHandler = async (item: SelectInput) => {
    if (!item) return;
    try {
      setSelectedUser(users.find((u) => u.id === item.value));
      const result = await getPokemonsForGivenUser(item.value);
      setInputValueSource([]);
      setSelectedUserPokemons(result);
    } catch (err) {
      console.log(err);
      addAppMessages([{ type: 'ERROR', text: err.message }]);
    }
  };

  const onLoggedUserSelectPokemonsHandler = (itens: SelectInput[]) => {
    if (!itens) return;
    const arr: UserPokemon[] = [];
    itens.forEach((i: SelectInput) => {
      if (i) {
        const val = loggedUserPokemons.find((p) => p.id === i.value);
        if (val) arr.push(val);
      }
    });
    setLoggedUserChosenPokemons(arr);
  };

  const onUserSelectPokemons = (itens: SelectInput[]) => {
    setInputValueSource(itens);
    if (!itens) return;
    const arr: UserPokemon[] = [];
    itens.forEach((i: SelectInput) => {
      if (!i) return;
      const val = selectedUserPokemons.find((p) => p.id === i.value);
      if (val) arr.push(val);
    });
    setChonseUserPokemons(arr);
  };

  useEffect(() => {
    setLoggedUserBaseExperinece(calculateTotalBaseXP(loggedUserChosenPokemons));
    setSelectedUserBaseExperinece(calculateTotalBaseXP(chonsenUsersPokemons));
  }, [loggedUserChosenPokemons, chonsenUsersPokemons]);

  useEffect(() => {
    // Se um dos valores for 0, não tem troca
    if (!loggedUserBaseExperience || !selectedUserBaseExperience) {
      setFairnessText('');
      return;
    }

    // check which user has the advantage
    let text = 'The trade is fair';
    let percentage: string;
    let textInFavorOf = ', in favor of: ';
    if (loggedUserBaseExperience > selectedUserBaseExperience) {
      textInFavorOf += currentUser?.name;
      percentage = ((selectedUserBaseExperience / loggedUserBaseExperience) * 100).toFixed(2);
    } else {
      textInFavorOf += selectedUser?.name;
      percentage = ((loggedUserBaseExperience / selectedUserBaseExperience) * 100).toFixed(2);
    }

    if (Number(percentage) < FAIR_TRADE_PERCENTAGE) text = 'The trade is not fair';
    setFairnessText(text + textInFavorOf + ' | ' + (100 - Number(percentage)).toFixed(2) + '%');
  }, [currentUser?.name, loggedUserBaseExperience, selectedUser?.name, selectedUserBaseExperience]);

  const placeTradehandle = async () => {
    if (!selectedUser || !chonsenUsersPokemons.length || !loggedUserChosenPokemons.length) return;
    const requestedPokemons = chonsenUsersPokemons.map((p) => p.id);
    const givenPokemons = loggedUserChosenPokemons.map((p) => p.id);

    try {
      await addTradeRequest(selectedUser.id, requestedPokemons, givenPokemons);
      addAppMessages([{ type: 'SUCCESS', text: 'Trade request added succesfully' }]);
      props.history.replace('/trades');
    } catch (err) {
      console.log(err);
      addAppMessages([{ type: 'ERROR', text: err.message }]);
    }
    console.log('Placing trade');
  };
  return (
    <div className="container-fluid">
      {(isAuthLoading || isPokemonLoadig || isTradeLoading) && <LoadingSpinner asOverlay />}
      <div className="row">
        <div className="col-2" />
        <div className="col-8">
          <h4>Select a user to trade with</h4>
          <Select options={usersToSelectOptions(users)} onChange={onSelectUserToTradeHandler} />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-2" />
        <div className="col-4">
          <h4>Your pokemons</h4>
          <Select
            isMulti
            options={pokemonToSelctOptions(loggedUserPokemons)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(val: any) => onLoggedUserSelectPokemonsHandler(val)}
          />
          <p>Total base Experience: {loggedUserBaseExperience}</p>
        </div>
        <div className="col-4">
          <h4>{selectedUser ? selectedUser.name + ' Pokemons' : 'Please select an user to display their pokemons'}</h4>
          <Select
            value={inputValueSource}
            isMulti
            options={pokemonToSelctOptions(selectedUserPokemons)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(val: any) => onUserSelectPokemons(val)}
          />

          <p>Total base Experience: {selectedUserBaseExperience}</p>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-2" />
        <div className="col-2 ">
          <button
            disabled={!chonsenUsersPokemons.length || !loggedUserChosenPokemons.length}
            onClick={placeTradehandle}
            className="btn btn-primary"
          >
            Place trade request
          </button>
        </div>
        <div className="col-5 mt-1">
          <h5>{fairnessTert}</h5>
        </div>
      </div>
    </div>
  );
};

export default NewTrade;
