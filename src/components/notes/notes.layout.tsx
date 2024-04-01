import React, { useEffect, useState } from "react";
import { NotesList } from "./notes_list.component";
import { NotesEditor } from "./notes_editor.component";
import { Note } from "../../models/Note";
import {
  getNotes,
  deleteNote,
  createNote,
  updateNote,
} from "../../data/data_controller";
import Fuse from "fuse.js";
import { Button, Input } from "antd";

export const NotesLayout = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note>();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const notes = refreshNotes();
    setNotes(notes);
    setSelectedNote(notes[0]);
  }, []);

  useEffect(() => {
    let newNotes: Note[];
    if (searchTerm.length) {
      const fuse = new Fuse(notes, {
        isCaseSensitive: true,
        includeScore: false,
        keys: ["displayText"],
      });
      newNotes = fuse.search(searchTerm).map((r) => r.item);
    } else {
      newNotes = refreshNotes();
    }
    setNotes(newNotes);
    setSelectedNote(newNotes[0]);
  }, [searchTerm]);

  const onNewNote = () => {
    setSelectedNote(undefined);
  };

  const refreshNotes = () => {
    const n = getNotes();
    return n;
  };

  const onDeleteNote = (noteId: string) => {
    deleteNote(noteId);
    refreshNotes();
  };

  const onSaveNote = (
    id: string | undefined,
    plainText: string,
    renderedText: string
  ) => {
    if (id) {
      updateNote(id, plainText, renderedText);
    } else {
      createNote(plainText, renderedText);
    }
    refreshNotes();
    return true;
  };

  const onSelectNote = (id: string) => {
    const note = notes.find((note) => note.id === id);
    setSelectedNote(note);
  };

  return (
    <div className="notesLayout">
      <div id="sidebar_container" className="leftContainer">
        <div>Search</div>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button style={{ width: "100%" }} type="primary" onClick={onNewNote}>
          + New Note
        </Button>
        <NotesList
          selectedId={selectedNote?.id}
          notes={notes}
          onDelete={onDeleteNote}
          onSelect={onSelectNote}
        />
      </div>
      <NotesEditor note={selectedNote} onSave={onSaveNote} />
    </div>
  );
};
