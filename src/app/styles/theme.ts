import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
type ColorType = {
    main_text: string,
    main_element: string,
    second_element: string,
    card: string,
    main: string,
    user_text: string,
}
type ColorsType = {
    light: ColorType,
    dark: ColorType,
}
type ThemeType = {
    colors: ColorsType,
    config: ThemeConfig
}
const theme = extendTheme({
    colors: {
        light: {
            main_text: '#1a365d', //blue.900
            main_element: '#3182ce', //blue.500
            second_element: '#1a365d', //blue.500 + 80% 
            second_element_light: '#3182ce',
            blue_light_element: '#3182ce80',
            black_light_element: '#1a365d80',
            card: '#EDF2F7', //gray.100
            main: '#fff', //white
            user_text: '#fff', //white
            account_actions: '#fff', //white
            exit_button: '#63171B', // red.900
            timeline_element: '#3182ce',
            tab: '#EDF2F7'
        },
        dark: {
            main_text: '#fff', // white
            main_element: '#1A365D', // blue.900
            second_element: '#718096', // gray.400
            second_element_light: '#fff', 
            blue_light_element: '#718096',
            black_light_element: '#71809680',
            card: '#2D3748', // gray.700
            main: '#1A202C', // gray.900
            user_text: '#171923', // gray.900
            account_actions: '#2D3748', //gray.700
            exit_button: '#E53E3E',
            timeline_element: '#EDF2F7',
            tab: '#1A202C'
        }
    },
    config
}) as ThemeType

export default theme