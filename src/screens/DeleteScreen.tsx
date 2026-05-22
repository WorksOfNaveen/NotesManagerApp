import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { DeleteNoteRow } from '../components/DeleteNoteRow';
import { UndoSnackbar } from '../components/UndoSnackbar';
import {
  SNACKBAR_GAP,
  SNACKBAR_HEIGHT,
} from '../constants/app';
import { useAppTheme } from '../hooks/useAppTheme';
import { useNotesStore } from '../store/useNotesStore';
import type { Note, RootStackParamList } from '../types';
import { getNoteTitle } from '../utils/noteDisplay';

type Props = NativeStackScreenProps<RootStackParamList, 'Delete'>;

type PendingUndo = {
  id: string;
  message: string;
};

export function DeleteScreen(_props: Props) {
  const notes = useNotesStore(state => state.notes);
  const softDelete = useNotesStore(state => state.softDelete);
  const restoreNote = useNotesStore(state => state.restoreNote);
  const permanentDelete = useNotesStore(state => state.permanentDelete);
  const colors = useAppTheme();

  const [pendingUndos, setPendingUndos] = useState<PendingUndo[]>([]);

  const removePending = (id: string) => {
    setPendingUndos(current => current.filter(item => item.id !== id));
  };

  const handleDeletePress = (note: Note) => {
    softDelete(note.id);
    setPendingUndos(current => [
      ...current,
      { id: note.id, message: `"${getNoteTitle(note)}" deleted` },
    ]);
  };

  const handleUndo = (noteId: string) => {
    restoreNote(noteId);
    removePending(noteId);
  };

  const handleExpire = (noteId: string) => {
    permanentDelete(noteId);
    removePending(noteId);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <FlatList
        data={notes}
        keyExtractor={note => note.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              Nothing to delete
            </Text>
            <Text style={[styles.emptyHint, { color: colors.textSecondary }]}>
              Swipe a note left or tap the trash icon
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <DeleteNoteRow
            note={item}
            colors={colors}
            onDelete={() => handleDeletePress(item)}
          />
        )}
      />

      {pendingUndos.map((pending, index) => (
        <UndoSnackbar
          key={pending.id}
          message={pending.message}
          colors={colors}
          bottomOffset={24 + index * (SNACKBAR_HEIGHT + SNACKBAR_GAP)}
          onUndo={() => handleUndo(pending.id)}
          onExpire={() => handleExpire(pending.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    padding: 16,
    flexGrow: 1,
    paddingBottom: 120,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 15,
    textAlign: 'center',
  },
});
