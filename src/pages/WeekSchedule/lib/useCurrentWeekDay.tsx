import { useOutletContext } from 'react-router-dom';

type ContextType = [
  string,
  React.Dispatch<React.SetStateAction<string>>,
];

export function useCurrentWeekDay() {
  return useOutletContext<ContextType>();
}
