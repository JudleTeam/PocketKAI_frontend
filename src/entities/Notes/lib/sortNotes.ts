import { Notes } from '@/shared';
import { DateTime } from 'luxon';

export const sortNotes = (notes: Notes) => {
  return [...notes].sort((a, b) => {
    const dateA = a.date ? DateTime.fromFormat(a.date, 'dd MMMM') : null;
    const dateB = b.date ? DateTime.fromFormat(b.date, 'dd MMMM') : null;

    if (dateA && dateB) {
      return dateB.toMillis() - dateA.toMillis();
    }
    if (dateA && !dateB) {
      return -1;
    }
    if (!dateA && dateB) {
      return 1;
    }
    return 0;
  });
};
