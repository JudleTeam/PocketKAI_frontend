import { apiClient, ApiResponse, Group, GroupShort } from '@/shared';
import { GroupSearchParams } from './types';

export const groupService = {
  getAllGroups: (): ApiResponse<Group[]> => {
    return apiClient.get<Group[]>('/group/');
  },
  getGroupByName: (name: string): ApiResponse<Group> => {
    return apiClient.get<Group>(`/group/by_name/${name}`);
  },
  getGroupById: (id: number): ApiResponse<Group> => {
    return apiClient.get<Group>(`/group/by_id/${id}`);
  },
  suggestGroupByName: (
    params: GroupSearchParams
  ): ApiResponse<GroupShort[]> => {
    return apiClient.get<GroupShort[]>(`/group/suggest`, {
      params,
    });
  },
};
