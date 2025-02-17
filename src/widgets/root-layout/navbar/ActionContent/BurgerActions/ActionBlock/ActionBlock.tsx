import { useColor } from '@/shared';
import {
  Box,
  ComponentWithAs,
  Icon,
  IconProps,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import s from './ActionBlock.module.scss';
import { NavLink } from 'react-router-dom';

type ActionItem = {
  label: string;
  path?: string;
  icon: ComponentWithAs<'svg', IconProps>;
};

type ActionBlockProps = {
  item: ActionItem;
};

const ActionBlock: React.FC<ActionBlockProps> = ({ item }) => {
  const { secondaryColor, accentColor } = useColor();
  const { toggleColorMode, colorMode } = useColorMode();
  const { pathname } = useLocation();
  const isCurrent = pathname.slice(1) === item.path;
  const defaultColor = colorMode === 'light' ? 'Светлая тема' : 'Темная тема';

  if (!item.path) {
    if (defaultColor !== item.label) {
      return (
        <Box onClick={() => toggleColorMode()} className={s.root}>
          <Box
            className={s.root__icon}
            style={{
              backgroundColor: isCurrent ? accentColor : secondaryColor,
            }}
          >
            <Icon width={25} height={25} color={accentColor} as={item.icon} />
          </Box>
          <Box className={s.root__text}>
            <Text>{item.label}</Text>
          </Box>
        </Box>
      );
    } else return;
  }

  return (
    <Box as={NavLink} to={item.path} target={item.label === 'Telegram' ? '_blank' : '_self'} className={s.root}>
      <Box
        className={s.root__icon}
        style={{
          backgroundColor: isCurrent ? accentColor : secondaryColor,
        }}
      >
        <Icon
          width={25}
          height={25}
          color={isCurrent ? 'white' : accentColor}
          as={item.icon}
        />
      </Box>
      <Box className={s.root__text}>
        <Text fontSize={14}>{item.label}</Text>
      </Box>
    </Box>
  );
};

export default ActionBlock;
