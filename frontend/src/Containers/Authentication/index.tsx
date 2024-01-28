import React, { PropsWithChildren, useContext, useState } from 'react';
import AuthenticationPage from './AuthenticationPage';

const AuthenticationContext = React.createContext<string | undefined>(
  undefined,
);

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string>();

  return (
    <AuthenticationContext.Provider value={token}>
      {token ? children : <AuthenticationPage setToken={setToken} />}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthenticationContext);
