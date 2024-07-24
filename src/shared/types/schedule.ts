import { Lesson } from './lesson';

export type WeekSchedule = {
  parsed_at: string;
  week_parity: 'odd' | 'even' | 'any';
  week_days: {
    monday: Lesson[];
    tuesday: Lesson[];
    wednesday: Lesson[];
    thursday: Lesson[];
    friday: Lesson[];
    saturday: Lesson[];
    sunday: Lesson[];
  };
};

export type FullWeekSchedule = {
  odd: WeekSchedule;
  even: WeekSchedule;
};

type Day = {
  date: string;
  parity: 'odd' | 'even' | 'any';
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
