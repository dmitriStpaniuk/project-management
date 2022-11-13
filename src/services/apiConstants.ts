export enum EApiParametrs {
  baseUrl = 'https://mysterious-escarpment-15159.herokuapp.com', // heroku postgress
  // baseUrl = 'https://final-task-backend-production-336e.up.railway.app' // railway Mongo
  tokenLocalStorage = 'token',
}

export enum EApiRoutes {
  users = 'users',
  signin = 'signin',
  signup = 'signup',
  boards = 'boards',
  columns = 'columns',
  tasks = 'tasks',
  file = 'file',
}

export const getTokenLocalStorage = (): string => {
  const token = localStorage.getItem(EApiParametrs.tokenLocalStorage);

  return token ? `Bearer ${token}` : '';
};

export const setTokenLocalStorage = (token: string): void => {
  localStorage.setItem(EApiParametrs.tokenLocalStorage, token);
};
