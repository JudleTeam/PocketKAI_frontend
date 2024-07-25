export type AuthParams = {
  login: string;
  password: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
};
