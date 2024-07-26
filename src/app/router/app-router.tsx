import {
  Assignments,
  WeekSchedule,
  Schedule,
  Teachers,
  Account,
  Settings,
  Profile,
  Group,
  Speciality,
} from '@/pages';

import { RootLayout, AppLayout } from '@/widgets';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

const routes = createRoutesFromElements([
  <Route>
    <Route path="/" element={<RootLayout />}>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="schedule" />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="schedule/full" element={<WeekSchedule />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="teachers" element={<Teachers />} />
      </Route>
      <Route>
        <Route path="account" element={<Account />} />
        <Route path="account/settings" element={<Settings />} />
        <Route path="account/profile" element={<Profile />} />
        <Route path="account/group" element={<Group />} />
        <Route path="account/speciality" element={<Speciality />} />
      </Route>
    </Route>
  </Route>,
]);
const router = createBrowserRouter(routes);
export default router;
