import { apiClient, ApiResponse, Teacher, TeacherLesson } from '@/shared';

export const teacherService = {
  suggestTeacherByName: (name: string): ApiResponse<Teacher[]> => {
    return apiClient.get<Teacher[]>('/teacher/suggest_by_name', {
      params: { name },
    });
  },
  getTeacherScheduleById: (
    id: string,
    weekParity: 'odd' | 'even' | 'any'
  ): ApiResponse<TeacherLesson[]> => {
    return apiClient.get<TeacherLesson[]>(`/teacher/by_id/${id}/schedule`, {
      params: { week_parity: weekParity },
    });
  },
};
