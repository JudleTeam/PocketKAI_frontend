import { AxiosResponse } from 'axios';

export type Nullable<T> = T | null;
export type SelectItem<T> = { value: T; label: string };
export type ApiResponse<T> = Promise<AxiosResponse<T>>;
export type FetchStatus = 'loading' | 'success' | 'error' | 'idle' | 'cantGetSchedule';
export type BackgroundTaskStatus =
  | 'PENDING'
  | 'STARTED'
  | 'SUCCESS'
  | 'FAILED'
  | 'IDLE';
