import React, { useContext } from "react";
import IconButton from "../elements/IconButton";
import { NotesContext } from "../Contexts/NotesContextProvider";
import NoteImage from "../elements/Note/NoteImage";
import NoteOptions from "../elements/Note/NoteOptions";
import NoteTitle from "../elements/Note/NoteTitle";
import NoteDescription from "../elements/Note/NoteDescription";
import Tooltip from "../elements/Tooltip";
import { Note as NoteType } from "../types";

type NoteProps = {
  note: NoteType;
};

function Note({ note }: NoteProps) {
  const { dispatchNotesState } = useContext(NotesContext);
  const { title, description, color, isPinned, imageSRC, id, isCompleted } =
    note;

  function handleToggle() {
    dispatchNotesState("TOGGLE_NOTE", { id: note.id });
  }
  function handleNoteClick() {
    dispatchNotesState("UPDATE_MODAL", { open: true, note: note });
  }

  const _title = isCompleted ? <s>{title}</s> : title;
  const _description = isCompleted ? <s>{description}</s> : description;

  return (
    <div
      className="note"
      id={`note-${id}`}
      style={{
        backgroundColor: color,
        // outline: isCompleted ? "2px solid black" : "",
      }}
    >
      {isCompleted ? (
        <span
          className="material-icons"
          style={{
            fontSize: "22px",
            position: "absolute",
            top: "-10px",
            left: "-10px",
            backgroundColor: color,
            borderRadius: "11px",
          }}
        >
          check_circle
        </span>
      ) : null}
      <div className="toggle-pin">
        <Tooltip tooltipContent={isPinned ? "Unpin note" : "Pin note"}>
          <IconButton
            icon={
              isPinned ? (
                <span className="material-icons" style={{ fontSize: "18px" }}>
                  turned_in
                </span>
              ) : (
                <span className="material-icons" style={{ fontSize: "18px" }}>
                  turned_in_not
                </span>
              )
            }
            styles={{ fontSize: "15px" }}
            onClick={handleToggle}
          />
        </Tooltip>{" "}
      </div>
      <div onClick={handleNoteClick}>
        <NoteImage src={imageSRC} />
        <NoteTitle titleValue={_title} />
        <NoteDescription descriptionValue={_description} />
      </div>
      <NoteOptions note={note} />
    </div>
  );
}

export default Note;
