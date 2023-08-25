import React, { useContext } from "react";
import { NotesContext } from "../Contexts/NotesContextProvider";

function DeleteModal() {
  const { notesState, dispatchNotesState } = useContext(NotesContext);
  const { deleteModalState } = notesState;
  const { noteId } = deleteModalState;

  function handleClose() {
    dispatchNotesState("UPDATE_DELETE_MODAL", {
      open: false,
      noteId: null,
    });
  }

  function deleteNote() {
    dispatchNotesState("UPDATE_MODAL", { open: false, note: null });
    dispatchNotesState("UPDATE_DELETE_MODAL", {
      open: false,
      noteId: null,
    });
  }

  function handleConfirm() {
    dispatchNotesState("DELETE_NOTE", { id: noteId });
    deleteNote();
  }

  return (
    <div>
      <div
        className="delete-modal-background"
        onClick={() =>
          dispatchNotesState("UPDATE_DELETE_MODAL", { open: false, note: null })
        }
      ></div>
      <div className="delete-modal">
        <span
          class="material-symbols-outlined"
          style={{ fontSize: "48px", color: "#FA6556" }}
        >
          cancel
        </span>
        <h2 style={{ textAlign: "center", color: "grey", margin: "1rem 0" }}>
          Are you sure?
        </h2>
        <div style={{ textAlign: "center", color: "grey", margin: "1rem 0" }}>
          Do you really want to delete this note? This process can't be undone.
        </div>
        <div>
          <button onClick={handleClose} style={{ backgroundColor: "grey" }}>
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            style={{ backgroundColor: "#FA6556" }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
