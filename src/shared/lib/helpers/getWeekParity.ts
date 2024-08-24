import { DateTime } from "luxon";

export const getWeekParity = () => {
    const weekNumber = DateTime.now().weekNumber;
    const currentParity = weekNumber % 2 === 0 ? 'even' : 'odd';
    return currentParity
}