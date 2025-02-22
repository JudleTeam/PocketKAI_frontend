import { Group, GroupShort } from './group';

export type Note = {
  id: string;
  disciplineId: string;
  lessonId?: string;
  title: string;
  description?: string;
  date?: string;
  group: Group | GroupShort | null;
};

export type Notes = Note[];

export type NoteFormData = {
  title: string;
  description?: string;
  onDiscipline: boolean;
  onThisLesson?: boolean;
};
