import { apiClient, ApiResponse, Group, GroupShort, Lesson, GroupDisciplines} from '@/shared';
import { GroupSearchParams } from './types';

export const groupService = {
  getAllGroups: (): ApiResponse<Group[]> => {
    return apiClient.get<Group[]>('/group/');
  },
  getGroupByName: (name: string): ApiResponse<Group> => {
    return apiClient.get<Group>(`/group/by_name/${name}`);
  },
  getGroupById: (id: string): ApiResponse<Group> => {
    return apiClient.get<Group>(`/group/by_id/${id}`);
  },
  suggestGroupByName: (
    params: GroupSearchParams
  ): ApiResponse<GroupShort[]> => {
    return apiClient.get<GroupShort[]>(`/group/suggest`, {
      params,
    });
  },
  getLessonsGroupById: (
    id: string
  ): ApiResponse<Lesson[]> => {
    return apiClient.get<Lesson[]>(`/group/by_id/${id}/lesson`)
  },
  getGroupDisciplines: (
    group_id: string
  ): ApiResponse<GroupDisciplines[]> => {
    return apiClient.get<GroupDisciplines[]>(`/group/by_id/${group_id}/discipline`)
  }
};
