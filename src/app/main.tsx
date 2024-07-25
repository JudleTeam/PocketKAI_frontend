import ReactDOM from 'react-dom/client';
import { AppProvider } from './providers/providers.tsx';
import { RouterProvider } from 'react-router-dom';
import router from './router/app-router.tsx';
import './styles/main.css';
import { ColorModeScript } from '@chakra-ui/react';
import theme from './styles/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <RouterProvider router={router} />
  </AppProvider>
);
