import { EApiParametrs, checkRes, getJwtToken } from './apiConstants';
import {
  IHeaders,
  IApiInitialData,
  IUserResponse,
  IApiUsers,
  ISignupUserData,
  ILoginUserData,
  ITokenResponse,
} from './apiTypes';

class ApiUsers implements IApiUsers {
  public baseUrl = '';
  public headers: IHeaders = {};
  constructor(options: IApiInitialData) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  /* getAllUsers
    Get all users
    route:  /users 

    Responses: 
    [
      { 
        id: string;  
        name: string;
        login: string;
      }
    ]
  */
  public async getAllUsers(): Promise<IUserResponse[]> {
    const fetchConfig = {
      method: 'GET',
      headers: { ...this.headers, authorization: getJwtToken() },
    };

    const rawRes = await fetch(`${this.baseUrl}/users`, fetchConfig);

    const res = checkRes(rawRes) as unknown;
    return res as IUserResponse[];
  }

  /* getUserById
    Get the user by id
    route:  /users/{id} 

    Responses: 
    { 
      id: string;  
      name: string;
      login: string;
    }
  */
  public async getUserById(userId: string): Promise<IUserResponse> {
    const fetchConfig = {
      method: 'GET',
      headers: { ...this.headers, authorization: getJwtToken() },
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}`, fetchConfig);

    const wordsRes = checkRes(res) as unknown;
    return wordsRes as IUserResponse;
  }

  /* deleteUserById
    Delete user
    route:  /users/{id} 
  */
  public async deleteUserById(userId: string): Promise<void> {
    const fetchConfig = {
      method: 'DELETE',
      headers: { ...this.headers, authorization: getJwtToken() },
    };

    await fetch(`${this.baseUrl}/users/${userId}`, fetchConfig);
  }

  /* updateUser
    Update user
    route:  /users/{id} 

    Request body (required):
      {
        name: string;
        login: string;
        password: string;
      }

    Responses: 
      { 
        id: string;  
        name: string;
        login: string;
      }
  */
  public async updateUser(userId: string, userData: ISignupUserData): Promise<IUserResponse> {
    const fetchConfig = {
      method: 'PUT',
      headers: { ...this.headers, authorization: getJwtToken() },
      body: JSON.stringify(userData),
    };

    const res = await fetch(`${this.baseUrl}/users/${userId}`, fetchConfig);

    const wordsRes = checkRes(res) as unknown;
    return wordsRes as IUserResponse;
  }

  /*  createNewUser
    Sign up to create an account
    route:  /signup

    Request body (required):
      {
        name: string;
        login: string;
        password: string;
      }

    Responses: 
      { 
        id: string;  
        name: string;
        login: string;
      }
  */
  public async createNewUser(newUser: ISignupUserData): Promise<IUserResponse> {
    const fetchConfig = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(newUser),
    };

    const res = await fetch(`${this.baseUrl}/users`, fetchConfig);
    const userRes = checkRes(res) as unknown;
    return userRes as IUserResponse;
  }

  /* signin
    Logins a user and returns a JWT-token
    route:  /signin 

    Request body (required):
      {
        login: string;
        password: string;
      }

    Responses: 
      {
        token: string;
      }
  */
  public async signin(userData: ILoginUserData): Promise<ITokenResponse> {
    const fetchConfig = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(userData),
    };

    const rawRes = await fetch(`${this.baseUrl}/signin`, fetchConfig);
    const res = checkRes(rawRes) as unknown;

    return res as ITokenResponse;
  }
}

// create instance of the api class

export const apiUsers = new ApiUsers({
  baseUrl: EApiParametrs.baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: '',
  },
});
