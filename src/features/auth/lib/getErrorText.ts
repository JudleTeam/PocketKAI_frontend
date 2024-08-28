import { AxiosError } from 'axios';

export const getErrorText = (error: AxiosError) => {
  switch (error.response?.status) {
    case 401:
      return 'Неверный логин или пароль';
    case 503:
      return 'Проблемы на стороне КАИ. Попробуйте позже.';
    default:
      break;
  }
};
