import { Nullable } from '@/shared';
import { ReactNode } from 'react';

export const getLessonBuilding = (
  build: Nullable<string>,
  audience: Nullable<string>
): Nullable<ReactNode> => {
  if (!build && !audience) {
    return null;
  }
  if (!build) {
    return `Аудитория: ${audience}`;
  }
  if (!audience) {
    return `Здание: ${build}`;
  }
  if (build.toLocaleLowerCase() === audience.toLocaleLowerCase()) {
    return `Здание: ${build}`;
  }
  return `Здание: ${build} Ауд: ${audience}`;
};
