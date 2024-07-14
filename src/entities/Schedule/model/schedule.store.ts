import { create } from 'zustand';
import { ScheduleParams, WeekScheduleParams } from './types';
import { scheduleService } from './schedule.service';
import { Nullable, Schedule, WeekSchedule } from '@/shared';

type ScheduleStore = {
  schedule: Nullable<Schedule>;
  weekSchedule: Nullable<WeekSchedule>;
  examsSchedule: null;
  getWeekScheduleById: (id: number, params?: WeekScheduleParams) => void;
  getWeekScheduleByName: (name: string, params?: WeekScheduleParams) => void;
  geScheduleById: (id: number, params?: ScheduleParams) => void;
  getScheduleByName: (name: string, params?: ScheduleParams) => void;
};

export const useSchedule = create<ScheduleStore>((set) => ({
  schedule: null,
  weekSchedule: null,
  examsSchedule: null,
  getWeekScheduleById: async (id: number, params?: WeekScheduleParams) => {
    const response = await scheduleService.getWeekScheduleByGroupId(id, params);
    set({ weekSchedule: response.data });
  },
  getWeekScheduleByName: async (name: string, params?: WeekScheduleParams) => {
    const response = await scheduleService.getWeekScheduleByGroupName(
      name,
      params
    );
    set({ weekSchedule: response.data });
  },
  geScheduleById: async (id: number, params?: ScheduleParams) => {
    const response = await scheduleService.getScheduleByGroupId(id, params);
    set({ schedule: response.data });
  },
  getScheduleByName: async (name: string, params?: ScheduleParams) => {
    const response = await scheduleService.getScheduleByGroupName(name, params);
    set({ schedule: response.data });
  },
}));
