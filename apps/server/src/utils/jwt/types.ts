export type GenerateAccessTokenArgs = {
  user_id: string;
};
export type AccessToken = {
  user_id: string;
};

export type GenerateAccessTokenFn = (
  args: GenerateAccessTokenArgs,
) => Promise<string>;
