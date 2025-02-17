import { apiClient, ApiResponse, BackgroundTaskStatus, Teacher, TeacherResponse } from '@/shared';

export const teacherService = {
  suggestTeacherByName: (name: string): ApiResponse<Teacher[]> => {
    return apiClient.get<Teacher[]>('/teacher/suggest_by_name', {
      params: { name },
    });
  },
  getTeacherScheduleById: (
    id: string,
    weekParity: 'odd' | 'even' | 'any'
  ): ApiResponse<TeacherResponse> => {
    return apiClient.get<TeacherResponse>(`/v2/teacher/${id}/schedule`, {
      params: { week_parity: weekParity },
    });
  },

  getBackgroundTaskStatus: (
    taskId: string
  ): ApiResponse<{ id: string; status: BackgroundTaskStatus }> => {
    return apiClient.get<{ id: string; status: BackgroundTaskStatus }>(
      `task/${taskId}`
    );
  },
};
