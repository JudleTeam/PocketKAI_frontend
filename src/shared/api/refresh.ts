import { decryptToken, encryptToken } from '../lib';
import { apiClient } from './instance';
const ACCESS_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;
const ENCRYPTED_REFRESH_KEY = import.meta.env.VITE_ENCRYPTED_REFRESH_TOKEN_KEY;
export const refreshToken = async () => {
  try {
    const oldAccessToken = localStorage.getItem(ACCESS_KEY)!;

    const oldRefreshToken = await decryptToken(oldAccessToken);
    const response = await apiClient.post<{
      access_token: string;
      refresh_token: string;
      token_type: string;
    }>(
      '/auth/refresh_token',
      { refresh_token: oldRefreshToken },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const access_token = response.data.access_token;
    const refresh_token = response.data.refresh_token;
    const encryptedToken = await encryptToken(refresh_token, access_token);
    localStorage.setItem(ACCESS_KEY, access_token);
    localStorage.setItem(ENCRYPTED_REFRESH_KEY, encryptedToken);
    return access_token;
  } catch (e) {
    console.log(e);
  }
};
