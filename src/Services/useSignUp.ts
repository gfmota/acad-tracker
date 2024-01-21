import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { SIGNUP_PATH } from './constants';
import { AUTH_BODY } from './types';

export const signUp = async (authBody: AUTH_BODY) => {
  const body = JSON.stringify(authBody);
  return await fetch(SIGNUP_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body.length.toString(),
      host: 'localhost',
    },
    body,
  });
};

export const useSignUp = (
  options?: UseMutationOptions<unknown, Error, any, unknown>,
) =>
  useMutation({
    mutationFn: signUp,
    mutationKey: ['singup'],
    ...options,
  });
