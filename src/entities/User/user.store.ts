import { userService } from './user.service';
import { create } from 'zustand';
import { AuthParams } from './types';
import { persist } from 'zustand/middleware';
import { FetchStatus, UserStudent } from '@/shared';
import { Nullable } from '@/shared';
type UserType = {
  userStatus: FetchStatus,
  user: Nullable<UserStudent>;
  token: string;
  error: Nullable<unknown>,
  login: (params: AuthParams) => Promise<void>;
  getMe: () => Promise<void>;
  logout: () => void;
};

export const useUser = create<UserType>()(
  persist(
    (set, get) => ({
      userStatus: 'idle',
      user: null,
      token: '',
      error: null,
      login: async (params: AuthParams) => {
        set({userStatus: 'loading'});
        try{
          const response = await userService.postAuth(params);
          set({ 
            token: response.data.access_token,
            userStatus: 'success'
          });
        } catch(error){
          set({error, userStatus: 'error'});
        }
      },
      getMe: async () => {
          const response = await userService.getMeStudent(get().token);
          set({ user: response.data });
      },
      logout: () => {
        set({ user: null, token: '', userStatus: 'idle' });
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

