import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

import type { ThemeColors } from '../theme/colors';
import type { Note } from '../types';
import { getNotePreview, getNoteTitle } from '../utils/noteDisplay';

type Props = {
  note: Note;
  colors: ThemeColors;
  onDelete: () => void;
};

export function DeleteNoteRow({ note, colors, onDelete }: Props) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <RectButton
          style={[styles.swipeAction, { backgroundColor: colors.danger }]}
          onPress={onDelete}
        >
          <Text style={styles.swipeActionText}>Delete</Text>
        </RectButton>
      )}
    >
      <View
        style={[
          styles.row,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={styles.textBlock}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {getNoteTitle(note)}
          </Text>
          <Text
            style={[styles.preview, { color: colors.textSecondary }]}
            numberOfLines={2}
          >
            {getNotePreview(note)}
          </Text>
        </View>

        <Pressable
          style={[styles.trashButton, { backgroundColor: colors.danger }]}
          onPress={onDelete}
          accessibilityLabel="Delete note"
        >
          <Text style={styles.trashIcon}>🗑</Text>
        </Pressable>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  textBlock: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  preview: {
    fontSize: 14,
    lineHeight: 20,
  },
  trashButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trashIcon: {
    fontSize: 18,
  },
  swipeAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 88,
    marginBottom: 10,
    borderRadius: 12,
    marginLeft: 8,
  },
  swipeActionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
