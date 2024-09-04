import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ScheduleView } from '@/shared';

type SettingsState = {
  showFadedLessons: boolean;
  isScheduleInfinite: boolean;
  preferencedScheduleView: ScheduleView;
  isColoredDayDate: boolean;
};

type SettingsActions = {
  toggleShowFadedLessons: (value: boolean) => void;
  toggleIsScheduleInfinite: (value: boolean) => void;
  togglePreferencedScheduleView: (value: ScheduleView) => void;
  toggleIsColoredDayDate: (value: boolean) => void;
};

export const useSettings = create<SettingsState & SettingsActions>()(
  persist(
    (set) => ({
      showFadedLessons: true,
      isScheduleInfinite: true,
      isColoredDayDate: true,
      preferencedScheduleView: 'timeline',
      toggleShowFadedLessons: (value) => {
        set({ showFadedLessons: value });
      },
      toggleIsScheduleInfinite: (value) => {
        set({ isScheduleInfinite: value });
      },
      togglePreferencedScheduleView: (value) => {
        set({ preferencedScheduleView: value });
      },
      toggleIsColoredDayDate(value) {
        set({ isColoredDayDate: value });
      },
    }),
    {
      name: 'settings',
      partialize: (state) => ({
        showFadedLessons: state.showFadedLessons,
        isScheduleInfinite: state.isScheduleInfinite,
        preferencedScheduleView: state.preferencedScheduleView,
        isColoredDayDate: state.isColoredDayDate,
      }),
    }
  )
);
