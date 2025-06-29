import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FullScheduleView, ScheduleView } from '@/shared';

type SettingsState = {
  showFadedLessons: boolean;
  isScheduleInfinite: boolean;
  isNotesOn: boolean;
  preferencedScheduleView: ScheduleView;
  isColoredDayDate: boolean;
  fullScheduleView: FullScheduleView;
};

type SettingsActions = {
  toggleShowFadedLessons: (value: boolean) => void;
  toggleIsScheduleInfinite: (value: boolean) => void;
  togglePreferencedScheduleView: (value: ScheduleView) => void;
  toggleIsColoredDayDate: (value: boolean) => void;
  toggleFullScheduleView: (value: FullScheduleView) => void;
  toggleIsNotesOn: (value: boolean) => void;
};

export const useSettings = create<SettingsState & SettingsActions>()(
  persist(
    (set) => ({
      showFadedLessons: true,
      isScheduleInfinite: true,
      isColoredDayDate: true,
      isNotesOn: true,
      preferencedScheduleView: 'timeline',
      fullScheduleView: 'day',
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
      toggleFullScheduleView(value) {
        set({ fullScheduleView: value });
      },
      toggleIsNotesOn(value) {
        set({ isNotesOn: value });
      },
    }),
    {
      name: 'settings-new',
      partialize: (state) => ({
        showFadedLessons: state.showFadedLessons,
        isScheduleInfinite: state.isScheduleInfinite,
        isNotesOn: state.isNotesOn,
        preferencedScheduleView: state.preferencedScheduleView,
        isColoredDayDate: state.isColoredDayDate,
        fullScheduleView: state.fullScheduleView,
      }),
    }
  )
);
