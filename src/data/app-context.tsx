import React, { createContext, useCallback, useEffect, useState } from 'react';
import LoadingSpinner from '../components/UiElements/LoadingSpinner';
import { useAuth } from '../hooks/auth-service';
import { AppMessage } from './models/app-messages-interface';
import { IUser } from './models/user-interface';

export interface IAppContext {
  logout: () => void;
  setAccessToken: (token: string) => void;
  token: Nullable<string>;
  currentUser: Nullable<IUser>;
  setCurrentUser: (user: IUser) => void;
  wholeAppIsLoading: boolean;
  appMessages: AppMessage[];
  addAppMessages: (messages: AppMessage[]) => void;
  removeMessage: (message: AppMessage) => void;
}

const AppContext = createContext<IAppContext | Record<string, unknown>>({});

const AppContextProvider: React.FC = (props) => {
  const [token, setAccessToken] = useState<Nullable<string>>(null);
  const [currentUser, setCurrentUser] = useState<Nullable<IUser>>();
  const { refreshToken, logout: doLogout } = useAuth();
  const [wholeAppIsLoading, setWholeAppIsLoading] = useState(true);
  const [appMessages, setAppMessages] = useState<AppMessage[]>([]);

  const logout = useCallback(async () => {
    try {
      await doLogout();
      setAccessToken('');
    } catch (err) {
      console.log(err);
    }
  }, [doLogout]);

  const addAppMessages = useCallback((messages: AppMessage[]) => {
    setAppMessages((oldVales) => [...oldVales, ...messages]);
  }, []);
  const removeMessage = useCallback((message: AppMessage) => {
    setAppMessages((oldVales) => oldVales.filter((m) => m !== message));
  }, []);

  useEffect(() => {
    refreshToken()
      .then((res) => {
        if (res.accessToken) {
          setAccessToken(res.accessToken);
          setCurrentUser(res.user);
        }
        setWholeAppIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshToken]);

  return (
    <AppContext.Provider
      value={
        {
          token,
          logout,
          setAccessToken,
          currentUser,
          setCurrentUser,
          wholeAppIsLoading,
          appMessages,
          addAppMessages,
          removeMessage,
        } as IAppContext
      }
    >
      {!wholeAppIsLoading ? props.children : <LoadingSpinner asOverlay />}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
