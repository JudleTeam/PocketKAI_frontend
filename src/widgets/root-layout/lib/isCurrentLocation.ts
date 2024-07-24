import { NavbarAction } from '@/shared/constants';

export const isCurrentLocation = (action: NavbarAction) => {
  return location.pathname === action.path;
};
