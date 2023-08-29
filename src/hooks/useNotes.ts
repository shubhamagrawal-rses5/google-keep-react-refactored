import { useState } from "react";

import useLocalStorage from "./useLocalStorage";

import {
  createNote,
  deleteNote,
  deleteNoteImage,
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
  DeleteNoteImagePayload,
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
      case "DELETE_NOTE_IMAGE": {
        const { id } = payload as DeleteNoteImagePayload;
        newNotes = deleteNoteImage(notes, id);
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

  return [notesState, dispatchNotesState];
}

export default useNotes;
