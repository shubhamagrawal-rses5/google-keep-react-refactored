import { useState } from "react";
import "./App.css";
import KeepLogo from "./resources/keep_logo.png";
import SearchBar from "./components/SearchBar";
import PageLayout, { PageLayoutSlot } from "./layouts/NotesPageLayout";
import useNotes from "./hooks/useNotes";
import CreateNoteArea from "./components/CreateNote";
import DisplayAllNotes from "./components/DisplayAllNotes";
import { NotesContext } from "./Contexts/NotesContextProvider";
import NoteModal from "./components/NoteModal";

function App() {
  const [searchString, setSearchString] = useState("");
  const [notesState, dispatchNotesState] = useNotes();
  const { modalState } = notesState;

  return (
    <div className="App">
      <PageLayout>
        <PageLayoutSlot name={"sticky-header"} style={{ height: "64px" }}>
          <div className="logo-container">
            <img src={KeepLogo} alt="keep-logo"></img>
            Keep
          </div>
          <SearchBar
            searchString={searchString}
            setSearchString={setSearchString}
          />
          <div className="logo-container"></div>
        </PageLayoutSlot>

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
    </div>
  );
}

export default App;
