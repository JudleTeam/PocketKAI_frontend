import { RootLayout } from '@/widgets';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';

const routes = createRoutesFromElements([
  <Route>
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Navigate to="/schedule" />} />
      <Route path="schedule" element={<div>Schedule</div>} />
      <Route path="assignments" element={<div>Assignments</div>} />
      <Route path="teachers" element={<div>Teachers</div>} />
      <Route path="account" element={<div>Account</div>} />
    </Route>
  </Route>,
]);
const router = createBrowserRouter(routes);
export default router;
