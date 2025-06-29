export type Note = {
  id: string;
  disciplineId: string;
  disciplineName: string;
  lessonId?: string;
  title: string;
  description?: string;
  date?: string;
  groupName: string;
};

export type Notes = Note[];

export type NoteFormData = {
  title: string;
  description?: string;
  onDiscipline: boolean;
  onThisLesson?: boolean;
};
