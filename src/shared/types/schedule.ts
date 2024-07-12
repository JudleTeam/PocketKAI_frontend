import { Lesson } from './lesson';

type Weekday = Lesson[];

export type Schedule = {
  parsed_at: string;
  week_parity: 'odd' | 'even' | 'any';
  week_days: {
    monday: Weekday;
    tuesday: Weekday;
    wednesday: Weekday;
    thursday: Weekday;
    friday: Weekday;
    saturday: Weekday;
    sunday: Weekday;
  };
};
