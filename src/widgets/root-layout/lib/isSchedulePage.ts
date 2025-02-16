export const isSchedulePage = (path: string) => {
  const schedulePages = [
    '/schedule/full',
    '/schedule/exams',
    '/schedule',
    '/hidden',
  ];
  const finder = schedulePages.find((string) => string === path);
  return finder ? true : false;
};
