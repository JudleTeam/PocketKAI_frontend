import { FetchStatus, Group, Lesson, GroupDisciplines } from '@/shared';
import { Nullable, GroupShort, ExamType } from '@/shared';
import { create } from 'zustand';
import { groupService } from './group.service';
import { GroupSearchParams } from './types';
import { persist } from 'zustand/middleware';
import { ExamParams } from './types';

type GroupState = {
  groups: Group[];
  searchedGroups: GroupShort[];
  favouriteGroups: GroupShort[];
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
  getAllGroups: () => void;
  getGroupByName: (name: string) => void;
  getGroupById: (id: string) => void;
  getGroupDisciplines: (group_id: string) => void;
  suggestGroupByName: (params: GroupSearchParams) => void;
  getLessonsGroupById: (id: string) => void;
  setCurrentGroup: (group: Group | GroupShort) => void;
  removeCurrentGroup: () => void;
  addGroupToFavourite: (group: GroupShort | Group) => void;
  removeGroupFromFavourite: (group: GroupShort) => void;
  getExamsByGroupId: (group_id: string, params: ExamParams) => Promise<void>;
};

export const useGroup = create<GroupState & GroupActions>()(
  persist(
    (set) => ({
      currentGroup: null,
      homeGroup: null,
      homeGroupStatus: 'idle',
      groups: [],
      searchedGroups: [],
      favouriteGroups: [],
      lessonsCurrentGroup: [],
      groupDisciplines: null,
      groupDisciplinesStatus: 'idle',
      exams: [],
      error: null,
      getAllGroups: async () => {
        const response = await groupService.getAllGroups();
        set({ groups: response.data });
      },
      getGroupByName: async (name) => {
        const response = await groupService.getGroupByName(name);
        set({ currentGroup: response.data });
      },
      getGroupById: async (id) => {
        set({ homeGroupStatus: 'loading' });
        try {
          const response = await groupService.getGroupById(id);
          set({
            homeGroup: response.data,
            homeGroupStatus: 'success',
          });
        } catch (error) {
          set({ error, homeGroupStatus: 'error' });
        }
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
      getExamsByGroupId: async (group_id: string, params: ExamParams) => {
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
        set({ currentGroup: group });
      },

      removeCurrentGroup: () => {
        set({ currentGroup: null });
      },

      addGroupToFavourite: (group: GroupShort | Group) => {
        set((state) => {
          const isAlreadyFavourite = state.favouriteGroups.some(
            (favGroup) => favGroup.id === group.id
          );
          if (isAlreadyFavourite) {
            return state;
          }
          return {
            favouriteGroups: [...state.favouriteGroups, group],
          };
        });
      },
      removeGroupFromFavourite: (group: GroupShort) => {
        set((state) => ({
          favouriteGroups: state.favouriteGroups.filter(
            (favouriteGroup) => favouriteGroup.id !== group.id
          ),
        }));
      },
    }),
    {
      name: 'favourite-group-storage',
      partialize: (state) => ({
        favouriteGroups: state.favouriteGroups,
        currentGroup: state.currentGroup,
        homeGroup: state.homeGroup,
      }),
    }
  )
);
