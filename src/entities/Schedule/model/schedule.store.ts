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
import { generateDateSchedule } from '../lib/generateDateSchedule';

type ScheduleStore = {
  schedule: Schedule;
  weekSchedule: Nullable<FullWeekSchedule>;
  examsSchedule: null;
  parity: Nullable<WeekParity>;
  scheduleStatus: FetchStatus;
  weekScheduleStatus: FetchStatus;
  error: Nullable<unknown>;
  // getWeekScheduleById: (
  //   id: number,
  //   params?: WeekScheduleParams
  // ) => Promise<void>;
  // getWeekScheduleByName: (
  //   name: string,
  //   params?: WeekScheduleParams
  // ) => Promise<void>;
  // getScheduleById: (id: number, params?: ScheduleParams) => Promise<void>;
  getFullWeekScheduleByName: (name: string) => Promise<void>;
  addToCurrentSchedule: (params: ScheduleParams, isNextWeek?: boolean) => void;
  getSchedule: (params: ScheduleParams) => void;
  getWeekParity: (params?: WeekParity) => Promise<void>;
};

export const useSchedule = create<ScheduleStore>((set, get) => ({
  schedule: { parsed_at: '', days: [] },
  weekSchedule: null,
  examsSchedule: null,
  parity: null,
  scheduleStatus: 'idle',
  weekScheduleStatus: 'idle',
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
    set({ weekScheduleStatus: 'loading' });
    try {
      const oddWeek = await scheduleService.getWeekScheduleByGroupName(name, {
        week_parity: 'odd',
      });
      const evenWeek = await scheduleService.getWeekScheduleByGroupName(name, {
        week_parity: 'even',
      });
      set({
        weekSchedule: { odd: oddWeek.data, even: evenWeek.data },
        weekScheduleStatus: 'success',
      });
    } catch (error) {
      set({ error, weekScheduleStatus: 'error' });
    }
  },
  // getScheduleById: async (id: number, params?: ScheduleParams) => {
  //   set({ scheduleStatus: 'loading' });
  //   try {
  //     const response = await scheduleService.getScheduleByGroupId(id, params);
  //     set((state) => ({
  //       ...state,
  //       schedule: { ...state.schedule, ...response.data },
  //       status: 'success',
  //     }));
  //   } catch (error) {
  //     set({ error, scheduleStatus: 'error' });
  //   }
  // },
  addToCurrentSchedule: (params: ScheduleParams, isNextWeek = false) => {
    const response = generateDateSchedule(get().weekSchedule, params);
    set({
      schedule: {
        parsed_at: response.parsed_at,
        days: isNextWeek
          ? [...get().schedule.days, ...response.days]
          : [...response.days, ...get().schedule.days],
      },
    });
  },
  getSchedule: (params: ScheduleParams) => {
    const response = generateDateSchedule(get().weekSchedule, params);
    set({
      schedule: {
        parsed_at: response.parsed_at,
        days: response.days,
      },
    });
  },
  getWeekParity: async (params?: WeekParity) => {
    const response = await scheduleService.getWeekParity(params);
    set({ parity: response.data });
  },
}));
