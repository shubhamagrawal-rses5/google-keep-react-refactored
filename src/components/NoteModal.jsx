import React, { useContext, useEffect, useRef, useState } from "react";
import ContentEditableDiv from "../elements/ContentEditableDiv";
import NoteImage from "../elements/Note/NoteImage";
import NoteOptions from "../elements/Note/NoteOptions";
import { NotesContext } from "../Contexts/NotesContextProvider";
import IconButton from "../elements/IconButton";
import NoteContentContainer from "../elements/Note/NoteContentContainer";

function NoteModal() {
  const { notesState, dispatchNotesState } = useContext(NotesContext);
  const { modalState } = notesState;
  const { open, note } = modalState;

  const { id, title, description, isPinned, isCompleted, color } = note;

  const [editingNote, setEditingNote] = useState({
    id,
    title,
    description,
    isPinned,
    isCompleted,
    color,
  });

  const textAreaDescriptionRef = useRef(null);

  function handleModalClose() {
    dispatchNotesState("UPDATE_NOTE", {
      id: note.id,
      updates: editingNote,
    });
    dispatchNotesState("UPDATE_MODAL", { open: false, note: null });
    setEditingNote(null);
  }

  function handleToggle() {
    setEditingNote({ ...editingNote, isPinned: !editingNote.isPinned });
  }

  useEffect(() => {
    let input = textAreaDescriptionRef.current;
    input?.focus();
  }, [textAreaDescriptionRef]);

  const _title = isCompleted ? <s>{title}</s> : title;
  const _description = isCompleted ? <s>{description}</s> : description;

  return open ? (
    <div>
      <div className="note-modal-background" onClick={handleModalClose}></div>
      <div className="note-modal" style={{ backgroundColor: note.color }}>
        <IconButton
          icon={
            editingNote.isPinned ? (
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
          className="toggle-pin"
        />
        <NoteContentContainer>
          <NoteImage src={note.imageSRC} />
          <ContentEditableDiv
            data-placeholder="Title"
            className="note-content note-title"
            value={editingNote.title}
            children={<pre data-placeholder="Title">{_title}</pre>}
            onInput={(e) => {
              setEditingNote({ ...editingNote, title: e.target.outerText });
            }}
          />
          <ContentEditableDiv
            ref={textAreaDescriptionRef}
            data-placeholder="Note"
            className="note-content note-description"
            value={editingNote.description}
            children={<pre data-placeholder="Note">{_description}</pre>}
            onInput={(e) =>
              setEditingNote({
                ...editingNote,
                description: e.target.outerText,
              })
            }
          />
        </NoteContentContainer>
        <NoteOptions note={editingNote} setNote={setEditingNote} />
      </div>
    </div>
  ) : null;
}

export default NoteModal;
