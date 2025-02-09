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
  const { blueVeryLightColor, navIconColor } = useColor();
  const { toggleColorMode, colorMode } = useColorMode();
  const { pathname } = useLocation();
  const isCurrent = pathname.slice(1) === item.path;
  const defaultColor = colorMode === 'light' ? 'Светлая тема' : 'Темная тема';

  const updateManifestThemeColor = (theme: string) => {
    const link = document.querySelector(
      "link[rel='manifest']"
    ) as HTMLLinkElement | null;
    if (link) {
      console.log('Manifest link found:', link); // Логируем элемент link
      console.log('Manifest href:', link.href); // Логируем href

      fetch(link.href)
        .then((response) => response.json())
        .then((manifest) => {
          manifest.background_color = theme === 'dark' ? '#171923' : '#ffffff';
          const newLink = document.createElement('link');
          console.log(manifest.background_color);
          console.log(manifest);
          newLink.setAttribute('rel', 'manifest');
          newLink.setAttribute('href', link.href);
          document.head.removeChild(link);
          document.head.appendChild(newLink);
        });
    } else {
      console.log('Manifest link not found');
    }
  };

  const handleToggleTheme = () => {
    toggleColorMode();
    // Обновляем манифест после переключения темы
    updateManifestThemeColor(colorMode === 'light' ? 'dark' : 'light');
  };

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
