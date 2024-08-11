export type GroupSearchParams = {
  group_name: string;
  limit?: number;
};

export type ExamParams = {
  academic_year: string;
  academic_year_half: number;
}

export type FavoriteParams = {
  group_id: string;
}