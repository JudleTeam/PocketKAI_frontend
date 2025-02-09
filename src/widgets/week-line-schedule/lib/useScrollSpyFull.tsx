import { useEffect, useRef } from 'react';

export function useScrollSpyFull(
  longDaysOfWeek: string[],
  currentDay: string,
  weekParity: 'even' | 'odd',
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>
) {
  const observers = useRef<IntersectionObserver[] | undefined>([]);
  const lastVisibleDay = useRef<string | null>(null);
  const isUpdating = useRef(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px 20% 0px',
      threshold: 0.1,
    };

    observers.current = longDaysOfWeek.map((day) => {
      const observer = new IntersectionObserver((entries) => {
        const firstVisible = entries.find((entry) => entry.isIntersecting);

        if (firstVisible && !isUpdating.current) {
          const newDay = day + weekParity;

          // Проверяем, не был ли этот день уже видим
          if (lastVisibleDay.current === newDay) return;

          // Если новый день, обновляем состояние
          isUpdating.current = true;
          if (currentDay !== newDay) {
            setCurrentDay(newDay);
            lastVisibleDay.current = newDay; // Обновляем последний видимый день
          }

          // Разрешаем переключение обратно
          setTimeout(() => {
            isUpdating.current = false;
          }, 100); // Небольшая задержка для предотвращения быстрого переключения
        }
      }, options);

      const target = document.getElementById(day + weekParity);
      if (target) observer.observe(target);
      return observer;
    });

    return () => {
      observers.current?.forEach((observer) => observer.disconnect());
    };
  }, [longDaysOfWeek, setCurrentDay, weekParity, currentDay]);

  return currentDay;
}
