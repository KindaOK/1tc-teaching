// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import Note from "./NoteSkeleton/NoteSkeleton";
import "./NoteManagerSkeleton.css";

function NoteManagerSkeleton() {
  // only run once at component creation
  useEffect(() => {
    // try to load any saved notes
    //  if there are no saved notes, then parse an empty array
    const savedNotes = JSON.parse(localStorage.getItem("notes") ?? "[]");
    savedNotes.forEach(
      (note) => (note.dateCreated = new Date(note.dateCreated))
    );
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
      {/* add inputs and button here */}
      </div>
      <div className="Notes">
      {/* generate notes here */}
      </div>
    </>
  );
}

export default NoteManagerSkeleton;
