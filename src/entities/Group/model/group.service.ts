import {
  apiClient,
  ApiResponse,
  Group,
  GroupShort,
  Lesson,
  GroupDisciplines,
  ExamType,
} from '@/shared';
import { GroupSearchParams, ExamParams, FavoriteParams } from './types';

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
  getLessonsGroupById: (id: string): ApiResponse<Lesson[]> => {
    return apiClient.get<Lesson[]>(`/group/by_id/${id}/lesson`);
  },
  getGroupDisciplines: (group_id: string): ApiResponse<GroupDisciplines[]> => {
    return apiClient.get<GroupDisciplines[]>(
      `/group/by_id/${group_id}/discipline`
    );
  },
  getExamsByGroupId: (
    group_id: string,
    params?: ExamParams
  ): ApiResponse<ExamType[]> => {
    return apiClient.get<ExamType[]>(`/group/by_id/${group_id}/exam`, {
      params,
    });
  },
  getFavouriteGroups: (): ApiResponse<GroupShort[]> => {
    return apiClient.get<GroupShort[]>('user/me/favorite_groups');
  },
  addFavouriteGroup: (params: FavoriteParams): ApiResponse<void> => {
    return apiClient.post('user/me/favorite_groups', null, {
      params: { group_id: params.group_id },
    });
  },
  deleteFavouriteGroup: (group_id: string) => {
    return apiClient.delete(`user/me/favorite_groups/${group_id}`);
  },
  addBulkFavouriteGroup: (group_ids: string[]): ApiResponse<string[]> => {
    return apiClient.post<string[]>('user/me/favorite_groups/bulk', {
      group_ids,
    });
  },
};
