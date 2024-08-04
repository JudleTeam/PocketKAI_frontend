import { apiClient, ApiResponse, UserStudent, UserGroupMember } from '@/shared';
import { AuthParams, TokenResponse } from './types';

export const userService = {
  postAuth: (params: AuthParams): ApiResponse<TokenResponse> => {
    return apiClient.post<TokenResponse>('auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },

  getMeStudent: (token: string): ApiResponse<UserStudent> => {
    return apiClient.get<UserStudent>('user/me/student', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getGroupMembers: (token: string): ApiResponse<UserGroupMember[]> => {
    return apiClient.get<UserGroupMember[]>('user/me/student/group_members', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
};
