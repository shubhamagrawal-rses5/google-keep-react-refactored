import React, { useContext, useEffect, useRef, useState } from "react";
import ContentEditableDiv from "../elements/ContentEditableDiv";
import NoteImage from "../elements/Note/NoteImage";
import NoteOptions from "../elements/Note/NoteOptions";
import { NotesContext } from "../Contexts/NotesContextProvider";
import IconButton from "../elements/IconButton";
import NoteContentContainer from "../elements/Note/NoteContentContainer";
import { ID } from "../types";

function NoteModal() {
  const { notesState, dispatchNotesState } = useContext(NotesContext);
  const { modalState } = notesState;
  const { open, note } = modalState;

  const { id, title, description, isPinned, isCompleted, color } = note!;

  const [editingNote, setEditingNote] = useState<{
    id: ID;
    title?: string;
    description?: string;
    isPinned?: boolean;
    isCompleted?: boolean;
    color?: string;
  }>({
    id,
    title,
    description,
    isPinned,
    isCompleted,
    color,
  });

  const textAreaDescriptionRef = useRef<HTMLDivElement>(null);

  function handleModalClose() {
    dispatchNotesState("UPDATE_NOTE", {
      id: id,
      updates: editingNote,
    });
    dispatchNotesState("UPDATE_MODAL", { open: false, note: null });
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
      <div className="note-modal" style={{ backgroundColor: color }}>
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
          <NoteImage src={note?.imageSRC} noteId={id} />
          <ContentEditableDiv
            data-placeholder="Title"
            className="note-content note-title"
            // value={editingNote.title}
            children={<pre data-placeholder="Title">{_title}</pre>}
            onInput={(e: React.FormEvent<HTMLDivElement>) => {
              setEditingNote({
                ...editingNote,
                title: e.currentTarget.outerText,
              });
            }}
          />
          <ContentEditableDiv
            ref={textAreaDescriptionRef}
            data-placeholder="Note"
            className="note-content note-description"
            // value={editingNote.description}
            children={<pre data-placeholder="Note">{_description}</pre>}
            onInput={(e: React.FormEvent<HTMLDivElement>) =>
              setEditingNote({
                ...editingNote,
                description: e.currentTarget.outerText,
              })
            }
          />
        </NoteContentContainer>
        <NoteOptions
          note={editingNote}
          setNote={setEditingNote}
          handleModalClose={handleModalClose}
        />
      </div>
    </div>
  ) : null;
}

export default NoteModal;
