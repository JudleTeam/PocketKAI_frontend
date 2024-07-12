import { Group } from '@/shared';
import { Nullable } from '@/shared';
import { create } from 'zustand';
import { groupService } from './group.service';

type GroupStore = {
  groups: Group[];
  currentGroup: Nullable<Group>;
  getAllGroups: () => void;
  getGroupByName: (name: string) => void;
  getGroupById: (id: number) => void;
};

export const useGroup = create<GroupStore>((set) => ({
  currentGroup: null,
  groups: [],
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
}));
