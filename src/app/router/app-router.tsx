import { RootLayout, AppLayout } from '@/widgets';
import { Schedule, WeekSchedule, Exams } from '@/pages';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { useSettings } from '@/entities';

export function RouterComponent() {
  const { preferencedScheduleView } = useSettings();
  const defaultPath =
    preferencedScheduleView === 'timeline' ? 'schedule' : 'schedule/full';
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          element: <AppLayout />,
          children: [
            {
              index: true,
              element: <Navigate to={defaultPath} />,
            },
            {
              path: 'schedule',
              lazy: async () => {
                return { Component: Schedule };
              },
            },
            {
              path: 'schedule/full',
              lazy: async () => {
                return { Component: WeekSchedule };
              },
            },
            {
              path: 'schedule/exams',
              lazy: async () => {
                return { Component: Exams };
              },
            },
            {
              path: 'hidden',
              lazy: async () => {
                const { HiddenLessons } = await import(
                  '@/pages/HiddenLessons/HiddenLessons'
                );
                return { Component: HiddenLessons };
              },
            },
            {
              path: 'teachers',
              lazy: async () => {
                const { Teachers } = await import('@/pages/Teachers/Teachers');
                return { Component: Teachers };
              },
            },
          ],
        },
        {
          path: 'settings',
          lazy: async () => {
            const { Settings } = await import('@/pages/Settings/Settings');
            return { Component: Settings };
          },
        },

        {
          path: 'faq',
          lazy: async () => {
            const { FrequentQuestions } = await import('@/pages');
            return { Component: FrequentQuestions };
          },
        },
        {
          path: 'about',
          lazy: async () => {
            const { AboutUs } = await import('@/pages');
            return { Component: AboutUs };
          },
        },
        {
          path: 'report',
          lazy: async () => {
            const { Report } = await import('@/pages');
            return { Component: Report };
          },
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
