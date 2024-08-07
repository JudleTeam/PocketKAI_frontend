import { userService } from './user.service';
import { create } from 'zustand';
import { AuthParams } from './types';
import { persist } from 'zustand/middleware';
import { FetchStatus, UserStudent, UserGroupMember } from '@/shared';
import { Nullable } from '@/shared';
import { AxiosError } from 'axios';
type UserType = {
  userAuthStatus: FetchStatus;
  user: Nullable<UserStudent>;
  userGroupMembers: UserGroupMember[];
  userGroupMembersStatus: FetchStatus;
  token: string;
  error: Nullable<AxiosError>;
  login: (params: AuthParams) => Promise<number>;
  getMe: () => Promise<UserStudent>;
  getGroupMembers: () => Promise<void>;
  logout: () => void;
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
      login: async (params: AuthParams) => {
        set({ userAuthStatus: 'loading' });
        try {
          const response = await userService.postAuth(params);
          set({
            token: response.data.access_token,
            userAuthStatus: 'success',
            error: null,
          });
          localStorage.setItem('token', response.data.access_token);
          return response.status;
        } catch (error: any) {
          set({ error, userAuthStatus: 'error' });
          return 400;
        }
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
          });
        } catch (error: any) {
          set({ error, userGroupMembersStatus: 'error' });
        }
      },
      logout: () => {
        localStorage.removeItem('token');
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
      }),
    }
  )
);
