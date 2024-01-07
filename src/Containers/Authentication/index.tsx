import useAuthemtication from './hooks/useAuthetication';
import styles from './styles/Authentication.module.scss';

const Authentication = () => {
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
    } = useAuthemtication();

    return (
        <>
            <div className={styles.statusSelector}>
                <div
                    className={isLogin && styles.selected}
                    onClick={onLoginClick}
                >
                    Login
                </div>
                <div
                    className={!isLogin && styles.selected}
                    onClick={onSignupClick}
                >
                    Sign up
                </div>
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    name="username"
                    value={usernameInput}
                    onChange={e => setUsernameInput(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    type="password"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                />
            </div>
            {!isLogin && (
                <div>
                    <label htmlFor="passwordConfirmation">
                        Confirm your password
                    </label>
                    <input
                        name="passwordConfirmation"
                        type="password"
                        value={passwordConfirmationInput}
                        onChange={e =>
                            setPasswordConfirmationInput(e.target.value)
                        }
                    />
                </div>
            )}
            {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
            )}
            <button className={styles.submit} onClick={onSubmit}>
                Submit
            </button>
        </>
    );
};

export default Authentication;
