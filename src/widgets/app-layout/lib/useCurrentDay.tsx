import { useOutletContext } from 'react-router-dom';
import { ContextType } from '../ui/AppLayout';

export function useCurrentDay() {
  return useOutletContext<ContextType>();
}
