import React from "react";
import PageLayout, { PageLayoutSlot } from "./NotesPageLayoutComponents";
import CreateNoteArea from "../components/CreateNote";
import { NotesContext } from "../Contexts/NotesContextProvider";
import DisplayAllNotes from "../components/DisplayAllNotes";
import NoteModal from "../components/NoteModal";
import useNotes from "../hooks/useNotes";

function NotesPageLayout({ searchString }) {
  const [notesState, dispatchNotesState] = useNotes();
  const { modalState } = notesState;
  return (
    <PageLayout>
      <PageLayoutSlot name={"header"}>
        <NotesContext.Provider value={{ notesState, dispatchNotesState }}>
          <CreateNoteArea />
        </NotesContext.Provider>
      </PageLayoutSlot>

      <PageLayoutSlot name={"main"}>
        <NotesContext.Provider value={{ notesState, dispatchNotesState }}>
          <DisplayAllNotes searchString={searchString} />
        </NotesContext.Provider>
      </PageLayoutSlot>

      <PageLayoutSlot name={"overlay"}>
        <NotesContext.Provider value={{ notesState, dispatchNotesState }}>
          {modalState.open ? <NoteModal /> : null}
        </NotesContext.Provider>
      </PageLayoutSlot>
    </PageLayout>
  );
}

export default NotesPageLayout;
