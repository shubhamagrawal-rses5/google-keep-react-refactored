import { useEffect, useState } from "react";

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
  const [deleteModalState, setDeleteModalState] = useState({
    open: false,
    noteId: null,
  });
  const [isCreateAreaExpanded, setIsCreateAreaExpanded] = useState(false);

  const dispatchNotesState = (actionType, payload) => {
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
      case "UPDATE_MODAL":
        setModalState(payload);
        break;
      case "UPDATE_CREATE_AREA_VISIBILITY":
        setIsCreateAreaExpanded(payload);
        break;
      case "UPDATE_DELETE_MODAL":
        setDeleteModalState(payload);
        break;
      default:
        return;
    }
  };

  const notesState = {
    notes,
    modalState,
    isCreateAreaExpanded,
    deleteModalState,
  };

  useEffect(() => {
    const createNoteArea = document.querySelector(".create-note-area");
    const createNoteOptions = document.querySelector(".create-note-options");

    const outsideNoteAreaClickHandler = (event) => {
      if (
        document.contains(event.target) &&
        !createNoteArea?.contains(event.target)
      ) {
        createNoteOptions?.querySelector(".save-button").click();
        setIsCreateAreaExpanded(false);
      }
    };
    const scrollHandler = (e) => {
      const universalHeader = document.querySelector(".sticky-header");
      if (window.scrollY > 0) {
        universalHeader.classList.add("add-shadow");
      } else {
        universalHeader.classList.remove("add-shadow");
      }
    };

    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("click", outsideNoteAreaClickHandler);
    return () => {
      window.removeEventListener("click", outsideNoteAreaClickHandler);
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return [notesState, dispatchNotesState];
}

export default useNotes;
