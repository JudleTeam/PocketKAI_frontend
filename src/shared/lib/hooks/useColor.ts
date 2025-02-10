import { useChakra, useColorModeValue } from '@chakra-ui/react';

export const useColor = () => {
  const { theme } = useChakra();

  const currentDayNumberColor = useColorModeValue(
    theme.colors.light.currentDayNumberColor,
    theme.colors.dark.currentDayNumberColor
  );
  const currentDayNameColor = useColorModeValue(
    theme.colors.light.currentDayNameColor,
    theme.colors.dark.currentDayNameColor
  );
  const secondaryDayNumberColor = useColorModeValue(
    theme.colors.light.secondaryDayNumberColor,
    theme.colors.dark.secondaryDayNumberColor
  );
  const secondaryDayNameColor = useColorModeValue(
    theme.colors.light.secondaryDayNameColor,
    theme.colors.dark.secondaryDayNameColor
  );
  const accentColor = useColorModeValue(
    theme.colors.light.accentColor,
    theme.colors.dark.accentColor
  );
  const primaryColor = useColorModeValue(
    theme.colors.light.primaryColor,
    theme.colors.dark.primaryColor
  );
  const secondaryColor = useColorModeValue(
    theme.colors.light.secondaryColor,
    theme.colors.dark.secondaryColor
  );
  const mainColor = useColorModeValue(
    theme.colors.light.mainColor,
    theme.colors.dark.mainColor
  );
  const cardColor = useColorModeValue(
    theme.colors.light.cardColor,
    theme.colors.dark.cardColor
  );
  const secondaryTimeColor = useColorModeValue(
    theme.colors.light.secondaryTimeColor,
    theme.colors.dark.secondaryTimeColor
  );

  const themeColor = useColorModeValue(
    theme.colors.light.themeColor,
    theme.colors.dark.themeColor
  );
  const secondaryIconColor = useColorModeValue(
    theme.colors.light.secondaryIconColor,
    theme.colors.dark.secondaryIconColor
  );
  const infoColor = useColorModeValue(
    theme.colors.light.infoColor,
    theme.colors.dark.infoColor
  );
  return {
    currentDayNumberColor,
    currentDayNameColor,
    secondaryDayNumberColor,
    secondaryDayNameColor,
    accentColor,
    primaryColor,
    secondaryColor,
    mainColor,
    cardColor,
    secondaryTimeColor,
    themeColor,
    secondaryIconColor,
    infoColor,
  };
};
