export enum EApiParametrs {
  baseUrl = 'https://mysterious-escarpment-15159.herokuapp.com', // heroku postgress
  // baseUrl = 'https://final-task-backend-production-336e.up.railway.app' // railway Mongo
}

export const checkRes = (rawRes: Response): Promise<Response> => {
  let res;
  if (rawRes.ok) {
    res = rawRes.json();
  } else {
    res = Promise.reject(new Error(`${rawRes.status}`));
  }
  return res;
};

export const getJwtToken = (): string => {
  let res = 'Bearer';
  if (localStorage.getItem('currentUser')) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    const token = currentUser.token;
    res = `Bearer ${token}`;
  }
  return res;
};
