import { Assignments, FullSchedule, Schedule, Teachers, Account } from '@/pages';
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
        <Route path='schedule/full' element={<FullSchedule/>} />
      </Route>
      <Route
        path="account"
        element={<Account/>}
      />
    </Route>
  </Route>,
]);
const router = createBrowserRouter(routes);
export default router;
