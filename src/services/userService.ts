import axios from 'axios';
import { User } from 'store/slices/userSlice';

export const getUser = async (userId: string) => {
  const result = await axios.get<User>('localhost:4000' + userId);
  // Заглушка пока юзер не авторизован
  // const result = (await new Promise((res) => {
  //   setTimeout(() => res({ data: { id: '1', name: 'Bob' } }), 1000);
  // })) as { data: User };
  return result.data;
};
