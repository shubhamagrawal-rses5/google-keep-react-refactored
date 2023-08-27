import React from "react";

import PageLayout, {
  PageLayoutSlot,
} from "../layouts/NotesPageLayoutComponents";
import DeleteModal from "../components/DeleteModal";
import NoteModal from "../components/NoteModal";
import useNotes from "../hooks/useNotes";
import { NotesContext } from "../Contexts/NotesContextProvider";
import { getSearchFilterData } from "../utils";
import DisplayNotes from "../components/DisplayNotes";

type CompletedNotesProps = {
  searchString: string;
};

function CompletedNotes({ searchString }: CompletedNotesProps) {
  const [notesState, dispatchNotesState] = useNotes();
  const { notes, modalState, deleteModalState } = notesState;

  const filteredNotes = getSearchFilterData(notes, searchString).filter(
    (note) => note.isCompleted
  );

  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const otherNotes = filteredNotes.filter((note) => !note.isPinned);
  return (
    <PageLayout>
      <PageLayoutSlot name={"main"}>
        <NotesContext.Provider value={{ notesState, dispatchNotesState }}>
          <div className="notes-area">
            <DisplayNotes notes={pinnedNotes} headingContent={"Pinned"} />
            <DisplayNotes notes={otherNotes} headingContent={"Others"} />
          </div>
        </NotesContext.Provider>
      </PageLayoutSlot>

      <PageLayoutSlot name={"overlay"}>
        <NotesContext.Provider value={{ notesState, dispatchNotesState }}>
          {modalState.open ? <NoteModal /> : null}
          {deleteModalState.open ? <DeleteModal /> : null}
        </NotesContext.Provider>
      </PageLayoutSlot>
    </PageLayout>
  );
}

export default CompletedNotes;
