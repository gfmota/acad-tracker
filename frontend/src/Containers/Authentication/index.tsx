import React, { PropsWithChildren, useContext, useState } from 'react';
import AuthenticationPage from './AuthenticationPage';

const AuthenticationContext = React.createContext<{
  token?: string;
  setToken: (value: string) => void;
}>({
  setToken: () => null,
});

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string>();

  return (
    <AuthenticationContext.Provider value={{ token, setToken }}>
      {token ? children : <AuthenticationPage />}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthenticationContext);
