import { useCallback, useState } from 'react';
import { AutheticationStatus } from '../types';
import { useSignUp } from '../../../Services/useSignUp';
import { useLogin } from '../../../Services/useLogin';
import { useLoading } from '../../../Components/Loading';
import { useAuthentication } from '..';

const useAuthenticationPage = () => {
  const [authenticationStatus, setAuthenticationStatus] =
    useState<AutheticationStatus>(AutheticationStatus.LOGIN);
  const [errorMessage, setErrorMessage] = useState<string>();
  const { setIsLoading } = useLoading();
  const { setToken } = useAuthentication();

  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordConfirmationInput, setPasswordConfirmationInput] =
    useState<string>('');

  const { mutate: signUpMutate } = useSignUp({
    onSettled: () => setIsLoading(false),
    onError: () => setErrorMessage('Error creating new account'),
  });

  const { mutate: loginMutate } = useLogin({
    onSuccess: (data: any) => data.token && setToken(data.token),
    onSettled: () => setIsLoading(false),
    onError: () => setErrorMessage('Invalid login'),
  });

  const submitLogin = useCallback(() => {
    if (usernameInput === '' || passwordInput === '') {
      setErrorMessage('There are empty fields');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    loginMutate({ login: usernameInput, password: passwordInput });
  }, [usernameInput, passwordInput, loginMutate, setIsLoading]);

  const submitSignUp = useCallback(() => {
    if (
      usernameInput === '' ||
      passwordInput === '' ||
      passwordConfirmationInput === ''
    ) {
      setErrorMessage('There are empty fields');
      return;
    }
    if (passwordInput !== passwordConfirmationInput) {
      setErrorMessage('Password and confirmation must match');
      return;
    }
    setErrorMessage('');
    setIsLoading(true);
    signUpMutate({ login: usernameInput, password: passwordInput });
  }, [
    signUpMutate,
    usernameInput,
    passwordInput,
    passwordConfirmationInput,
    setIsLoading,
  ]);

  const onSubmit = useCallback(
    () =>
      authenticationStatus === AutheticationStatus.LOGIN
        ? submitLogin()
        : submitSignUp(),
    [authenticationStatus, submitLogin, submitSignUp],
  );

  const clear = useCallback(() => {
    setUsernameInput('');
    setPasswordInput('');
    setPasswordConfirmationInput('');
  }, []);

  return {
    isLogin: authenticationStatus === AutheticationStatus.LOGIN,
    onLoginClick: () => {
      clear();
      setAuthenticationStatus(AutheticationStatus.LOGIN);
    },
    onSignupClick: () => {
      clear();
      setAuthenticationStatus(AutheticationStatus.SIGNUP);
    },
    errorMessage,
    usernameInput,
    setUsernameInput,
    passwordInput,
    setPasswordInput,
    passwordConfirmationInput,
    setPasswordConfirmationInput,
    onSubmit,
  };
};

export default useAuthenticationPage;
