import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import type { ThemeColors } from '../theme/colors';
import type { Note } from '../types';
import { getNotePreview, getNoteTitle } from '../utils/noteDisplay';

type Props = {
  note: Note;
  colors: ThemeColors;
  onPress: () => void;
};

export function NoteCard({ note, colors, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
        {getNoteTitle(note)}
      </Text>
      <Text
        style={[styles.preview, { color: colors.textSecondary }]}
        numberOfLines={3}
      >
        {getNotePreview(note)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 140,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    margin: 6,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  preview: {
    fontSize: 13,
    lineHeight: 18,
  },
});
