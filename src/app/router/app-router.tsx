import { Assignments, WeekSchedule, Schedule, Teachers } from '@/pages';
import { RootLayout, AppLayout } from '@/widgets';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

const routes = createRoutesFromElements([
  <Route>
    <Route path="/" element={<RootLayout />}>
      <Route element={<AppLayout />}>
        <Route path="schedule" element={<Schedule />} />
        <Route path="schedule/full" element={<WeekSchedule />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="teachers" element={<Teachers />} />
      </Route>
      <Route
        path="account"
        element={<div style={{ height: '100%' }}>Account</div>}
      />
    </Route>
  </Route>,
]);
const router = createBrowserRouter(routes);
export default router;
