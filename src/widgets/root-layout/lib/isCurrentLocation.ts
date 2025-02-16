import { NavbarAction } from '@/shared/constants';

export const isCurrentLocation = (action: NavbarAction) => {
  if (action.path) {
    return location.pathname.includes(action.path);
  }
  return false;
};
