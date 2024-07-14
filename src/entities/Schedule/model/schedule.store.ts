import { createStore } from 'zustand';
import { ScheduleParams, WeekScheduleParams } from './types';
import { scheduleService } from './schedule.service';

export const useSchedule = createStore((set) => ({
  schedule: null,
  weekSchedule: null,
  examsSchedule: null,
  getWeekScheduleById: async (id: number, params: WeekScheduleParams) => {
    const response = await scheduleService.getWeekScheduleByGroupId(id, params);
    set({ weekSchedule: response.data });
  },
  getWeekScheduleByName: async (name: string, params: WeekScheduleParams) => {
    const response = await scheduleService.getWeekScheduleByGroupName(
      name,
      params
    );
    set({ weekSchedule: response.data });
  },
  geScheduleByName: async (name: string, params: ScheduleParams) => {
    const response = await scheduleService.getScheduleByGroupName(name, params);
    set({ schedule: response.data });
  },
  getScheduleByName: async (name: string, params: ScheduleParams) => {
    const response = await scheduleService.getScheduleByGroupName(name, params);
    set({ schedule: response.data });
  },
}));
