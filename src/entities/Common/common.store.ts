import { create } from 'zustand';
import { commonService } from './common.service';
import { persist } from 'zustand/middleware';
import { FetchStatus } from '@/shared';

type CommonStore = {
  buildings: Record<string, string>;
  buildingsStatus: FetchStatus;
  getBuildings: () => Promise<void>;
};

export const useCommon = create<CommonStore>()(
  persist(
    (set) => ({
      buildings: {},
      buildingsStatus: 'idle',
      getBuildings: async () => {
        set({ buildingsStatus: 'loading' });
        try {
          const response = await commonService.getBuildings();
          set({ buildings: response.data, buildingsStatus: 'success' });
        } catch (error) {
          set({ buildingsStatus: 'error' });
        }
      },
    }),
    {
      name: 'common',
      partialize: (state) => ({
        buildings: state.buildings,
        buildingsStatus: state.buildingsStatus,
      }),
    }
  )
);
