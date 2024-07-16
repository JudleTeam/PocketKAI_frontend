import { Group } from '@/shared';
import { Nullable, GroupName } from '@/shared';
import { create } from 'zustand';
import { groupService } from './group.service';
import { GroupNameParams } from './types';

type GroupStore = {
  groups: Group[];
  groups_name: GroupName[];
  currentGroup: Nullable<Group>;
  getAllGroups: () => void;
  getGroupByName: (name: string) => void;
  getGroupById: (id: number) => void;
  suggestGroupByName: (params: GroupNameParams) => void
};

export const useGroup = create<GroupStore>((set) => ({
  currentGroup: null,
  groups: [],
  groups_name: [],
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
  suggestGroupByName: async (params:GroupNameParams) => {
    const response = await groupService.suggestGroupByName(params)
    set({ groups_name: response.data })
  }
}));
