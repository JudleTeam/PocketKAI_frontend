import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  NavbarAction,
  useDisclosure,
  useMetaThemeColor,
} from '@/shared';
import { useColor } from '@/shared';
import { isCurrentLocation } from '../../lib/isCurrentLocation';
import s from './ActionContent.module.scss';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import BurgerActions from './BurgerActions';
import { useLocation } from 'react-router-dom';
import { isOtherPage } from '../../lib/isOtherPage';
import { isSchedulePage } from '../../lib/isSchedulePage';
import { useColorMode } from '@chakra-ui/react';

type ActionContentProps = {
  action: NavbarAction;
};

export const ActionContent: React.FC<ActionContentProps> = ({ action }) => {
  const {
    blueVeryLightColor,
    blueLightElementColor,
    themeColor,
    mainColor,
    navIconColor,
  } = useColor();
  const { pathname } = useLocation();

  const isOther = isOtherPage(pathname) && !action.path;
  const isCurrent =
    (isCurrentLocation(action) && action.path) ||
    (isSchedulePage(pathname) && action.path !== '/teachers' && action.path);

  const Icon = action.icon;
  const { isOpen, setIsOpen } = useDisclosure();
  const theme = useColorMode();

  useEffect(() => {
    if (pathname) {
      setIsOpen(false);
    }
  }, [isOpen, pathname, setIsOpen, theme]);

  useMetaThemeColor(mainColor, isOpen, themeColor);
  const isDrawerAllowed = action.action;
  const isDrawerOpen = isOpen && isDrawerAllowed;

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <motion.div
          className={`${s.stack} ${isCurrent ? s.active : ''}`}
          initial={{ backgroundColor: 'transparent', width: 40 }}
          animate={{
            backgroundColor: isCurrent ? blueVeryLightColor : 'transparent',
            width: isCurrent ? 200 : 40,
          }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
          onClick={() => isDrawerAllowed && setIsOpen(true)}
        >
          <Icon
            fill={isCurrent || isOther ? navIconColor : blueLightElementColor}
            color={isCurrent || isOther ? navIconColor : blueLightElementColor}
            className={`${s.icon} ${isCurrent ? s['icon--active'] : ''}`}
          />
          <motion.div
            className={s.label}
            initial={{ opacity: 0, x: -10 }}
            animate={isCurrent ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
            style={{
              color: navIconColor,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              minWidth: isCurrent ? 'auto' : 0,
            }}
          >
            {action.label}
          </motion.div>
        </motion.div>
      </DrawerTrigger>
      <DrawerContent>
        <BurgerActions />
      </DrawerContent>
    </Drawer>
  );
};
