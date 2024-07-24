import { create } from 'zustand';
import { ScheduleParams } from './types';
import { scheduleService } from './schedule.service';
import {
  Nullable,
  Schedule,
  WeekParity,
  FetchStatus,
  FullWeekSchedule,
} from '@/shared';

type ScheduleStore = {
  schedule: Schedule;
  weekSchedule: Nullable<FullWeekSchedule>;
  examsSchedule: null;
  parity: Nullable<WeekParity>;
  status: FetchStatus;
  error: Nullable<unknown>;
  // getWeekScheduleById: (
  //   id: number,
  //   params?: WeekScheduleParams
  // ) => Promise<void>;
  // getWeekScheduleByName: (
  //   name: string,
  //   params?: WeekScheduleParams
  // ) => Promise<void>;
  getFullWeekScheduleByName: (name: string) => Promise<void>;
  getScheduleById: (id: number, params?: ScheduleParams) => Promise<void>;
  getScheduleByName: (
    name: string,
    params?: ScheduleParams,
    isNextWeek?: boolean
  ) => Promise<void>;
  getWeekParity: (params?: WeekParity) => Promise<void>;
};

export const useSchedule = create<ScheduleStore>((set, get) => ({
  schedule: { parsed_at: '', days: [] },
  weekSchedule: null,
  examsSchedule: null,
  parity: null,
  status: 'idle',
  error: null,
  // getWeekScheduleById: async (id: number, params?: WeekScheduleParams) => {
  //   const response = await scheduleService.getWeekScheduleByGroupId(id, params);
  //   set({ weekSchedule: response.data });
  // },
  // getWeekScheduleByName: async (name: string, params?: WeekScheduleParams) => {
  //   const response = await scheduleService.getWeekScheduleByGroupName(
  //     name,
  //     params
  //   );
  //   set({ weekSchedule: response.data });
  // },
  getFullWeekScheduleByName: async (name) => {
    set({ status: 'loading' });
    try {
      const oddWeek = await scheduleService.getWeekScheduleByGroupName(name, {
        week_parity: 'odd',
      });
      const evenWeek = await scheduleService.getWeekScheduleByGroupName(name, {
        week_parity: 'even',
      });
      set({
        weekSchedule: { odd: oddWeek.data, even: evenWeek.data },
        status: 'success',
      });
    } catch (error) {
      set({ error, status: 'error' });
    }
  },
  getScheduleById: async (id: number, params?: ScheduleParams) => {
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
  getScheduleByName: async (
    name: string,
    params?: ScheduleParams,
    isNextWeek = false
  ) => {
    set({ status: 'loading' });
    try {
      const response = await scheduleService.getScheduleByGroupName(
        name,
        params
      );
      set({
        schedule: {
          parsed_at: response.data.parsed_at,
          days: isNextWeek
            ? [...get().schedule.days, ...response.data.days]
            : [...response.data.days, ...get().schedule.days],
        },
        status: 'success',
      });
    } catch (error) {
      set({ error, status: 'error' });
    }
  },
  getWeekParity: async (params?: WeekParity) => {
    const response = await scheduleService.getWeekParity(params);
    set({ parity: response.data });
  },
}));
