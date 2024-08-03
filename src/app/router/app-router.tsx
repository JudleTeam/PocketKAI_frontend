import { RootLayout, AppLayout } from '@/widgets';
import { Schedule, WeekSchedule } from '@/pages';
import { createBrowserRouter, Navigate } from 'react-router-dom';

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
            element: <Navigate to="schedule" />,
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
            path: 'assignments',
            lazy: async () => {
              const { Assignments } = await import(
                '@/pages/Assignments/Assignments'
              );
              return { Component: Assignments };
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
        path: 'account',
        children: [
          {
            index: true,
            lazy: async () => {
              const { Account } = await import('@/pages/Account/Account');
              return { Component: Account };
            },
          },
          {
            path: 'settings',
            lazy: async () => {
              const { Settings } = await import('@/pages/Settings/Settings');
              return { Component: Settings };
            },
          },
          {
            path: 'profile',
            lazy: async () => {
              const { Profile } = await import('@/pages/Profile/Profile');
              return { Component: Profile };
            },
          },
          {
            path: 'group',
            lazy: async () => {
              const { Group } = await import('@/pages/Group/Group');
              return { Component: Group };
            },
          },
          {
            path: 'speciality',
            lazy: async () => {
              const { Speciality } = await import(
                '@/pages/Speciality/Speciality'
              );
              return { Component: Speciality };
            },
          },
          {
            path: 'faq',
            lazy: async () => {
              const {FrequentQuestions} = await import('@/pages');
              return {Component: FrequentQuestions}
            }
          },
          {
            path: 'about',
            lazy: async () => {
              const {AboutUs} = await import('@/pages');
              return {Component: AboutUs}
            }
          },
          {
            path: 'report',
            lazy: async () => {
              const {Report} = await import('@/pages');
              return {Component: Report}
            }
          },
        ],
      },
    ],
  },
]);

export default router;