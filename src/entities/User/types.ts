import { BackgroundTaskStatus } from '@/shared';

export type AuthParams = {
  login: string;
  password: string;
};
export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};
export type BackgroundTasks = {
  group_documents: string;
  group_members: string;
};
export type StoreBackgroundTasks = {
  name: string;
  id: string;
  status: BackgroundTaskStatus;
}[];
export type AuthResponse = {
  auth: TokenResponse;
  background_tasks: BackgroundTasks;
};
