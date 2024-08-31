import { apiClient, ApiResponse, UserStudent, UserGroupMember } from '@/shared';
import { AuthParams, AuthResponse } from './types';

export const userService = {
  postAuth: (params: AuthParams): ApiResponse<AuthResponse> => {
    return apiClient.post<AuthResponse>('auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  getMeStudent: (): ApiResponse<UserStudent> => {
    return apiClient.get<UserStudent>('user/me/student');
  },

  getGroupMembers: (): ApiResponse<UserGroupMember[]> => {
    return apiClient.get<UserGroupMember[]>('user/me/student/group_members');
  },
  getIsLoginEnabled: (): ApiResponse<boolean> => {
    return apiClient.get<boolean>('auth/check_login');
  },
};
