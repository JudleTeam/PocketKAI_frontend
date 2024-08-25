import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SettingsState = {
  showFadedLessons: boolean;
  isScheduleInfinite: boolean;
  showTimeline: boolean;
};

type SettingsActions = {
  toggleShowFadedLessons: (value: boolean) => void;
  toggleIsScheduleInfinite: (value: boolean) => void;
  toggleShowTimeline: (value: boolean) => void;
};

export const useSettings = create<SettingsState & SettingsActions>()(
  persist(
    (set) => ({
      showFadedLessons: true,
      isScheduleInfinite: true,
      showTimeline: true,
      toggleShowFadedLessons: (value) => {
        set({ showFadedLessons: value });
      },
      toggleIsScheduleInfinite: (value) => {
        set({ isScheduleInfinite: value });
      },
      toggleShowTimeline: (value) => {
        set({ showTimeline: value });
      }
    }),
    {
      name: 'settings',
      partialize: (state) => ({
        showFadedLessons: state.showFadedLessons,
        isScheduleInfinite: state.isScheduleInfinite,
        showTimeline: state.showTimeline,
      }),
    }
  )
);
