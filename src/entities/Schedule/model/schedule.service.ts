import {
  apiClient,
  ApiResponse,
  Schedule,
  WeekSchedule,
  WeekParity,
  BackgroundTaskStatus,
} from '@/shared';
import { ParityParams, ScheduleParams, WeekScheduleParams } from './types';

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
    id: string,
    params?: WeekScheduleParams
  ): ApiResponse<WeekSchedule> => {
    return apiClient.get<WeekSchedule>(`group/by_id/${id}/schedule/week`, {
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
  getWeekParity: (params?: ParityParams): ApiResponse<WeekParity> => {
    return apiClient.get<WeekParity>(`week_parity`, {
      params,
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
