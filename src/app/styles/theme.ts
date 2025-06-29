import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors: {
    light: {
      currentDayNumberColor: '#3182CE',
      currentDayNameColor: '#6FA8DD',
      secondaryDayNumberColor: '#1A365D',
      secondaryDayNameColor: '#A9B3C2',
      accentColor: '#3182ce',
      primaryColor: '#1A365D',
      secondaryColor: '#D6E6F5',
      secondaryIconColor: '#98C0E6',
      mainColor: '#FFFFFF',
      cardColor: '#EDF2F7',
      secondaryTimeColor: '#D6E6F5',
      themeColor: '#999999',
      infoColor: '#FBAC56',
      noteColor: '#92A4C0'
    },
    dark: {
      currentDayColor: '#FFFFFF',
      currentDayNameColor: '#B9BABD',
      secondaryDayNumberColor: '#646D7D',
      secondaryDayNameColor: '#4D5462',
      accentColor: '#3182ce',
      primaryColor: '#FFFFFF',
      secondaryColor: '#222835',
      secondaryIconColor: '#718096',
      mainColor: '#171A23',
      cardColor: '#2A2E3A',
      secondaryTimeColor: '#616E82',
      themeColor: '#0E0F15',
      infoColor: '#FA9C36',
      noteColor: '#92A4C0'
    },
    infoColor: {
      200: '#FA9C36',
      600: '#FBAC56',
    },
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#171923' : 'white',
      },
    }),
  },
  config,
});

export default theme;
