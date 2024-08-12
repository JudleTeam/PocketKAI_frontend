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
import { formWeekSchedule } from '../lib/formWeekSchedule';

type StoreState = {
  schedule: Schedule;
  weekSchedule: Nullable<FullWeekSchedule>;
  examsSchedule: null;
  parity: Nullable<WeekParity>;
  scheduleStatus: FetchStatus;
  weekScheduleStatus: FetchStatus;
  error: Nullable<unknown>;
};
type StoreActions = {
  getFullWeekScheduleByName: (name: string) => Promise<void>;
  addToCurrentSchedule: (
    params: ScheduleParams,
    isNextWeek?: boolean
  ) => Promise<void>;
  getSchedule: (params: ScheduleParams) => Promise<void>;
  getWeekParity: (params?: WeekParity) => Promise<void>;
  resetScheduleState: () => void;
};

const initialState: StoreState = {
  schedule: { parsed_at: '', days: [] },
  weekSchedule: null,
  examsSchedule: null,
  parity: null,
  scheduleStatus: 'idle',
  weekScheduleStatus: 'idle',
  error: null,
};

export const useSchedule = create<StoreState & StoreActions>((set, get) => ({
  ...initialState,
  getFullWeekScheduleByName: async (name) => {
    set({ weekScheduleStatus: 'loading' });
    try {
      const response = await scheduleService.getWeekScheduleByGroupName(name, {
        week_parity: 'any',
      });
      const anyWeek = formWeekSchedule(response.data);

      set({
        weekSchedule: { odd: anyWeek.odd, even: anyWeek.even },
        weekScheduleStatus: 'success',
      });
    } catch (error) {
      set({ error, weekScheduleStatus: 'error' });
    }
  },
  addToCurrentSchedule: async (params: ScheduleParams, isNextWeek = false) => {
    set({ scheduleStatus: 'loading' });
    try {
      const response = await generateDateSchedule(get().weekSchedule, params);
      set({
        schedule: {
          parsed_at: response.parsed_at,
          days: isNextWeek
            ? [...get().schedule.days, ...response.days]
            : [...response.days, ...get().schedule.days],
        },
        scheduleStatus: 'idle',
      });
    } catch (error) {
      set({ error, scheduleStatus: 'error' });
    }
  },
  getSchedule: async (params: ScheduleParams) => {
    const response = await generateDateSchedule(get().weekSchedule, params);
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
  resetScheduleState: () => set(initialState),
}));
