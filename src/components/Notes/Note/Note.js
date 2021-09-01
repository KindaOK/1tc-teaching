import React from "react";
import "./Note.css"

const dateOptions = {
    timeStyle: "medium",
    dateStyle: "medium",
};

function Note(props) {
    let dateString = props.note.dateCreated;
    // sometimes the value of the dateString might be a string
    if (typeof props.note.dateCreated === "string") {
        dateString = new Date(dateString);
    }
    dateString = dateString.toLocaleString([], dateOptions);
  return (
    <div>
      <h3 className="no-margin">{props.note?.title}</h3>
      <h6 className="no-margin">{dateString}</h6>
      <p>{props.note?.text}</p>
        <button onClick={props.deleteFunction}>Delete</button>
    </div>
  );
}

export default Note;
