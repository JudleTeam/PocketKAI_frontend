import { AxiosResponse } from 'axios';

export type Nullable<T> = T | null;
export type SelectItem<T> = { value: T; label: string };
export type ApiResponse<T> = Promise<AxiosResponse<T>>;
