import {
  FetchStatus,
  GroupDisciplines,
  Teacher,
  TeacherLesson,
} from '@/shared';
import { Nullable } from '@/shared';
import { removeDuplicates } from '@/shared/lib';
import { create } from 'zustand';
import { teacherService } from './teacher.service';
import { formTeachersSchedule } from '../lib/formTeachersSchedule';

type TeachersState = {
  groupTeachers: Teacher[];
  searchedTeachers: Teacher[];
  searchedTeachersStatus: FetchStatus;
  teacherSchedule: {
    odd: TeacherLesson[];
    even: TeacherLesson[];
  };
  teacherScheduleStatus: FetchStatus;
  error: Nullable<unknown>;
};
type TeachersActions = {
  getGroupTeachers: (disciplines: GroupDisciplines[]) => void;
  suggestTeacherByName: (name: string) => Promise<void>;
  getTeacherScheduleById: (id: string) => Promise<void>;
  setTeacherScheduleStatus: (status: FetchStatus) => void;
  clearTeacherSchedule: () => void;
  clearTeachersState: () => void;
};

const initialState: TeachersState = {
  groupTeachers: [],
  searchedTeachers: [],
  searchedTeachersStatus: 'idle',
  teacherSchedule: { odd: [], even: [] },
  teacherScheduleStatus: 'idle',
  error: null,
};

export const useTeachers = create<TeachersState & TeachersActions>()((set) => ({
  ...initialState,
  getGroupTeachers: (disciplines) => {
    const teachers = disciplines
      .map((discipline) => discipline.types.map((type) => type.teacher))
      .flat()
      .filter((teacher) => teacher !== null);
    set({
      groupTeachers: removeDuplicates(teachers, 'name'),
    });
  },
  suggestTeacherByName: async (name) => {
    set({ searchedTeachersStatus: 'loading', error: null });
    try {
      const response = await teacherService.suggestTeacherByName(name);
      set({
        searchedTeachers: response.data,
        searchedTeachersStatus: 'success',
      });
    } catch (error) {
      set({ error, searchedTeachersStatus: 'error' });
    }
  },
  clearTeacherSchedule: () =>
    set({ teacherSchedule: initialState.teacherSchedule }),
  getTeacherScheduleById: async (id) => {
    set({ teacherScheduleStatus: 'loading', error: null });
    try {
      const response = await teacherService.getTeacherScheduleById(id, 'any');
      const schedule = formTeachersSchedule(response.data);
      set({
        teacherSchedule: { ...schedule },
        teacherScheduleStatus: 'success',
      });
    } catch (error) {
      set({ error, teacherScheduleStatus: 'error' });
    }
  },
  setTeacherScheduleStatus: (status) => set({ teacherScheduleStatus: status }),
  clearTeachersState: () => set(initialState),
}));
