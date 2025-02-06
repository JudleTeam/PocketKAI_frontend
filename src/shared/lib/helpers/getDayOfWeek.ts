export function getDayOfWeek(date: string) {
  const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const dayIndex = new Date(date).getDay();
  return daysOfWeek[dayIndex];
}
