import { HiddenLesson } from '@/shared';

export const possiblyHide = (lesson: HiddenLesson) => {
  const hideOdd =
    lesson.type_hide !== 'odd' &&
    ((lesson.parsed_dates_status === 'need_check' &&
      !lesson.parsed_dates &&
      lesson.parsed_parity === 'any') ||
      (lesson.parsed_dates_status !== 'need_check' &&
        !lesson.parsed_dates &&
        lesson.parsed_parity === 'any') ||
      lesson.parsed_parity === 'odd');
  const hideEven =
    lesson.type_hide !== 'even' &&
    ((lesson.parsed_dates_status === 'need_check' &&
      !lesson.parsed_dates &&
      lesson.parsed_parity === 'any') ||
      (lesson.parsed_dates_status !== 'need_check' &&
        !lesson.parsed_dates &&
        lesson.parsed_parity === 'any') ||
      lesson.parsed_parity === 'even');
  const hideAlways =
    lesson.type_hide !== 'always' &&
    lesson.parsed_parity !== 'even' &&
    lesson.parsed_parity !== 'odd';

  const hide = (conditions: boolean[]) => {
    return conditions
      .map((item, index) => {
        if (item) {
          if (index === 0) return 'odd';
          if (index === 1) return 'even';
          if (index === 2) return 'always';
        }
        return '';
      })
      .filter((item) => item !== '');
  };

  return hide([hideOdd, hideEven, hideAlways]);
};
