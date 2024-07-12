import { apiClient, ApiResponse, Group } from '@/shared';

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
};
