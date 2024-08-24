import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useDrawerCloseEvent = (onClose: () => void, isOpen: boolean) => {
  const navigate = useNavigate();
  useEffect(() => {
    const onBackButtonEvent = (event: PopStateEvent) => {
      event.preventDefault();
      onClose();
      navigate(1);
    };
    if (isOpen) {
      navigate('');
      window.addEventListener('popstate', onBackButtonEvent);
    }

    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, [isOpen, onClose, navigate]);
};
