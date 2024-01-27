import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { LOGIN_PATH } from './constants';
import { AUTH_BODY } from './types';

export const login = async (authBody: AUTH_BODY) => {
  const body = JSON.stringify(authBody);
  const response = await fetch(LOGIN_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body.length.toString(),
      host: 'localhost',
    },
    body,
  });
  if (response.status == 403) throw new Error('Unauthorized');
  return await response.json();
};

export const useLogin = (
  options?: UseMutationOptions<unknown, Error, any, unknown>,
) =>
  useMutation({
    mutationFn: login,
    mutationKey: ['login'],
    ...options,
  });
