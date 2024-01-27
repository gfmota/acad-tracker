import React, { PropsWithChildren, useContext, useState } from 'react';
import styles from './Loading.module.scss';

const LoadingContext = React.createContext<{
  setIsLoading: (value: boolean) => void;
}>({ setIsLoading: () => null });

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ setIsLoading }}>
      {isLoading && (
        <div className={styles.container}>
          <span className={styles.loader}></span>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
