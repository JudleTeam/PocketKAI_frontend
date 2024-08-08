import { Nullable } from './common';
import { Department } from './department';
import { Discipline } from './discipline';
import { Teacher } from './teacher';

export type Group = {
  id: string;
  kai_id: number;
  group_leader_id: Nullable<string>;
  pinned_text: Nullable<string>;
  group_name: string;
  is_verified: boolean;
  verified_at: Nullable<string>;
  created_at: string;
  parsed_at: Nullable<string>;
  schedule_parsed_at: Nullable<string>;
  syllabus_url: Nullable<string>;
  educational_program_url: Nullable<string>;
  study_schedule_url: Nullable<string>;
  speciality: Nullable<Speciality>;
  profile: Nullable<Profile>;
  department: Nullable<Department>;
  institute: Nullable<Institute>;
};

type Speciality = {
  name: string;
  kai_id: number;
  code: string;
  id: string;
  created_at: string;
};

type Profile = {
  kai_id: number;
  name: string;
  id: string;
  created_at: string;
};

type Institute = {
  kai_id: number;
  name: string;
  id: string;
  created_at: string;
};

export type GroupShort = {
  id: string;
  kai_id: number;
  group_name: string;
  is_verified: boolean;
  parsed_at: string | null;
  schedule_parsed_at: string | null;
};

export type GroupDisciplines = {
  id: string;
  kai_id: number;
  name: string;
  types: DisciplineType[];
};

export type DisciplineType = {
  parsed_type: string;
  original_type: string;
  teacher: Nullable<Teacher>;
};

export type ExamType = {
  original_date: string;
  time: string;
  audience_number: Nullable<string>;
  building_number: Nullable<string>;
  parsed_date: Nullable<string>;
  academic_year: string;
  academic_year_half: number;
  semester: Nullable<number>;
  discipline_id: string;
  teacher_id: Nullable<string>;
  group_id: string;
  id: string;
  created_at: string;
  teacher: Teacher;
  discipline: Discipline;
};
