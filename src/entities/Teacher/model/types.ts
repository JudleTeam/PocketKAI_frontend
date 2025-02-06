import { Teacher, Nullable } from '@/shared';

export type TeacherDisciplineType = {
  parsed_types: string[];
  original_types: string[];
  teacher: Nullable<Teacher>;
};
