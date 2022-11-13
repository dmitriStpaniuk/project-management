export type User = {
  id: string;
  login: string;
};
export type DecodedToken = {
  userId: string;
  login: string;
};

export type SignupUserData = {
  name: string;
  login: string;
  password: string;
};

export type LoginUserData = Omit<SignupUserData, 'name'>;

export type TokenResponse = {
  token: string;
};
