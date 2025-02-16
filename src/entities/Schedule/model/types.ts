import { BackgroundTaskStatus } from '@/shared';

export type WeekScheduleParams = {
  week_parity: 'odd' | 'even' | 'any';
};

export type ScheduleParams = {
  date_from: string;
  days_count: number;
};

export type ParityParams = {
  date: string;
};

export type StoreBackgroundTasks = {
  id: string;
  status: BackgroundTaskStatus;
};
