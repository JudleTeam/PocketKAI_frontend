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

type TeachersState = {
  groupTeachers: Teacher[];
  searchedTeachers: Teacher[];
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
  clearTeachersState: () => void;
};

const initialState: TeachersState = {
  groupTeachers: [],
  searchedTeachers: [],
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
    const response = await teacherService.suggestTeacherByName(name);
    set({
      searchedTeachers: response.data,
    });
  },
  getTeacherScheduleById: async (id) => {
    set({ teacherScheduleStatus: 'loading', error: null });
    try {
      const [oddWeek, evenWeek] = await Promise.all([
        teacherService.getTeacherScheduleById(id, 'odd'),
        teacherService.getTeacherScheduleById(id, 'even'),
      ]);
      set({
        teacherSchedule: { odd: oddWeek.data, even: evenWeek.data },
        teacherScheduleStatus: 'success',
      });
    } catch (error) {
      set({ error, teacherScheduleStatus: 'error' });
    }
  },
  setTeacherScheduleStatus: (status) => set({ teacherScheduleStatus: status }),
  clearTeachersState: () => set(initialState),
}));
