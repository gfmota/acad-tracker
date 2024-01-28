import TextInput from '../../Components/TextInput';
import useAuthenticationPage from './hooks/useAuthenticationPage';
import styles from './styles/Authentication.module.scss';

interface AuthenticationPageProps {
  setToken: (token: string) => void;
}

const AuthenticationPage = ({ setToken }: AuthenticationPageProps) => {
  const {
    isLogin,
    onLoginClick,
    onSignupClick,
    onSubmit,
    errorMessage,
    usernameInput,
    setUsernameInput,
    passwordInput,
    setPasswordInput,
    passwordConfirmationInput,
    setPasswordConfirmationInput,
  } = useAuthenticationPage(setToken);

  return (
    <div className={styles.container}>
      <div className={styles.statusSelector}>
        <div className={isLogin && styles.selected} onClick={onLoginClick}>
          Login
        </div>
        <div className={!isLogin && styles.selected} onClick={onSignupClick}>
          Sign up
        </div>
      </div>
      <TextInput
        value={usernameInput}
        setValue={setUsernameInput}
        label="Username"
      />
      <TextInput
        value={passwordInput}
        setValue={setPasswordInput}
        label="Password"
        isPassword
      />
      {!isLogin && (
        <TextInput
          value={passwordConfirmationInput}
          setValue={setPasswordConfirmationInput}
          label="Confirm your password"
          isPassword
        />
      )}
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      <button className={styles.submit} onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};

export default AuthenticationPage;
