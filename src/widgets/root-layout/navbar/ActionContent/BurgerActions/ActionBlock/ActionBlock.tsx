import { useColor } from '@/shared';
import {
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
  const { blueVeryLightColor, navIconColor } = useColor();
  const { toggleColorMode, colorMode } = useColorMode();
  const { pathname } = useLocation();
  const isCurrent = pathname.slice(1) === item.path;
  const defaultColor = colorMode === 'light' ? 'Светлая тема' : 'Темная тема';

  if (!item.path) {
    if (defaultColor !== item.label) {
      return (
        <div onClick={() => toggleColorMode()} className={s.root}>
          <div
            className={s.root__icon}
            style={{
              backgroundColor: isCurrent ? navIconColor : blueVeryLightColor,
            }}
          >
            <Icon width={25} height={25} color={navIconColor} as={item.icon} />
          </div>
          <div className={s.root__text}>
            <Text>{item.label}</Text>
          </div>
        </div>
      );
    } else return;
  }

  return (
    <NavLink to={item.path} className={s.root}>
      <div
        className={s.root__icon}
        style={{
          backgroundColor: isCurrent ? navIconColor : blueVeryLightColor,
        }}
      >
        <Icon
          width={25}
          height={25}
          color={isCurrent ? 'white' : navIconColor}
          as={item.icon}
        />
      </div>
      <div className={s.root__text}>
        <Text>{item.label}</Text>
      </div>
    </NavLink>
  );
};

export default ActionBlock;
