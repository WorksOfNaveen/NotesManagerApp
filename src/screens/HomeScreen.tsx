import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { NoteCard } from '../components/NoteCard';
import { useAppTheme } from '../hooks/useAppTheme';
import { useNotesStore } from '../store/useNotesStore';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const notes = useNotesStore(state => state.notes);
  const colors = useAppTheme();

  const openNewNote = () => navigation.navigate('Editor');
  const openNote = (noteId: string) =>
    navigation.navigate('Editor', { noteId });

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <FlatList
        data={notes}
        keyExtractor={note => note.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={notes.length > 0 ? styles.row : undefined}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No notes yet
            </Text>
            <Text style={[styles.emptyHint, { color: colors.textSecondary }]}>
              Tap + to write your first note
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardSlot}>
            <NoteCard
              note={item}
              colors={colors}
              onPress={() => openNote(item.id)}
            />
          </View>
        )}
      />

      <Pressable
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={openNewNote}
      >
        <Text style={[styles.addButtonText, { color: colors.onPrimary }]}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    padding: 10,
    paddingBottom: 100,
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardSlot: {
    flex: 1,
    maxWidth: '50%',
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
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 32,
    lineHeight: 34,
  },
});
