export type AuthParams = {
  login: string;
  password: string;
};
export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};
type BackgroundTasks = {
  group_documents: string;
  group_members: string;
}
export type AuthResponse = {
  auth: TokenResponse;
  background_tasks: BackgroundTasks;
}
