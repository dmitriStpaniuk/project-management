export enum EApiParametrs {
  baseUrl = 'https://mysterious-escarpment-15159.herokuapp.com', // heroku postgress
  // baseUrl = 'https://final-task-backend-production-336e.up.railway.app' // railway Mongo
  tokenLocalStorage = 'token',
}

export enum EApiRoutes {
  users = '/users',
  signin = '/signin',
  signup = '/signup',
}

export const getTokenLocalStorage = (): string => {
  let res = '';
  if (localStorage.getItem(EApiParametrs.tokenLocalStorage)) {
    const token = localStorage.getItem(EApiParametrs.tokenLocalStorage);
    res = `Bearer ${token}`;
  }
  return res;
};

export const setTokenLocalStorage = (token: string): void => {
  localStorage.setItem(EApiParametrs.tokenLocalStorage, token);
};
