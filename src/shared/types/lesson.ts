import { Nullable } from './common';
import { Department } from './department';
import { Discipline } from './discipline';
import { GroupShort } from './group';
import { Teacher } from './teacher';

export type Lesson = {
  id: string;
  created_at: string;
  group_id: string;
  number_of_day: number;
  original_dates: string;
  parsed_parity: 'odd' | 'even' | 'any';
  parsed_dates: string[];
  parsed_dates_status: 'good' | 'need_check';
  audience_number: Nullable<string>;
  building_number: Nullable<string>;
  original_lesson_type: Nullable<string>;
  parsed_lesson_type: Nullable<string>;
  start_time: Nullable<string>;
  end_time: Nullable<string>;
  teacher: Nullable<Teacher>;
  department: Nullable<Department>;
  discipline: Discipline;
};

export type TeacherLesson = Omit<Lesson, 'teacher'> & {
  teacher_id: string;
  groups: GroupShort[];
};

export type HiddenLesson = {
  id: string;
  discipline: Discipline;
  number_of_day: number;
  type_hide: string;
  parsed_dates: string[];
  original_dates: string;
  parsed_lesson_type: Nullable<string>;
  original_lesson_type: Nullable<string>;
  start_time: Nullable<string>;
  end_time: Nullable<string>;
}