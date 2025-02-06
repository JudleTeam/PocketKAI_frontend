import { useChakra, useColorModeValue } from '@chakra-ui/react';

export const useColor = () => {
  const { theme } = useChakra();

  const mainTextColor = useColorModeValue(
    theme.colors.light.main_text,
    theme.colors.dark.main_text
  );
  const backgroundColor = useColorModeValue(
    theme.colors.light.background_color,
    theme.colors.dark.background_color
  );
  const mainElementColor = useColorModeValue(
    theme.colors.light.main_element,
    theme.colors.dark.main_element
  );
  const tabColor = useColorModeValue(
    theme.colors.light.tab,
    theme.colors.dark.tab
  );
  const accountActionsColor = useColorModeValue(
    'light.account_actions',
    'dark.account_actions'
  );
  const exitButtonColor = useColorModeValue(
    'light.exit_button',
    'dark.exit_button'
  );
  const tabTeacher = useColorModeValue(
    theme.colors.light.tab_teacher,
    theme.colors.dark.tab_teacher
  );
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  const secondElementLightColor = useColorModeValue(
    theme.colors.light.second_element_light,
    theme.colors.dark.second_element_light
  );
  const secondElementColor = useColorModeValue(
    theme.colors.light.second_element,
    theme.colors.dark.second_element
  );
  const cardColor = useColorModeValue(
    theme.colors.light.card,
    theme.colors.dark.card
  );
  const blueLightElementColor = useColorModeValue(
    theme.colors.light.blue_light_element,
    theme.colors.dark.blue_light_element
  );
  const blackLightElementColor = useColorModeValue(
    theme.colors.light.black_light_element,
    theme.colors.dark.black_light_element
  );
  const blueVeryLightColor = useColorModeValue(
    theme.colors.light.blue_very_light,
    theme.colors.dark.blue_very_light
  );
  const navIconColor = useColorModeValue(
    theme.colors.light.navbar,
    theme.colors.dark.navbar
  );
  const themeColor = useColorModeValue('#999999', '#10131A');
  const modalThemeColor = useColorModeValue('#858585', '#0E1117');
  const drawerColor = useColorModeValue('#fff', '#171923');
  return {
    mainTextColor,
    mainElementColor,
    blueLightElementColor,
    blackLightElementColor,
    mainColor,
    secondElementColor,
    secondElementLightColor,
    cardColor,
    themeColor,
    modalThemeColor,
    drawerColor,
    tabColor,
    tabTeacher,
    exitButtonColor,
    accountActionsColor,
    blueVeryLightColor,
    backgroundColor,
    navIconColor,
  };
};
