import { Nullable } from "./common";

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
  speciality: Nullable<SpecialityRead>;
  profile: Nullable<ProfileRead>;
  department: Nullable<DepartmentRead>;
  institute: Nullable<InstituteRead>;
};

type SpecialityRead = {
  name: string;
  kai_id: number;
  code: string;
  id: string;
  created_at: string;
};

type ProfileRead = {
  kai_id: number;
  name: string;
  id: string;
  created_at: string;
};

type DepartmentRead = {
  kai_id: number;
  name: string;
  id: string;
  created_at: string;
};

type InstituteRead = {
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
  types: DisciplineTypes[];
}

export type DisciplineTypes = {
  parsed_type: string;
  original_type: string;
  teacher: TeacherRead | null;
}

type TeacherRead = {
  login: string;
  name: string;
  id: string;
  created_at: string;
}