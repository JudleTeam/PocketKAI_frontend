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
import { useEffect } from 'react';

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

  const updateManifestLink = (theme: 'light' | 'dark'): void => {
    const link = document.querySelector(
      "link[rel='manifest']"
    ) as HTMLLinkElement | null;

    if (link) {
      const newManifestLink = `${link.href.split('?')[0]}?v=${new Date().getTime()}`; // Добавляем параметр версии

      fetch(newManifestLink)
        .then((response) => response.json())
        .then((manifest: { background_color: string }) => {
          manifest.background_color = theme === 'dark' ? '#171923' : '#ffffff';

          link.href = newManifestLink; // Обновляем ссылку на манифест
          console.log(
            'Manifest background_color updated to:',
            manifest.background_color
          );
        })
        .catch((error) => console.error('Error updating manifest:', error));
    }
  };

  const handleToggleTheme = () => {
    toggleColorMode();
    // Обновляем манифест после переключения темы
    updateManifestLink(colorMode === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    updateManifestLink(colorMode === 'light' ? 'dark' : 'light');
  }, [colorMode]);

  if (!item.path) {
    if (defaultColor !== item.label) {
      return (
        <Box onClick={handleToggleTheme} className={s.root}>
          <Box
            className={s.root__icon}
            style={{
              backgroundColor: isCurrent ? navIconColor : blueVeryLightColor,
            }}
          >
            <Icon width={25} height={25} color={navIconColor} as={item.icon} />
          </Box>
          <Box className={s.root__text}>
            <Text>{item.label}</Text>
          </Box>
        </Box>
      );
    } else return;
  }

  return (
    <Box as={NavLink} to={item.path} className={s.root}>
      <Box
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
      </Box>
      <Box className={s.root__text}>
        <Text fontSize={14}>{item.label}</Text>
      </Box>
    </Box>
  );
};

export default ActionBlock;
