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
  getAllGroups: () => Promise<void>;
  getGroupByName: (name: string) => Promise<Group>;
  getGroupById: (id: string) => Promise<Nullable<Group>>;
  getGroupDisciplines: (group_id: string) => Promise<void>;
  suggestGroupByName: (params: GroupSearchParams) => Promise<void>;
  getLessonsGroupById: (id: string) => Promise<void>;
  getFavoriteGroups: () => Promise<void>;
  setCurrentGroup: (group: Group | GroupShort) => void;
  removeCurrentGroup: () => void;
  addGroupToFavourite: (group: GroupShort | Group) => void;
  removeGroupFromFavourite: (group: GroupShort) => void;
  getExamsByGroupId: (group_id: string, params?: ExamParams) => Promise<void>;
};

const initialState: GroupState = {
  groups: [],
  searchedGroups: [],
  favouriteGroups: [],
  homeGroup: null,
  homeGroupStatus: 'idle',
  currentGroup: null,
  lessonsCurrentGroup: [],
  groupDisciplines: null,
  groupDisciplinesStatus: 'idle',
  exams: [],
  error: null,
};
const ACCESS_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;
export const useGroup = create<GroupState & GroupActions>()(
  persist(
    (set) => ({
      ...initialState,
      getAllGroups: async () => {
        const response = await groupService.getAllGroups();
        set({ groups: response.data });
      },
      getGroupByName: async (name) => {
        const response = await groupService.getGroupByName(name);
        set({ currentGroup: response.data });
        return response.data
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
      getFavoriteGroups: async () => {
        const response = await groupService.getFavoriteGroups();
        set((state) => {
          const responseGroups = response.data;
          const remainingGroups = state.favouriteGroups.filter(
            group => !responseGroups.some(responseGroup => responseGroup.id === group.id)
          );
          const combinedGroups = [...responseGroups, ...remainingGroups];
          const limitedGroups = combinedGroups.slice(0, 10);
          const addGroups: string[] = []; 
          limitedGroups.map((group) => {
            addGroups.push(group.id)
          });
          groupService.addBulkFavoriteGroup(addGroups);
          return { favouriteGroups: limitedGroups };
        })
      },
      addGroupToFavourite: (group: GroupShort | Group) => {
        const params = {
          group_id: group.id
        }
        set((state) => {
          const isAlreadyFavourite = state.favouriteGroups.some(
            (favGroup) => favGroup.id === group.id
          )
          if (isAlreadyFavourite || state.favouriteGroups.length >= 10) {
            return state;
          }
          if(localStorage.getItem(ACCESS_KEY)){
            groupService.addFavoriteGroup(params)
          }
          const groupShort = {
            id: group.id,
            kai_id: group.kai_id,
            group_name: group.group_name,
            is_verified: group.is_verified,
            parsed_at: group.parsed_at || null,
            schedule_parsed_at: group.schedule_parsed_at || null,
            exams_parsed_at: group.exams_parsed_at || null,
          }
          return {
            favouriteGroups: [...state.favouriteGroups, groupShort],
          };
        });
      },
      removeGroupFromFavourite:async (group: GroupShort) => {
        if(localStorage.getItem(ACCESS_KEY)){
          groupService.deleteFavoriteGroup(group.id)
        }
        set((state) => {
          return {
            favouriteGroups: state.favouriteGroups.filter(
              (favouriteGroup) => favouriteGroup.id !== group.id
            ),
          }
        });
      },
      resetGroupState: () => set(initialState),
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
