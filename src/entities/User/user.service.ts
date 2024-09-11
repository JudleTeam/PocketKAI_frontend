import {
  apiClient,
  ApiResponse,
  UserStudent,
  UserGroupMember,
  BackgroundTaskStatus,
} from '@/shared';
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

  getBackgroundTaskStatus: (
    taskId: string
  ): ApiResponse<{ id: string; status: BackgroundTaskStatus }> => {
    return apiClient.get<{ id: string; status: BackgroundTaskStatus }>(
      `task/${taskId}`
    );
  },

  getGroupMembers: (): ApiResponse<UserGroupMember[]> => {
    return apiClient.get<UserGroupMember[]>('user/me/student/group_members');
  },
  getIsLoginEnabled: (): ApiResponse<{ is_login_enabled: boolean }> => {
    return apiClient.get<{ is_login_enabled: boolean }>('auth/check_login');
  },
};
