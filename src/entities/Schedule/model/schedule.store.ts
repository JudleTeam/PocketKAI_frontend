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
import { DateTime } from 'luxon';
import { getCurrentSemester } from '../lib/getCurrentSemester';
import { persist } from 'zustand/middleware';
import { StoreBackgroundTasks } from './types';
import { formStoreBackgroundTasks } from '../lib/formStoreBackgroundTasks';

type StoreState = {
  schedule: Schedule;
  weekSchedule: Nullable<FullWeekSchedule>;
  semester: 'first' | 'second' | 'winterHoliday' | 'summerHoliday' | 'holiday';
  examsSchedule: null;
  showFadedLessons: boolean;
  parity: Nullable<WeekParity>;
  scheduleStatus: FetchStatus;
  weekScheduleStatus: FetchStatus;
  backgroundTask: StoreBackgroundTasks | null;
  isReady: boolean;
  error: Nullable<unknown>;
};

type StoreActions = {
  getFullWeekScheduleById: (id: string) => Promise<void>;
  addToCurrentSchedule: (
    params: ScheduleParams,
    isNextWeek?: boolean
  ) => Promise<void>;
  getSchedule: (params: ScheduleParams) => Promise<void>;
  getWeekParity: (params?: WeekParity) => Promise<void>;
  getBackgroundTaskStatus: (taskId: string) => Promise<void>;
  setShowFadedLessons: (showFadedLessons: boolean) => void;
  clearSchedule: () => void;
  clearScheduleStatus: () => void;
  resetScheduleState: () => void;
};

const initialState: StoreState = {
  schedule: { parsed_at: '', days: [] },
  weekSchedule: null,
  examsSchedule: null,
  semester: getCurrentSemester(),
  showFadedLessons: true,
  backgroundTask: null,
  parity: {
    date: '',
    parity:
      DateTime.now().setZone('Europe/Moscow').weekNumber % 2 ? 'odd' : 'even',
    int_parity: 0,
  },
  scheduleStatus: 'idle',
  weekScheduleStatus: 'idle',
  error: null,
  isReady: false,
};

export const useSchedule = create<StoreState & StoreActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      getFullWeekScheduleById: async (id) => {
        set({ weekScheduleStatus: 'loading' });
        try {
          const response = await scheduleService.getWeekScheduleByGroupId(id, {
            week_parity: 'any',
          });
          const anyWeek = formWeekSchedule(response.data);
          const task = formStoreBackgroundTasks(
            response.data.background_task_id
          );

          set({
            weekSchedule: { odd: anyWeek.odd, even: anyWeek.even },
            weekScheduleStatus: 'success',
            backgroundTask: task,
            isReady: response.data.is_ready
          });
        } catch (error) {
          set({ error, weekScheduleStatus: 'error' });
        }
      },
      addToCurrentSchedule: async (
        params: ScheduleParams,
        isNextWeek = false
      ) => {
        set({ scheduleStatus: 'loading' });
        try {
          const response = await generateDateSchedule(
            get().weekSchedule,
            params
          );
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

      getBackgroundTaskStatus: async (taskId) => {
        if (!taskId) return;
        const response = await scheduleService.getBackgroundTaskStatus(taskId);
        const task = get().backgroundTask;

        if (task) {
          set({
            backgroundTask: { ...task, status: response.data.status },
          });
        }
      },
      setShowFadedLessons: (value) => {
        set({ showFadedLessons: value });
      },
      clearScheduleStatus: () => {
        set({weekScheduleStatus: 'idle'})
      }, 
      clearSchedule: () => {
        set({
          weekSchedule: null,
          weekScheduleStatus: 'idle',
          backgroundTask: null,
          isReady: false
        })
      },

      resetScheduleState: () => set(initialState),
    }),
    {
      name: 'schedule',
      partialize: (state) => ({
        showFadedLessons: state.showFadedLessons,
        backgroundTask: state.backgroundTask,
      }),
    }
  )
);
