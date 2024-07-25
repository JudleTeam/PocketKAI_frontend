import { userService } from './user.service';
import { create } from 'zustand';
import { AuthParams } from './types';
import { persist } from 'zustand/middleware';
import { UserStudent } from '@/shared';
import { Nullable } from '@/shared';
type UserType = {
  user: Nullable<UserStudent>;
  token: string;
  login: (params: AuthParams) => Promise<void>;
  getMe: () => Promise<void>;
  logout: () => void;
};

export const useUser = create<UserType>()(
  persist(
    (set, get) => ({
      user: null,
      token: '',
      login: async (params: AuthParams) => {
        const response = await userService.postAuth(params);
        set({ token: response.data.access_token });
      },
      getMe: async () => {
        const response = await userService.getMeStudent(get().token);
        set({ user: response.data });
      },
      logout: () => {
        set({ user: null, token: '' });
      },
    }),
    {
      name: 'user-token',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
