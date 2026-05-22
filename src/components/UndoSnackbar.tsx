import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { UNDO_DURATION_MS } from '../constants/app';
import type { ThemeColors } from '../theme/colors';

type Props = {
  message: string;
  colors: ThemeColors;
  bottomOffset: number;
  onUndo: () => void;
  onExpire: () => void;
};

export function UndoSnackbar({
  message,
  colors,
  bottomOffset,
  onUndo,
  onExpire,
}: Props) {
  const slideAnim = useRef(new Animated.Value(80)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const isDone = useRef(false);

  // Refs keep the 4s timer stable; parent passes new callbacks each render.
  const onUndoRef = useRef(onUndo);
  const onExpireRef = useRef(onExpire);
  onUndoRef.current = onUndo;
  onExpireRef.current = onExpire;

  const dismiss = useCallback((callback: () => void) => {
    // Ignore double taps on UNDO or timer + UNDO firing together.
    if (isDone.current) {
      return;
    }
    isDone.current = true;

    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 80,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        callback();
      }
    });
  }, [slideAnim, opacityAnim]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(
      () => dismiss(() => onExpireRef.current()),
      UNDO_DURATION_MS,
    );

    return () => clearTimeout(timer);
  }, [dismiss, slideAnim, opacityAnim]);

  const handleUndo = () => {
    dismiss(() => onUndoRef.current());
  };

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          bottom: bottomOffset,
          opacity: opacityAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={[styles.bar, { backgroundColor: colors.snackbar }]}>
        <Text
          style={[styles.message, { color: colors.snackbarText }]}
          numberOfLines={1}
        >
          {message}
        </Text>
        <Pressable onPress={handleUndo} hitSlop={8}>
          <Text style={[styles.undo, { color: colors.primary }]}>UNDO</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  message: {
    flex: 1,
    fontSize: 15,
    marginRight: 12,
  },
  undo: {
    fontSize: 15,
    fontWeight: '700',
  },
});
