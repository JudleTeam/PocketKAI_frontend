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
import { formStoreBackgroundTasks } from '../lib/formStoreBackgroundTasks';
import { StoreBackgroundTasks } from './types';
import { AxiosError } from 'axios';

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
  backgroundTask: StoreBackgroundTasks | null;
  isReady: boolean;
};
type TeachersActions = {
  getGroupTeachers: (disciplines: GroupDisciplines[]) => void;
  suggestTeacherByName: (name: string) => Promise<void>;
  getTeacherScheduleById: (id: string) => Promise<void>;
  setTeacherScheduleStatus: (status: FetchStatus) => void;
  getBackgroundTaskStatus: (taskId: string) => Promise<void>;
  clearTeacherScheduleStatus: () => void;
  clearTeachersState: () => void;
};

const initialState: TeachersState = {
  groupTeachers: [],
  searchedTeachers: [],
  searchedTeachersStatus: 'idle',
  teacherSchedule: { odd: [], even: [] },
  teacherScheduleStatus: 'idle',
  error: null,
  backgroundTask: null,
  isReady: false
};

export const useTeachers = create<TeachersState & TeachersActions>()((set, get) => ({
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
  clearTeacherScheduleStatus: () =>
    set({ teacherScheduleStatus: 'idle' }),
  getTeacherScheduleById: async (id) => {
    set({ teacherScheduleStatus: 'loading', error: null });
    try {
      const response = await teacherService.getTeacherScheduleById(id, 'any');
      const schedule = formTeachersSchedule(response.data.lessons);
      const task = formStoreBackgroundTasks(
        response.data.background_task_id
      );

      set({
        teacherSchedule: { ...schedule },
        teacherScheduleStatus: 'success',
        backgroundTask: task,
        isReady: response.data.is_ready
      });

    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 400) {
        set({ error, teacherScheduleStatus: 'cantGetSchedule' });
      }
      else {
        set({ error, teacherScheduleStatus: 'error' });
      }
    }
  },
  getBackgroundTaskStatus: async (taskId) => {
    if (!taskId) return;
    const response = await teacherService.getBackgroundTaskStatus(taskId);
    const task = get().backgroundTask;

    if (task) {
      set({
        backgroundTask: { ...task, status: response.data.status },
      });
    }
  },
  setTeacherScheduleStatus: (status) => set({ teacherScheduleStatus: status }),
  clearTeachersState: () => set(initialState),
}));
