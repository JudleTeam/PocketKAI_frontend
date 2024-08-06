import { apiClient } from './instance';

export const refreshToken = async () => {
  try {
    const response = await apiClient.post<{
      access_token: string;
      token_type: string;
    }>('/auth/refresh_token');
    const access_token = response.data;
    localStorage.setItem('token', access_token.access_token);
    return access_token;
  } catch (e) {
    console.log(e);
  }
};
