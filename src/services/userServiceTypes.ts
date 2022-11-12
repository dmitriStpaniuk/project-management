export type UserResponse = {
  id: string;
  // name: string;
  login: string;
};

export type SignupUserData = {
  name: string;
  login: string;
  password: string;
};

export type LoginUserData = {
  login: string;
  password: string;
};

export type TokenResponse = {
  token: string;
};
