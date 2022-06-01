import { lightTheme } from '../styles/theme/light'

declare module 'styled-components' {
  type ThemeType = typeof lightTheme;
  export interface DefaultTheme extends ThemeType { }
}