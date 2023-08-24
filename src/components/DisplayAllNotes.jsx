import React, { useContext } from "react";
import DisplayNotes from "./DisplayNotes";
import { getSearchFilterData } from "../utils/index";
import { NotesContext } from "../Contexts/NotesContextProvider";

function DisplayAllNotes({ searchString }) {
  const { notesState } = useContext(NotesContext);
  const { notes } = notesState;

  const filteredNotes = getSearchFilterData(notes, searchString);

  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const otherNotes = filteredNotes.filter((note) => !note.isPinned);
  return (
    <div className="notes-area">
      <DisplayNotes notes={pinnedNotes} headingContent={"Pinned"} />
      <DisplayNotes notes={otherNotes} headingContent={"Others"} />
    </div>
  );
}

export default DisplayAllNotes;
