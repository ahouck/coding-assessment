import { Note } from "../models/Note";
import { datasource } from "./datasource";

const sortByDate = (n1: Note, n2: Note) =>
  n2.createdAt.getTime() - n1.createdAt.getTime();

export const createNote = ({plainText, displayText}: {plainText: string, displayText: string}) => {
  const note = new Note({plainText, displayText});
  datasource.createNote(note);
  return note;
};

export const getNotes = (): Note[] => {
  const data = datasource.selectNotes();

  data.sort(sortByDate);
  return data;
};

export const deleteNote = (id: string) => {
  datasource.deleteNote(id);
};

export const updateNote = (
  id: string,
  plainText: string,
  displayText: string
) => {
  datasource.updateNote(id, plainText, displayText);
};
