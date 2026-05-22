import type { Note } from '../types';

/** Shown when a note has no title — keeps the UI friendly at a glance. */
export function getNoteTitle(note: Note): string {
  return note.title.trim() || 'Untitled';
}

/** Short preview for cards and list rows. */
export function getNotePreview(note: Note): string {
  return note.body.trim() || 'No content yet';
}
