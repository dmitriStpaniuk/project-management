export interface IHeaders {
  [key: string]: string;
}

export interface IApiInitialData {
  baseUrl: string;
  headers: IHeaders;
}

export interface ISignupUserData {
  name: string;
  login: string;
  password: string;
}

export interface ILoginUserData {
  login: string;
  password: string;
}

export interface ITokenResponse {
  token: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  login: string;
}

export interface IApiUsers {
  baseUrl: string;
  headers: IHeaders;
  getAllUsers: () => Promise<IUserResponse[]>;
  getUserById: (userId: string) => Promise<IUserResponse>;
  deleteUserById: (userId: string) => Promise<void>;
  updateUser: (userId: string, userData: ISignupUserData) => Promise<IUserResponse>;
  createNewUser: (newUser: ISignupUserData) => Promise<IUserResponse>;
  signin: (userData: ILoginUserData) => Promise<ITokenResponse>;
}
