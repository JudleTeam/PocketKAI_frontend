import { useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '@/entities';
import { getNavbarActions, NavbarAction } from '@/shared/constants';
import { useEffect, useState } from 'react';
import { ActionContent } from './ActionContent/ActionContent';

export function NavbarActions() {
  const { preferencedScheduleView } = useSettings();
  const navigate = useNavigate();
  const [navbarActions, setNavbarActions] = useState<NavbarAction[]>([]);

  useEffect(() => {
    setNavbarActions(getNavbarActions(preferencedScheduleView));
  }, [preferencedScheduleView]);

  const handleNavigation = useCallback(
    (action: NavbarAction) => {
      if (action.path) navigate(action.path);
    },
    [navigate]
  );

  return (
    <>
      {navbarActions.map((action) => {
        return (
          <Box key={action.label} onClick={() => handleNavigation(action)}>
            <ActionContent action={action} />
          </Box>
        );
      })}
    </>
  );
}
