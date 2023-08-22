import React, { useEffect, useState } from "react";

import useLocalStorage from "./useLocalStorage";

import {
  createNote,
  deleteNote,
  duplicateNote,
  toggleNote,
  updateNote,
} from "../utils";

function useNotes() {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [modalState, setModalState] = useState({
    open: false,
    note: null,
  });
  const [isCreateAreaExpanded, setIsCreateAreaExpanded] = useState(false);

  const dispatchNotes = (actionType, payload) => {
    let newNotes;
    switch (actionType) {
      case "CREATE_NOTE":
        newNotes = createNote(notes, payload);
        setNotes(newNotes);
        return;
      case "DELETE_NOTE":
        newNotes = deleteNote(notes, payload.id);
        setNotes(newNotes);
        return;
      case "DUPLICATE_NOTE":
        newNotes = duplicateNote(notes, payload.id);
        setNotes(newNotes);
        return;
      case "TOGGLE_NOTE":
        newNotes = toggleNote(notes, payload.id);
        setNotes(newNotes);
        return;
      case "UPDATE_NOTE":
        newNotes = updateNote(notes, payload.id, payload.updates);
        setNotes(newNotes);
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    const createNoteArea = document.querySelector(".create-note-area");
    const createNoteOptions = document.querySelector(".create-note-options");

    const outsideNoteAreaClickHandler = (event) => {
      if (
        document.contains(event.target) &&
        !createNoteArea.contains(event.target)
      ) {
        createNoteOptions.querySelector(".save-button").click();
        setIsCreateAreaExpanded(false);
      }
    };
    window.addEventListener("click", outsideNoteAreaClickHandler);
    return () => {
      window.removeEventListener("click", outsideNoteAreaClickHandler);
    };
  }, []);

  return {
    notes,
    dispatchNotes,
    modalState,
    setModalState,
    isCreateAreaExpanded,
    setIsCreateAreaExpanded,
  };
}

export default useNotes;
