import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { HeaderButton } from '../components/HeaderButton';
import { useAppTheme } from '../hooks/useAppTheme';
import { useNotesStore } from '../store/useNotesStore';
import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Editor'>;

export function EditorScreen({ navigation, route }: Props) {
  const noteId = route.params?.noteId;
  const notes = useNotesStore(state => state.notes);
  const addNote = useNotesStore(state => state.addNote);
  const updateNote = useNotesStore(state => state.updateNote);
  const colors = useAppTheme();

  const savedNote = noteId ? notes.find(n => n.id === noteId) : undefined;
  const isEditing = Boolean(savedNote);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (savedNote) {
      setTitle(savedNote.title);
      setBody(savedNote.body);
    }
  }, [savedNote]);

  const saveNote = useCallback(() => {
    const cleanTitle = title.trim();
    const cleanBody = body.trim();

    if (!cleanTitle && !cleanBody) {
      Alert.alert('Empty note', 'Please write a title or some text first.');
      return;
    }

    if (isEditing && noteId) {
      updateNote(noteId, cleanTitle, cleanBody);
    } else {
      addNote(cleanTitle, cleanBody);
    }

    navigation.goBack();
  }, [title, body, isEditing, noteId, addNote, updateNote, navigation]);

  // Header Save/Update must read current title/body — setOptions in layout effect.
  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <HeaderButton
          label={isEditing ? 'Update' : 'Save'}
          color={colors.primary}
          onPress={saveNote}
        />
      ),
    });
  }, [navigation, isEditing, colors.primary, saveNote]);

  const inputStyle = [
    styles.input,
    {
      color: colors.text,
      borderColor: colors.border,
      backgroundColor: colors.card,
    },
  ];

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.form}>
        <TextInput
          style={[inputStyle, styles.titleInput]}
          placeholder="Title"
          placeholderTextColor={colors.textSecondary}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[inputStyle, styles.bodyInput]}
          placeholder="Write your note here..."
          placeholderTextColor={colors.textSecondary}
          value={body}
          onChangeText={setBody}
          multiline
          textAlignVertical="top"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  form: {
    flex: 1,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: '600',
  },
  bodyInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    minHeight: 200,
  },
});
