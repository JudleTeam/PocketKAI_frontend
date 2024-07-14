import { apiClient, ApiResponse, Schedule, WeekSchedule } from '@/shared';
import { ScheduleParams, WeekScheduleParams } from './types';

export const scheduleService = {
  getWeekScheduleByGroupName: (
    name: string,
    params?: WeekScheduleParams
  ): ApiResponse<WeekSchedule> => {
    return apiClient.get<WeekSchedule>(`group/by_name/${name}/schedule/week`, {
      params,
    });
  },
  getWeekScheduleByGroupId: (
    id: number,
    params?: WeekScheduleParams
  ): ApiResponse<WeekSchedule> => {
    return apiClient.get<WeekSchedule>(`group/by_if/${id}/schedule/week`, {
      params,
    });
  },

  getScheduleByGroupName: (
    name: string,
    params?: ScheduleParams
  ): ApiResponse<Schedule> => {
    return apiClient.get<Schedule>(`group/by_name/${name}/schedule/`, {
      params,
    });
  },
  getScheduleByGroupId: (
    id: number,
    params?: ScheduleParams
  ): ApiResponse<Schedule> => {
    return apiClient.get<Schedule>(`group/by_id/${id}/schedule/`, {
      params,
    });
  },
};
