import { apiClient } from './instance';

export const refreshToken = async () => {
  try {
    const response = await apiClient.post('/auth/refresh_token');
    const access_token = response.data;
    return access_token;
  } catch (e) {
    console.log(e);
  }
};
