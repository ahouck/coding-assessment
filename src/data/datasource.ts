import { Note } from "../models/Note";

const key = "notes_app";

const selectNotes = (): Note[] => {
  const dataString = localStorage.getItem(key) ?? "[]";

  //todo serialize date better
  const notes = (JSON.parse(dataString) as Note[]).map((d) => {
    d.createdAt = new Date(Date.parse(d.createdAt as unknown as string));
    return d;
  });

  return notes;
};

const createNote = (note: Note) => {
  const currentNotes = selectNotes();
  currentNotes.push(note);
  saveToLocalStorage(currentNotes);
};
/**
 *
 * @param id - Unique id for a note
 * @returns true if the element was deleted, false otherwise
 */
const deleteNote = (id: string) => {
  const currentNotes = selectNotes();
  const filtered = currentNotes.filter((n) => n.id !== id);
  saveToLocalStorage(filtered);
  return filtered.length !== currentNotes.length;
};

/**
 * Probably faster to simply pass in the whole note object and create a "new" one to
 * replace it
 */
const updateNote = (id: string, plainText: string, displayText: string) => {
  const currentNotes = selectNotes();
  const noteToUpdate = currentNotes.find((n) => n.id === id)!;
  const filteredNotes = currentNotes.filter((n) => n.id !== id);
  noteToUpdate.displayText = displayText;
  noteToUpdate.plainText = plainText;

  saveToLocalStorage([...filteredNotes, noteToUpdate]);
};

const saveToLocalStorage = (notes: Note[]) => {
  const newDataString = JSON.stringify(notes);
  localStorage.setItem(key, newDataString);
};

export const datasource = { selectNotes, createNote, deleteNote, updateNote };
