import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useDrawerPopstateClose = (
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!setIsOpen) return;
    const onBackButtonEvent = (event: PopStateEvent) => {
      event.preventDefault();
      setIsOpen(false);
      navigate(1);
    };
    if (isOpen) {
      navigate('#');
      window.addEventListener('popstate', onBackButtonEvent);
    }

    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, [isOpen, navigate, setIsOpen]);
};
