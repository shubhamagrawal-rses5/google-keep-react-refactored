import React, { useContext, useState } from "react";
import IconButton from "../IconButton";
import { NotesContext } from "../../Contexts/NotesContextProvider";
import { ID, Note } from "../../types";

type NoteImageProps = {
  src?: string;
  noteId?: ID;
};

function NoteImage({
  src,
  noteId,
  ...props
}: NoteImageProps & React.HTMLAttributes<HTMLImageElement>) {
  const [deleteVisibility, setDeleteVisbility] = useState<boolean>(false);
  const { dispatchNotesState, notesState } = useContext(NotesContext);
  const { modalState } = notesState;
  return (
    <div
      className="note-image"
      onMouseEnter={() => setDeleteVisbility(true)}
      onMouseLeave={() => setDeleteVisbility(false)}
    >
      {src ? <img {...props} src={src} alt="not-loaded" /> : null}
      {noteId ? (
        <div className="delete-image">
          <IconButton
            icon={
              <span className="material-icons" style={{ fontSize: "20px" }}>
                delete
              </span>
            }
            styles={{
              fontSize: "16px",
              borderRadius: "2px",
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "white",
              visibility: deleteVisibility ? "visible" : "hidden",
            }}
            onClick={() => {
              dispatchNotesState("DELETE_NOTE_IMAGE", { id: noteId });
              dispatchNotesState("UPDATE_MODAL", {
                ...modalState,
                note: { ...modalState.note, imageSRC: "" } as Note,
              });
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
export default NoteImage;
