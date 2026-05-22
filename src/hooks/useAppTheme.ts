import { useColorScheme } from 'react-native';

import { darkColors, lightColors } from '../theme/colors';

/** Picks Google Keep light/dark colors based on the phone setting. */
export function useAppTheme() {
  const isDark = useColorScheme() === 'dark';
  return isDark ? darkColors : lightColors;
}
