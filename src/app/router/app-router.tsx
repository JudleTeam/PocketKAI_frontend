import { Assignments, Schedule, Teachers } from '@/pages';
import { RootLayout, AppLayout } from '@/widgets';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';

const routes = createRoutesFromElements([
  <Route>
    <Route path="/" element={<RootLayout />}>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/schedule" />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="teachers" element={<Teachers />} />
      </Route>
      <Route path="account" element={<div>Account</div>} />
    </Route>
  </Route>,
]);
const router = createBrowserRouter(routes);
export default router;
