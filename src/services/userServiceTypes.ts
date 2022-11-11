export type TUserResponse = {
  id: string;
  name: string;
  login: string;
};

export type TSignupUserData = {
  name: string;
  login: string;
  password: string;
};

export type TLoginUserData = {
  login: string;
  password: string;
};

export type ITokenResponse = {
  token: string;
};
