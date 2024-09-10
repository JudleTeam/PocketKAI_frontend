import { apiClient, ApiResponse } from '@/shared';

export const commonService = {
  getBuildings: (): ApiResponse<Record<string, string>> => {
    return apiClient.get<Record<string, string>>('/buildings');
  },
};
