import { AUTH_PHRASES } from '@/shared/constants';

export const getRandomPhrase = () => {
  return AUTH_PHRASES[Math.floor(Math.random() * AUTH_PHRASES.length)];
};
