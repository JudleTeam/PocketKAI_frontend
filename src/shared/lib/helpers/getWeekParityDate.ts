import { DateTime } from "luxon";

export const getWeekParityDate = (date: string) => {
    const weekNumber = DateTime.fromISO(date).weekNumber;
    const currentParity = weekNumber % 2 === 0 ? 'even' : 'odd';
    return currentParity;
};