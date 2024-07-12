import { Lesson } from '@/shared';
import styles from './LessonCard.module.scss';

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const hasPassed =
    lesson.end_time && lesson.end_time > new Date().toISOString();
  return <div>LessonCard</div>;
}
