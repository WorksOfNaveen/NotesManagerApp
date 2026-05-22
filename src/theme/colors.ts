/** Google Keep–style light palette (cream background, amber accent). */
export const lightColors = {
  background: '#FFF8E1',
  card: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  border: '#E8E0C5',
  primary: '#FBC02D',
  onPrimary: '#212121',
  danger: '#FF3B30',
  shadow: '#000000',
  snackbar: '#323232',
  snackbarText: '#FFFFFF',
};

/** Google Keep–style dark palette (charcoal surfaces, same amber accent). */
export const darkColors = {
  background: '#202124',
  card: '#2D2E30',
  text: '#E8EAED',
  textSecondary: '#9AA0A6',
  border: '#3C4043',
  primary: '#FBC02D',
  onPrimary: '#212121',
  danger: '#FF453A',
  shadow: '#000000',
  snackbar: '#323232',
  snackbarText: '#FFFFFF',
};

export type ThemeColors = typeof lightColors;
