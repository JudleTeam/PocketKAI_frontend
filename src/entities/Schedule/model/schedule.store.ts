import { create } from 'zustand';
import { ScheduleParams, WeekScheduleParams } from './types';
import { scheduleService } from './schedule.service';
import {
  Nullable,
  Schedule,
  WeekSchedule,
  WeekParity,
  FetchStatus,
} from '@/shared';

type ScheduleStore = {
  schedule: Nullable<Schedule>;
  weekSchedule: Nullable<WeekSchedule>;
  examsSchedule: null;
  parity: Nullable<WeekParity>;
  status: FetchStatus;
  error: Nullable<unknown>;
  getWeekScheduleById: (id: number, params?: WeekScheduleParams) => void;
  getWeekScheduleByName: (name: string, params?: WeekScheduleParams) => void;
  geScheduleById: (id: number, params?: ScheduleParams) => void;
  getScheduleByName: (name: string, params?: ScheduleParams) => void;
  getWeekParity: (params?: WeekParity) => void;
};

export const useSchedule = create<ScheduleStore>((set) => ({
  schedule: null,
  weekSchedule: null,
  examsSchedule: null,
  parity: null,
  status: 'idle',
  error: null,
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
    set({ status: 'loading' });
    try {
      const response = await scheduleService.getScheduleByGroupId(id, params);
      set((state) => ({
        ...state,
        schedule: { ...state.schedule, ...response.data },
        status: 'success',
      }));
    } catch (error) {
      set({ error, status: 'error' });
    }
  },
  getScheduleByName: async (name: string, params?: ScheduleParams) => {
    set({ status: 'loading' });
    try {
      const response = await scheduleService.getScheduleByGroupName(
        name,
        params
      );
      set((state) => ({
        ...state,
        schedule: { ...state.schedule, ...response.data },
        status: 'success',
      }));
    } catch (error) {
      set({ error, status: 'error' });
    }
  },
  getWeekParity: async (params?: WeekParity) => {
    const response = await scheduleService.getWeekParity(params);
    set({ parity: response.data });
  },
}));
