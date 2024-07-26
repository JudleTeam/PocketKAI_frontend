import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
    colors: {
        light: {
            main_text: '#1a365d', // blue.900 - white
            main_element: '#3182ce', //blue.500 - blue.900
            second_element: '#1a365d', // blue.900 - gray.500
            second_element_light: '#3182ce', // blue.500 - white
            blue_light_element: '#3182ce80', // blue.500 + 80% - gray.500
            black_light_element: '#1a365d80', // blue.900 + 80% - gray.500 + 80%
            card: '#EDF2F7', // gray.100 - gray.700
            main: '#fff', // white - gray.800
            account_actions: '#fff', // white - gray.700
            exit_button: '#63171B', // red.900 - red.500
            tab: '#EDF2F7' // gray.100 - gray.800
        },
        dark: {
            main_text: '#fff', // white
            main_element: '#1A365D', // blue.900
            second_element: '#718096', // gray.500
            second_element_light: '#fff', // white
            blue_light_element: '#718096', // gray.500
            black_light_element: '#71809680', // gray.500 + 80%
            card: '#2D3748', // gray.700
            main: '#1A202C', // gray.800
            account_actions: '#2D3748', //gray.700
            exit_button: '#E53E3E', // red.500
            tab: '#1A202C' // gray.800
        }
    },
    config
}) 

export default theme