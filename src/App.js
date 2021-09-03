import "./App.css";
import React from "react";
import Notes from "./components/Notes/Notes";
// eslint-disable-next-line no-unused-vars
import NoteManagerSkeleton from "./components/NotesManagerSkeleton/NoteManagerSkeleton";

function App() {
  return (
    <div className="App">
      <h2>Notes</h2>
      <Notes />
      {/*<NoteManagerSkeleton />*/}
    </div>
  );
}

export default App;
