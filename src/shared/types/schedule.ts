import { Lesson } from './lesson';

export type WeekSchedule = {
  parsed_at: string;
  week_parity: 'odd' | 'even' | 'any';
  week_days: {
    [key: string]: Lesson[];
  };
  background_task_id: string;
  is_ready: boolean;
};

export type FullWeekSchedule = {
  odd: WeekSchedule;
  even: WeekSchedule;
};

export type Day = {
  date: string;
  lessons: Lesson[];
};

export type Schedule = {
  parsed_at: string;
  days: Day[];
};

export type WeekParity = {
  date: string;
  parity: 'odd' | 'even';
  int_parity: number;
};

export type ScheduleView = 'timeline' | 'full';

export type FullScheduleView = 'week' | 'day';
