import { FetchStatus, Group, Lesson,GroupDisciplines } from '@/shared';
import { Nullable, GroupShort, ExamType } from '@/shared';
import { create } from 'zustand';
import { groupService } from './group.service';
import { GroupSearchParams } from './types';
import { persist } from 'zustand/middleware';
import { ExamParams } from './types';

type GroupState = {
  groups: Group[];
  homeGroup: Nullable<Group>;
  searchedGroups: GroupShort[];
  favouriteGroups: GroupShort[];
  currentGroup: Nullable<Group | GroupShort>;
  error: Nullable<unknown>,
  homeGroupStatus: FetchStatus,
  lessonsCurrentGroup: Lesson[],
  groupDisciplines: Nullable<GroupDisciplines[]>;
  exams: ExamType[];
};
type GroupActions = {
  getAllGroups: () => void;
  getGroupByName: (name: string) => void;
  getGroupById: (id: string) => Promise<Nullable<Group>>;
  getGroupDisciplines: (group_id: string) => void,
  suggestGroupByName: (params: GroupSearchParams) => void;
  getLessonsGroupById: (id: string) => void,
  setCurrentGroup: (group: Group | GroupShort) => void;
  removeCurrentGroup: () => void;
  addGroupToFavourite: (group: GroupShort | Group) => void;
  removeGroupFromFavourite: (group: GroupShort) => void;
  getExamsByGroupId: (group_id: string, params?: ExamParams) => Promise<void>;
};

export const useGroup = create<GroupState & GroupActions>()(
  persist(
    (set) => ({
      currentGroup: null,
      homeGroup: null,
      groups: [],
      searchedGroups: [],
      favouriteGroups: [],
      error: null,
      homeGroupStatus: 'idle',
      lessonsCurrentGroup: [],
      groupDisciplines: null,
      exams: [],
      getAllGroups: async () => {
        const response = await groupService.getAllGroups();
        set({ groups: response.data });
      },
      getGroupByName: async (name) => {
        const response = await groupService.getGroupByName(name);
        set({ currentGroup: response.data });
      },
      getGroupById: async (id) => {
        set({ homeGroupStatus: 'loading' })
        try{
          const response = await groupService.getGroupById(id);
          set({
            homeGroup: response.data,
            homeGroupStatus: 'success',
          });
          return response.data
        } catch(error){
          set({error, homeGroupStatus: 'error'})
        }
        return null
      },
      getGroupDisciplines: async (group_id: string) => {
        const response = await groupService.getGroupDisciplines(group_id);
        set({
          groupDisciplines: response.data
        })
      },
      getExamsByGroupId: async (group_id: string, params?: ExamParams) => {
        const response = await groupService.getExamsByGroupId(group_id, params);
        set({
          exams: response.data
        })
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
          const isAlreadyFavourite = state.favouriteGroups.some(favGroup => favGroup.id === group.id);
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
        homeGroupStatus: state.homeGroupStatus,
        lessonsCurrentGroup: state.lessonsCurrentGroup,
        exams: state.exams,
      }),
    }
  )
);
