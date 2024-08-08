import { useChakra, useColorModeValue } from '@chakra-ui/react';

export const useColor = () => {
  const { theme } = useChakra();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const mainElementColor = useColorModeValue(
    theme.colors.light.main_element,
    theme.colors.dark.main_element
  );
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
  const themeColor = useColorModeValue('#858585', '#0E1117');
  return {
    mainTextColor,
    mainElementColor,
    mainColor,
    secondElementColor,
    secondElementLightColor,
    cardColor,
    themeColor,
  };
};
