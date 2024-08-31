import { userService } from './user.service';
import { create } from 'zustand';
import { AuthParams } from './types';
import { persist } from 'zustand/middleware';
import { FetchStatus, UserStudent, UserGroupMember } from '@/shared';
import { Nullable } from '@/shared';
import { AxiosError } from 'axios';
import { encryptToken } from '@/shared/lib';

const ENCRYPTED_REFRESH_KEY = import.meta.env.VITE_ENCRYPTED_REFRESH_TOKEN_KEY;
const ACCESS_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;
const IV_KEY = import.meta.env.VITE_IV_KEY;
const SALT_KEY = import.meta.env.VITE_SALT_KEY;
type UserType = {
  userAuthStatus: FetchStatus;
  user: Nullable<UserStudent>;
  userGroupMembers: UserGroupMember[];
  userGroupMembersStatus: FetchStatus;
  token: string;
  error: Nullable<AxiosError>;
  isLoginEnabled: boolean;
  login: (params: AuthParams) => Promise<number>;
  getMe: () => Promise<UserStudent>;
  getGroupMembers: () => Promise<void>;
  logout: () => void;
  getIsLoginEnabled: () => Promise<void>;
};

export const useUser = create<UserType>()(
  persist(
    (set) => ({
      userAuthStatus: 'idle',
      user: null,
      userGroupMembers: [],
      userGroupMembersStatus: 'idle',
      token: '',
      error: null,
      isLoginEnabled: true,
      login: async (params: AuthParams) => {
        set({ userAuthStatus: 'loading' });
        try {
          const response = await userService.postAuth(params);
          set({
            token: response.data.auth.access_token,
            userAuthStatus: 'success',
            error: null,
          });
          localStorage.setItem(ACCESS_KEY, response.data.auth.access_token);
          encryptToken(
            response.data.auth.refresh_token,
            response.data.auth.access_token
          ).then((encryptedToken) => {
            localStorage.setItem(ENCRYPTED_REFRESH_KEY, encryptedToken);
          });

          return response.status;
        } catch (error: any) {
          set({ error, userAuthStatus: 'error' });
          return 400;
        }
      },
      getIsLoginEnabled: async () => {
        const response = await userService.getIsLoginEnabled();
        set({ isLoginEnabled: response.data });
      },
      getMe: async () => {
        const response = await userService.getMeStudent();
        set({ user: response.data });
        return response.data;
      },
      getGroupMembers: async () => {
        set({ userGroupMembersStatus: 'loading' });
        try {
          const response = await userService.getGroupMembers();
          set({
            userGroupMembers: response.data,
            userGroupMembersStatus: 'success',
            error: null,
          });
        } catch (error: any) {
          set({ error, userGroupMembersStatus: 'error' });
        }
      },
      logout: () => {
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(ENCRYPTED_REFRESH_KEY);
        localStorage.removeItem(SALT_KEY);
        localStorage.removeItem(IV_KEY);
        set({
          user: null,
          token: '',
          userAuthStatus: 'idle',
          userGroupMembersStatus: 'idle',
          userGroupMembers: [],
        });
      },
    }),
    {
      name: 'user',
      partialize: (state) => ({
        user: state.user,
        userGroupMembers: state.userGroupMembers,
        userAuthStatus: state.userAuthStatus,
      }),
    }
  )
);
