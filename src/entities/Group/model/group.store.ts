import { FetchStatus, Group, Lesson, GroupDisciplines } from '@/shared';
import { Nullable, GroupShort, ExamType } from '@/shared';
import { create } from 'zustand';
import { groupService } from './group.service';
import { GroupSearchParams } from './types';

import { ExamParams } from './types';
import { persist } from 'zustand/middleware';

type GroupState = {
  groups: Group[];
  searchedGroups: GroupShort[];
  favouriteGroups: GroupShort[];
  favouriteGroupsStatus: FetchStatus;
  homeGroup: Nullable<Group>;
  homeGroupStatus: FetchStatus;
  currentGroup: Nullable<Group | GroupShort>;
  lessonsCurrentGroup: Lesson[];
  groupDisciplines: Nullable<GroupDisciplines[]>;
  groupDisciplinesStatus: FetchStatus;
  exams: ExamType[];
  error: Nullable<unknown>;
};
type GroupActions = {
  getAllGroups: () => Promise<void>;
  getGroupByName: (name: string) => Promise<Group>;
  getGroupById: (id: string) => Promise<Nullable<Group>>;
  getGroupDisciplines: (group_id: string) => Promise<void>;
  suggestGroupByName: (params: GroupSearchParams) => Promise<void>;
  getLessonsGroupById: (id: string) => Promise<void>;
  getFavouriteGroups: () => Promise<void>;
  setCurrentGroup: (group: Group | GroupShort) => void;
  removeCurrentGroup: () => void;
  addGroupToFavourite: (
    group: GroupShort | Group,
    authStatus: FetchStatus
  ) => void;
  removeGroupFromFavourite: (
    group: GroupShort,
    authStatus: FetchStatus
  ) => void;
  synchronizeFavouriteGroupsOnAuth: () => Promise<void>;
  getExamsByGroupId: (group_id: string, params?: ExamParams) => Promise<void>;
  resetGroupState: () => void;
};

const initialState: GroupState = {
  groups: [],
  searchedGroups: [],
  favouriteGroups: [],
  favouriteGroupsStatus: 'idle',
  homeGroup: null,
  homeGroupStatus: 'idle',
  currentGroup: null,
  lessonsCurrentGroup: [],
  groupDisciplines: null,
  groupDisciplinesStatus: 'idle',
  exams: [],
  error: null,
};
export const useGroup = create<GroupState & GroupActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      getAllGroups: async () => {
        const response = await groupService.getAllGroups();
        set({ groups: response.data });
      },
      getGroupByName: async (name) => {
        const response = await groupService.getGroupByName(name);
        set({ currentGroup: response.data });
        return response.data;
      },
      getGroupById: async (id) => {
        set({ homeGroupStatus: 'loading' });
        try {
          const response = await groupService.getGroupById(id);
          set({
            homeGroup: response.data,
            homeGroupStatus: 'success',
          });
          return response.data;
        } catch (error) {
          set({ error, homeGroupStatus: 'error' });
        }
        return null;
      },
      getGroupDisciplines: async (group_id: string) => {
        set({ groupDisciplinesStatus: 'loading' });
        try {
          const response = await groupService.getGroupDisciplines(group_id);
          set({
            groupDisciplines: response.data,
            groupDisciplinesStatus: 'success',
          });
        } catch (error) {
          set({ error, groupDisciplinesStatus: 'error' });
        }
      },
      getExamsByGroupId: async (group_id: string, params?: ExamParams) => {
        const response = await groupService.getExamsByGroupId(group_id, params);
        set({
          exams: response.data,
        });
      },
      suggestGroupByName: async (params: GroupSearchParams) => {
        const response = await groupService.suggestGroupByName(params);
        set({
          searchedGroups: response.data,
        });
      },

      getLessonsGroupById: async (id) => {
        const response = await groupService.getLessonsGroupById(id);
        set({ lessonsCurrentGroup: response.data });
      },

      setCurrentGroup: (group) => {
        set({ currentGroup: group, groupDisciplinesStatus: 'idle' });
      },

      removeCurrentGroup: () => {
        set({ currentGroup: null });
      },
      getFavouriteGroups: async () => {
        set({ favouriteGroupsStatus: 'loading', error: null });
        try {
          const response = await groupService.getFavouriteGroups();
          set({
            favouriteGroups: response.data,
            favouriteGroupsStatus: 'success',
          });
        } catch (error) {
          set({ error, favouriteGroupsStatus: 'error' });
        }
      },
      addGroupToFavourite: async (group, authStatus) => {
        const isAlreadyFavourite = get().favouriteGroups.some(
          (favGroup) => favGroup.id === group.id
        );
        if (isAlreadyFavourite || get().favouriteGroups.length >= 10) {
          return;
        }
        set({
          favouriteGroups: [...get().favouriteGroups, group],
        });
        if (authStatus === 'success') {
          await groupService.addFavouriteGroup({ group_id: group.id });
        }
      },
      removeGroupFromFavourite: async (group, authStatus) => {
        if (authStatus === 'success') {
          await groupService.deleteFavouriteGroup(group.id);
        }
        set((state) => {
          return {
            favouriteGroups: state.favouriteGroups.filter(
              (favouriteGroup) => favouriteGroup.id !== group.id
            ),
          };
        });
      },

      synchronizeFavouriteGroupsOnAuth: async () => {
        const favouriteGroupsIds = get().favouriteGroups.map(
          (group) => group.id
        );
        await groupService.addBulkFavouriteGroup(favouriteGroupsIds);
      },

      resetGroupState: () => set(initialState),
    }),
    {
      name: 'group',
      partialize: (state) => ({
        homeGroup: state.homeGroup,
        currentGroup: state.currentGroup,
        favouriteGroups: state.favouriteGroups,
      }),
    }
  )
);
