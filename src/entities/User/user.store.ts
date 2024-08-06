import { userService } from './user.service';
import { create } from 'zustand';
import { AuthParams } from './types';
import { persist } from 'zustand/middleware';
import { FetchStatus, UserStudent, UserGroupMember } from '@/shared';
import { Nullable } from '@/shared';
type UserType = {
  userAuthStatus: FetchStatus;
  user: Nullable<UserStudent>;
  userGroupMembers: UserGroupMember[];
  userGroupMembersStatus: FetchStatus;
  token: string;
  error: Nullable<unknown>;
  login: (params: AuthParams) => Promise<void>;
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
          });
          localStorage.setItem('token', response.data.access_token);
        } catch (error) {
          set({ error, userAuthStatus: 'error' });
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
        } catch (error) {
          set({ error, userGroupMembersStatus: 'error' });
        }
      },
      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          token: '',
          userAuthStatus: 'idle',
          userGroupMembers: [],
        });
      },
    }),
    {
      name: 'user',
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
