import { DateTime } from 'luxon';
type RestState = {
  state: 'upcoming' | 'past' | 'current' | 'unknown';
  color: '#3182ce80' | '#3182CE';
};

export function getRestState(restDay: string): RestState {
  const currentTime = DateTime.now().setZone('Europe/Moscow');
  const hasDayPassed =
    DateTime.fromISO(restDay).startOf('day') < currentTime.startOf('day');
  const isNextDay =
    DateTime.fromISO(restDay).startOf('day') > currentTime.startOf('day');
  const today = restDay === currentTime.toFormat('yyyy-LL-dd');
  if (today) return { state: 'current', color: '#3182CE' };
  if (hasDayPassed) return { state: 'past', color: '#3182ce80' };
  if (isNextDay) return { state: 'upcoming', color: '#3182CE' };
  return { state: 'unknown', color: '#3182CE' };
}
