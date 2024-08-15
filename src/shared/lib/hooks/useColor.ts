import { useChakra, useColorModeValue } from '@chakra-ui/react';

export const useColor = () => {
  const { theme } = useChakra();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const mainElementColor = useColorModeValue(
    theme.colors.light.main_element,
    theme.colors.dark.main_element
  );
  const tabColor = useColorModeValue(
    theme.colors.light.tab,
    theme.colors.dark.tab
  )
  const tabTeacher = useColorModeValue(
    theme.colors.light.tab_teacher,
    theme.colors.dark.tab_teacher
  )
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  const secondElementLightColor = useColorModeValue(
    'light.second_element_light',
    'dark.second_element_light'
  );
  const secondElementColor = useColorModeValue(
    'light.second_element',
    'dark.second_element'
  );
  const cardColor = useColorModeValue(
    theme.colors.light.card,
    theme.colors.dark.card
  );
  const themeColor = useColorModeValue('#999999', '#10131A');
  const drawerColor = useColorModeValue('#fff', '#1A202C')
  return {
    mainTextColor,
    mainElementColor,
    mainColor,
    secondElementColor,
    secondElementLightColor,
    cardColor,
    themeColor,
    drawerColor,
    tabColor,
    tabTeacher
  };
};
