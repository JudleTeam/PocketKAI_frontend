import { StoreBackgroundTasks } from '../model/types';

export const formStoreBackgroundTasks = (
  task: string
): StoreBackgroundTasks | null => {
  if (!task) return null;
  return { id: task, status: 'IDLE' };
};
