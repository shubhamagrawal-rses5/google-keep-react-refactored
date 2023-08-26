import { useEffect, useState } from "react";

import useLocalStorage from "./useLocalStorage";

import {
  createNote,
  deleteNote,
  duplicateNote,
  toggleNote,
  updateNote,
} from "../utils";
import { Note } from "../types";
import {
  NOTE_ACTION_TYPE,
  DeleteModalState,
  ModalState,
  DispatchNotePayload,
  CreateNotePayload,
  UpdateModalPayload,
  UpdateNotePayload,
  DeleteNotePayload,
  DuplicateNotePayload,
  ToggleNotePayload,
  NotesState,
  NotesDispatch,
} from "../types/hooks";

function useNotes(): [NotesState, NotesDispatch] {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    note: null,
  });
  const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>({
    open: false,
    noteId: null,
  });
  const [isCreateAreaExpanded, setIsCreateAreaExpanded] = useState(false);

  const dispatchNotesState = (
    actionType: NOTE_ACTION_TYPE,
    payload: DispatchNotePayload
  ) => {
    let newNotes: Note[];
    switch (actionType) {
      case "CREATE_NOTE": {
        newNotes = createNote(notes, payload as CreateNotePayload);
        setNotes(newNotes);
        return;
      }
      case "DELETE_NOTE": {
        const { id } = payload as DeleteNotePayload;
        newNotes = deleteNote(notes, id);
        setNotes(newNotes);
        return;
      }
      case "DUPLICATE_NOTE": {
        const { id } = payload as DuplicateNotePayload;
        newNotes = duplicateNote(notes, id);
        setNotes(newNotes);
        return;
      }
      case "TOGGLE_NOTE": {
        const { id } = payload as ToggleNotePayload;
        newNotes = toggleNote(notes, id);
        setNotes(newNotes);
        return;
      }
      case "UPDATE_NOTE": {
        const { id, updates } = payload as UpdateNotePayload;
        newNotes = updateNote(notes, id, updates);
        setNotes(newNotes);
        return;
      }
      case "UPDATE_MODAL":
        setModalState(payload as UpdateModalPayload);
        break;
      case "UPDATE_CREATE_AREA_VISIBILITY":
        setIsCreateAreaExpanded(payload as boolean);
        break;
      case "UPDATE_DELETE_MODAL":
        setDeleteModalState(payload as DeleteModalState);
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
        setIsCreateAreaExpanded(false);
      }
    };
    const scrollHandler = () => {
      const universalHeader = document.querySelector(".sticky-header")!;
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
