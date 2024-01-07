import { useCallback, useState } from 'react';
import { AutheticationStatus } from '../types';

const useAuthemtication = () => {
    const [authenticationStatus, setAuthenticationStatus] =
        useState<AutheticationStatus>(AutheticationStatus.LOGIN);
    const [errorMessage, setErrorMessage] = useState<string>();

    const [usernameInput, setUsernameInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const [passwordConfirmationInput, setPasswordConfirmationInput] =
        useState<string>('');

    const submitLogin = useCallback(() => {
        if (usernameInput === '' || passwordInput === '') {
            setErrorMessage('There are empty fields');
            return;
        }
        setErrorMessage('');
    }, [usernameInput, passwordInput]);

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
    }, [usernameInput, passwordInput, passwordConfirmationInput]);

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

export default useAuthemtication;
