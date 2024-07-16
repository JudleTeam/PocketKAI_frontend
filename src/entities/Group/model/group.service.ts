import { apiClient, ApiResponse, Group, GroupName} from '@/shared';
import { GroupNameParams } from './types';

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
  suggestGroupByName: (params: GroupNameParams): ApiResponse<GroupName[]> => {
    return apiClient.get<GroupName[]>(`/group/suggest`, {
      params
    });
  }
};
