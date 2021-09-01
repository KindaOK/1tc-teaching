import React, { useState, useEffect } from "react";
import Note from "./Note/Note";
import "./Notes.css"

function Notes() {
  const [notes, setNotes] = useState([
    { title: "hi", text: "name", dateCreated: new Date() },
  ]);

  const [newNote, setNewNote] = useState({
    title: "",
    text: "",
    dateCreated: new Date(),
  });

  const addNote = () => {
    // update the notes list and set the creation time of the newest note to now
    setNotes([...notes, { ...newNote, dateCreated: new Date() }]);
    // clear out the new note form
    setNewNote({
      title: "",
      text: "",
      dateCreated: new Date(),
    });
  };

  // remove the given note and update the state
  const handleRemoveNote = (index) =>
    // keep all notes except for the once matching the index
    setNotes(notes.filter((_, i) => index !== i));

  // only run once at component creation
  useEffect(() => {
    // try to load any saved notes
    //  if there are no saved notes, then parse an empty array
    const savedNotes = JSON.parse(localStorage.getItem("notes") ?? "[]");
    if (savedNotes?.length) {
      setNotes(savedNotes);
    }
  }, []);

  // every time the notes are updated, save to local storage
  //  it doesn't matter what updates them
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <>
      <div>
        <label>
          Title
          <input
              value={newNote.title}
            onChange={(event) =>
              setNewNote({ ...newNote, title: event.target.value })
            }
          />
        </label>
        <label>
          Text
          <input
              value={newNote.text}
            onChange={(event) =>
              setNewNote({ ...newNote, text: event.target.value })
            }
          />
        </label>
        <button onClick={addNote}>Add Note</button>
      </div>
      <div className="Notes">
        {notes.map((note, i) => (
          // using the unique field (time) as the update hint
          <Note
            note={note}
            deleteFunction={() => handleRemoveNote(i)}
            key={note.dateCreated}
          />
        ))}
      </div>
    </>
  );
}

export default Notes;
