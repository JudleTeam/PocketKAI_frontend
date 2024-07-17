import { Group } from '@/shared';
import { Nullable, GroupShort } from '@/shared';
import { create } from 'zustand';
import { groupService } from './group.service';
import { GroupSearchParams } from './types';
import { persist } from 'zustand/middleware';

type GroupState = {
  groups: Group[];
  searchedGroups: GroupShort[];
  favouriteGroups: GroupShort[];
  currentGroup: Nullable<Group | GroupShort>;
};
type GroupActions = {
  getAllGroups: () => void;
  getGroupByName: (name: string) => void;
  getGroupById: (id: number) => void;
  suggestGroupByName: (params: GroupSearchParams) => void;
  setCurrentGroup: (group: Group | GroupShort) => void;
  removeCurrentGroup: () => void;
  addGroupToFavourite: (group: GroupShort) => void;
  removeGroupFromFavourite: (group: GroupShort) => void;
};

export const useGroup = create<GroupState & GroupActions>()(
  persist(
    (set) => ({
      currentGroup: null,
      groups: [],
      searchedGroups: [],
      favouriteGroups: [],
      getAllGroups: async () => {
        const response = await groupService.getAllGroups();
        set({ groups: response.data });
      },
      getGroupByName: async (name) => {
        const response = await groupService.getGroupByName(name);
        set({ currentGroup: response.data });
      },
      getGroupById: async (id) => {
        const response = await groupService.getGroupById(id);
        set({ currentGroup: response.data });
      },
      suggestGroupByName: async (params: GroupSearchParams) => {
        const response = await groupService.suggestGroupByName(params);
        set({
          searchedGroups: response.data,
        });
      },

      setCurrentGroup: (group) => {
        set({ currentGroup: group });
      },

      removeCurrentGroup: () => {
        set({ currentGroup: null });
      },

      addGroupToFavourite: (group: GroupShort) => {
        set((state) => ({
          favouriteGroups: [...state.favouriteGroups, group],
        }));
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
      }),
    }
  )
);
