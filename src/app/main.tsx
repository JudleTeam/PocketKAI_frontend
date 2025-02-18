import ReactDOM from 'react-dom/client';
import { AppProvider } from './providers/providers.tsx';
import { RouterComponent } from './router/app-router.tsx';
import './styles/main.css';
import { ColorModeScript } from '@chakra-ui/react';
import theme from './styles/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <RouterComponent />
  </AppProvider>
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data.type === 'UPDATE_TIME') {
      localStorage.setItem('cacheUpdateDate', event.data.time);
    }
  });
}
window.YA_METRIKA_COUNTER = import.meta.env.VITE_YA_METRIKA_COUNTER;

