import { BackgroundTasks, StoreBackgroundTasks } from '../types';

export const formStoreBackgroundTasks = (
  tasks: BackgroundTasks
): StoreBackgroundTasks => {
  if (!tasks) return [];
  return Object.entries(tasks).map(([key, value]) => {
    return { name: key, id: value, status: 'IDLE' };
  });
};
