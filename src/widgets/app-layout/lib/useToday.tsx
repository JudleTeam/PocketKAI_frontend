import { useOutletContext } from 'react-router-dom';
import { ContextType } from '../ui/AppLayout';

export function useToday() {
  return useOutletContext<ContextType>();
}
