import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Notes } from '@/shared';
import { NoteParams } from './types';
import { createNote } from '../lib/createNote';
import { sortNotes } from '../lib/sortNotes';

type StoreState = {
  notes: Notes;
};

type StoreActions = {
  addNote: (data: NoteParams) => void;
  editNote: (id: string, note: NoteParams) => void;
  deleteNote: (id: string) => void;
};

const initialState: StoreState = {
  notes: [],
};

export const useNotes = create<StoreState & StoreActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      addNote: (data) => {
        const note = createNote(data);
        const oldNotes = get().notes;
        set({ notes: sortNotes([note, ...oldNotes]) });
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
      deleteNote: (id) => {
        const notes = get().notes;
        const filteredNotes = notes.filter((item) => item.id !== id);
        set({ notes: filteredNotes });
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
