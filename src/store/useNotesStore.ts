/**
 * Notes live in two places:
 * - notes: saved on device (AsyncStorage)
 * - deletedNotes: temporarily removed while the undo snackbar is showing (not saved)
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { getSeedNotes } from '../data/seedNotes';
import type { Note } from '../types';

function makeNote(title: string, body: string): Note {
  const now = Date.now();
  return {
    id: String(now),
    title,
    body,
    createdAt: now,
    updatedAt: now,
  };
}

type NotesStore = {
  notes: Note[];
  /** Persisted flag: starter notes are injected only once per install. */
  hasSeeded: boolean;
  deletedNotes: Note[];
  addNote: (title: string, body: string) => void;
  updateNote: (id: string, title: string, body: string) => void;
  softDelete: (id: string) => void;
  restoreNote: (id: string) => void;
  permanentDelete: (id: string) => void;
};

export const useNotesStore = create<NotesStore>()(
  persist(
    set => ({
      notes: [],
      hasSeeded: false,
      deletedNotes: [],

      addNote: (title, body) => {
        set(state => ({
          notes: [...state.notes, makeNote(title, body)],
        }));
      },

      updateNote: (id, title, body) => {
        set(state => ({
          notes: state.notes.map(note =>
            note.id === id
              ? { ...note, title, body, updatedAt: Date.now() }
              : note,
          ),
        }));
      },

      /** Hide from the list but keep in deletedNotes until undo expires. */
      softDelete: id => {
        set(state => {
          const note = state.notes.find(n => n.id === id);
          if (!note) {
            return state;
          }
          return {
            notes: state.notes.filter(n => n.id !== id),
            deletedNotes: [...state.deletedNotes, note],
          };
        });
      },

      /** User tapped UNDO — put the note back in the main list. */
      restoreNote: id => {
        set(state => {
          const note = state.deletedNotes.find(n => n.id === id);
          if (!note) {
            return state;
          }
          return {
            notes: [...state.notes, note],
            deletedNotes: state.deletedNotes.filter(n => n.id !== id),
          };
        });
      },

      /** Undo window ended — drop the note for good. */
      permanentDelete: id => {
        set(state => ({
          deletedNotes: state.deletedNotes.filter(n => n.id !== id),
        }));
      },
    }),
    {
      name: 'notes-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // notes + hasSeeded on disk; pending deletes stay in memory only.
      partialize: state => ({ notes: state.notes, hasSeeded: state.hasSeeded }),
      onRehydrateStorage: () => state => {
        if (!state || state.hasSeeded) {
          return;
        }
        if (state.notes.length > 0) {
          useNotesStore.setState({ hasSeeded: true });
          return;
        }
        useNotesStore.setState({ notes: getSeedNotes(), hasSeeded: true });
      },
    },
  ),
);
