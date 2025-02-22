import { Note } from '@/shared';
import { NoteParams } from '../model/types';
import { nanoid } from 'nanoid';

export const createNote = (data: NoteParams): Note => ({
  id: nanoid(),
  disciplineId: data.lesson ? data.lesson.discipline.id : '',
  lessonId:
    data.isTimeline && !data.onDiscipline && data.lesson
      ? data.lesson.id
      : undefined,
  date:
    data.isTimeline && data.dayDate && !data.onDiscipline
      ? data.dayDate
      : undefined,
  title: data.title,
  description: data.description ? data.description : undefined,
  group: data.group ? data.group : null,
});
