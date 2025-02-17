import { Teacher, Nullable } from '@/shared';
import { BackgroundTaskStatus } from '@/shared';

export type TeacherDisciplineType = {
  parsed_types: string[];
  original_types: string[];
  teacher: Nullable<Teacher>;
};

export type StoreBackgroundTasks = {
  id: string;
  status: BackgroundTaskStatus;
};
