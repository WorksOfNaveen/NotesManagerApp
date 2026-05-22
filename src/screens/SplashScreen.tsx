import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../hooks/useAppTheme';

export function SplashScreen() {
  const colors = useAppTheme();

  return (
    <View style={[styles.screen, { backgroundColor: colors.primary }]}>
      <Text style={styles.title}>Welcome to Notes App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
  },
});
