import { Department } from './department';

export type Teacher = {
  id: string;
  created_at: string;
  login: string;
  name: string;
  department: Department;
};
