import { Group, GroupShort, Lesson } from '@/shared';

export type NoteParams = {
  title: string;
  description?: string;
  onDiscipline: boolean;
  lesson?: Lesson;
  dayDate?: string;
  isTimeline: boolean;
  group?: Group | GroupShort | null;
};
