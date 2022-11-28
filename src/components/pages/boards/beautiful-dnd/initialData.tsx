import { BoardDataResponse } from 'services/boardServiceTypes';
export const initialData: BoardDataResponse = {
  id: 'kjhkasdasfg6484jh',
  title: 'First board',
  description: 'olijhkjihs',
  columns: [
    {
      id: 'column-1',
      title: 'To do',
      order: 0,
      tasks: [
        { id: 'task-1', description: 'Hello', order: 0 },
        { id: 'task-2', description: 'What yuor do', order: 1 },
        { id: 'task-3', description: 'Change my phone', order: 2 },
      ],
    },
    {
      id: 'column-2',
      title: 'In progress',
      order: 1,
      tasks: [
        { id: 'task-4', description: 'Home', order: 4 },
        { id: 'task-5', description: 'learn more', order: 53 },
        { id: 'task-6', description: 'yuor do', order: 6 },
      ],
    },
    {
      id: 'column-3',
      title: 'Done',
      order: 3,
      tasks: [
        { id: 'task-7', description: 'is defined', order: 74 },
        { id: 'task-8', description: 'Change', order: 81 },
        { id: 'task-9', description: 'What', order: 9 },
      ],
    },
  ],
};
