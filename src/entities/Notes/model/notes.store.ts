import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Lesson, Note, Notes } from '@/shared';
import { NoteParams } from './types';
import { createNote } from '../lib/createNote';
import { sortNotes } from '../lib/sortNotes';

type StoreState = {
  notes: Notes;
  error: string | null;
};

type StoreActions = {
  addNote: (data: NoteParams) => string | null;
  editNote: (id: string, note: NoteParams) => void;
  findNoteInGroup: (groupName: string) => boolean;
  deleteNote: (id: string) => void;
  getNotesForLesson: (lesson: Lesson) => Note[];
  deleteNotesForGroup: (groupName: string) => void;
  deleteAllNotes: () => void;
  clearErrors: () => void;
};

const initialState: StoreState = {
  notes: [],
  error: null,
};

export const useNotes = create<StoreState & StoreActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      addNote: (data) => {
        const oldNotes = get().notes;
        const disciplineId = data.lesson ? data.lesson.discipline.id : '';

        const disciplineNotesCount = oldNotes.filter(
          (note) => note.disciplineId === disciplineId
        ).length;

        if (disciplineNotesCount >= 50) {
          set({ error: 'Превышен лимит заметок для данной дисциплины' });
          return null;
        }

        const note = createNote(data);

        set({
          notes: sortNotes([note, ...oldNotes]),
          error: initialState.error,
        });
        return '200';
      },

      editNote: (id, note) => {
        const notes = get().notes;
        const changedNotes = notes.map((item) =>
          item.id === id
            ? {
                ...item,
                title: note.title,
                description: note.description,
                lessonId: note.onDiscipline
                  ? undefined
                  : note.lesson
                    ? note.lesson.id
                    : undefined,
                date: note.onDiscipline ? undefined : note.dayDate,
              }
            : item
        );
        set({ notes: sortNotes(changedNotes) });
      },

      findNoteInGroup: (groupName) => {
        const notes = get().notes;
        return notes.some((item) => item.groupName === groupName);
      },

      deleteNote: (id) => {
        const notes = get().notes;
        const filteredNotes = notes.filter((item) => item.id !== id);
        set({ notes: filteredNotes });
      },

      deleteNotesForGroup: (groupName) => {
        const notes = get().notes;
        const filteredNotes = notes.filter(
          (item) => item.groupName !== groupName
        );

        set({ notes: filteredNotes });
      },

      deleteAllNotes: () => {
        set({ notes: initialState.notes });
      },

      clearErrors: () => {
        set({ error: initialState.error });
      },

      getNotesForLesson: (lesson) => {
        const notes = get().notes;
        const filteredNotes = notes.filter(
          (item) =>
            item.lessonId === lesson.id ||
            (!item.lessonId && item.disciplineId === lesson.discipline.id)
        );
        return filteredNotes;
      },
    }),
    {
      name: 'notes',
      partialize: (state) => ({
        notes: state.notes,
      }),
    }
  )
);
