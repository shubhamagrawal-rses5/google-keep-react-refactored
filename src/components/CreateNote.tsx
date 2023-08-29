import React, { useContext, useEffect, useRef, useState } from "react";

import IconButton from "../elements/IconButton";
import NoteImage from "../elements/Note/NoteImage";
import { NotesContext } from "../Contexts/NotesContextProvider";
import ContentEditableDiv from "../elements/ContentEditableDiv";
import CreateNoteOptions from "./CreateNoteOptions";
import Tooltip from "../elements/Tooltip";
import NoteContentContainer from "../elements/Note/NoteContentContainer";
import { NoteContent } from "../types";

export const initialNote: NoteContent = {
  title: "",
  description: "",
  color: "white",
  imageSRC: "",
  isPinned: false,
  isCompleted: false,
};

function CreateNoteArea() {
  const [creatingNote, setCreatingNote] = useState(initialNote);
  const { notesState, dispatchNotesState } = useContext(NotesContext);
  const { isCreateAreaExpanded } = notesState;
  const createNoteAreaRef = useRef<HTMLDivElement | null>(null);
  const createNoteOptionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const createNoteArea = createNoteAreaRef.current;
    const createNoteOptions = createNoteOptionsRef.current;

    const outsideNoteAreaClickHandler = (event: Event) => {
      const { target } = event;
      if (
        document.contains(target as Node) &&
        !createNoteArea?.contains(target as Node)
      ) {
        const saveButton = createNoteOptions?.querySelector(
          ".save-button"
        ) as HTMLElement;

        saveButton?.click();
        dispatchNotesState("UPDATE_CREATE_AREA_VISIBILITY", false);
      }
    };

    window.addEventListener("click", outsideNoteAreaClickHandler);
    return () => {
      window.removeEventListener("click", outsideNoteAreaClickHandler);
    };
  }, []);

  function handleTogglePin() {
    setCreatingNote({ ...creatingNote, isPinned: !creatingNote.isPinned });
  }

  return (
    <div
      ref={createNoteAreaRef}
      className="create-note-area"
      onClick={() => dispatchNotesState("UPDATE_CREATE_AREA_VISIBILITY", true)}
      style={{ backgroundColor: creatingNote.color }}
    >
      <div className="toggle-pin">
        <Tooltip
          tooltipContent={creatingNote.isPinned ? "Unpin note" : "Pin note"}
        >
          <IconButton
            icon={
              creatingNote.isPinned ? (
                <span className="material-icons" style={{ fontSize: "20px" }}>
                  turned_in
                </span>
              ) : (
                <span className="material-icons" style={{ fontSize: "20px" }}>
                  turned_in_not
                </span>
              )
            }
            styles={{
              fontSize: "15px",
            }}
            onClick={handleTogglePin}
          />
        </Tooltip>
      </div>
      <NoteContentContainer>
        <NoteImage />
        <ContentEditableDiv
          data-placeholder="Title"
          className="note-content note-title"
          onInput={(e: React.FormEvent<HTMLDivElement>) =>
            setCreatingNote({
              ...creatingNote,
              title: e.currentTarget.outerText,
            })
          }
          style={{ display: isCreateAreaExpanded ? "block" : "none" }}
        />
        <ContentEditableDiv
          data-placeholder="Take a note..."
          className="note-content note-description"
          onInput={(e: React.FormEvent<HTMLDivElement>) =>
            setCreatingNote({
              ...creatingNote,
              description: e.currentTarget.outerText,
            })
          }
        />
      </NoteContentContainer>
      <CreateNoteOptions
        ref={createNoteOptionsRef}
        className="create-note-options"
        creatingNote={creatingNote}
        setCreatingNote={setCreatingNote}
        style={{ display: isCreateAreaExpanded ? "flex" : "none" }}
      />
    </div>
  );
}

export default CreateNoteArea;
