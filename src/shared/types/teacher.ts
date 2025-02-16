import { Nullable } from './common';

export type Teacher = {
  id: string;
  created_at: string;
  login: string;
  name: string;
};

export type TeachersType = {
  teacher: Nullable<Teacher>;
  parsed_types: string[];
  original_types: string[];
  disciplineName: string;
  disciplineId: string[];
};
