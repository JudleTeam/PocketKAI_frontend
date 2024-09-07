import { create } from 'zustand';
import { ScheduleParams } from './types';
import { scheduleService } from './schedule.service';
import {
  Nullable,
  Schedule,
  WeekParity,
  FetchStatus,
  FullWeekSchedule,
  HiddenLesson,
} from '@/shared';
import { generateDateSchedule } from '../lib/generateDateSchedule';
import { formWeekSchedule } from '../lib/formWeekSchedule';
import { DateTime } from 'luxon';
import { getCurrentSemester } from '../lib/getCurrentSemester';
import { persist } from 'zustand/middleware';
import { getWeekParityDate } from '@/shared/lib';

type StoreState = {
  schedule: Schedule;
  weekSchedule: Nullable<FullWeekSchedule>;
  semester: 'first' | 'second' | 'winterHoliday' | 'summerHoliday' | 'holiday';
  examsSchedule: null;
  showFadedLessons: boolean;
  parity: Nullable<WeekParity>;
  scheduleStatus: FetchStatus;
  weekScheduleStatus: FetchStatus;
  hiddenLessons: HiddenLesson[];
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
  setShowFadedLessons: (showFadedLessons: boolean) => void;
  resetScheduleState: () => void;
  addHiddenLesson: (lesson: HiddenLesson, isAlways?: boolean) => void;
  updateHiddenLesson: (today: string) => void;
  deleteHiddenLesson: (id: string, type_hide: string) => void;
  deleteAllHiddenLesson: () => void;
};

const initialState: StoreState = {
  schedule: { parsed_at: '', days: [] },
  weekSchedule: null,
  examsSchedule: null,
  semester: getCurrentSemester(),
  showFadedLessons: true,
  parity: {
    date: '',
    parity:
      DateTime.now().setZone('Europe/Moscow').weekNumber % 2 ? 'odd' : 'even',
    int_parity: 0,
  },
  scheduleStatus: 'idle',
  weekScheduleStatus: 'idle',
  hiddenLessons: [],
  error: null,
};

export const useSchedule = create<StoreState & StoreActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      getFullWeekScheduleByName: async (name) => {
        set({ weekScheduleStatus: 'loading' });
        try {
          const response = await scheduleService.getWeekScheduleByGroupName(
            name,
            {
              week_parity: 'any',
            }
          );
          const anyWeek = formWeekSchedule(response.data);

          set({
            weekSchedule: { odd: anyWeek.odd, even: anyWeek.even },
            weekScheduleStatus: 'success',
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
      addHiddenLesson: async (lesson: HiddenLesson, isAlways?: boolean) => {
        const currentHiddenLessons = get().hiddenLessons;

        const updatedHiddenLessons = currentHiddenLessons.filter(
          (hiddenLesson) => {
            const isSameLesson = hiddenLesson.id === lesson.id;

            // Обрабатываем "скрыть навсегда"
            if (lesson.type_hide === 'always') {
              return !isSameLesson;
            }

            // Обрабатываем чётные/нечётные недели
            if (lesson.type_hide === 'odd' || lesson.type_hide === 'even') {
              const typeHideParity = lesson.type_hide;

              const hasOppositeParity = currentHiddenLessons.some(
                (hiddenLesson) =>
                  hiddenLesson.id === lesson.id &&
                  ((hiddenLesson.type_hide === 'odd' &&
                    typeHideParity === 'even') ||
                    (hiddenLesson.type_hide === 'even' &&
                      typeHideParity === 'odd'))
              );

              if (hasOppositeParity) {
                // Удаляем противоположную запись (чёт/нечёт)
                if (isAlways) {
                  hiddenLesson.type_hide = 'always';
                }
                return !isSameLesson;
              }

              // Удаляем записи с конкретной датой, если совпадают по чётности
              if (hiddenLesson.type_hide.includes('-')) {
                const hiddenLessonParity = getWeekParityDate(
                  hiddenLesson.type_hide
                );
                return !(isSameLesson && hiddenLessonParity === typeHideParity);
              }

              // Удаляем существующие "always"
              if (hiddenLesson.type_hide === 'always') {
                return !isSameLesson;
              }

              return true;
            }

            return true;
          }
        );

        // Проверка на дубликаты
        const isDuplicate = updatedHiddenLessons.some(
          (hiddenLesson) =>
            hiddenLesson.id === lesson.id &&
            hiddenLesson.type_hide === lesson.type_hide
        );

        if (!isDuplicate) {
          set({
            hiddenLessons: [...updatedHiddenLessons, lesson],
          });
        }
      },
      updateHiddenLesson: async (today: string) => {
        const updatedHiddenLessons = get().hiddenLessons.filter((lesson) => {
          return !(
            (lesson.type_hide.includes('-') && lesson.type_hide < today) ||
            getCurrentSemester() === 'holiday'
          );
        });
        set({
          hiddenLessons: updatedHiddenLessons,
        });
      },
      deleteHiddenLesson: async (id: string, type_hide: string) => {
        const updatedHiddenLessons = get().hiddenLessons.filter(
          (lesson) => lesson.id !== id || lesson.type_hide !== type_hide
        );
        set({
          hiddenLessons: updatedHiddenLessons,
        });
      },
      deleteAllHiddenLesson: async () => {
        set({
          hiddenLessons: [],
        });
      },
      getWeekParity: async (params?: WeekParity) => {
        const response = await scheduleService.getWeekParity(params);
        set({ parity: response.data });
      },

      setShowFadedLessons: (value) => {
        set({ showFadedLessons: value });
      },

      resetScheduleState: () => set(initialState),
    }),
    {
      name: 'schedule',
      partialize: (state) => ({
        showFadedLessons: state.showFadedLessons,
        hiddenLessons: state.hiddenLessons,
      }),
    }
  )
);
