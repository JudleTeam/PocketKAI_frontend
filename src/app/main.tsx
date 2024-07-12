import ReactDOM from 'react-dom/client';
import { AppProvider } from './providers/providers.tsx';
import { RouterProvider } from 'react-router-dom';
import router from './router/app-router.tsx';
import './styles/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);
