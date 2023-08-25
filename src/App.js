import { useState } from "react";
import "./App.css";
import KeepLogo from "./resources/keep_logo.png";
import SearchBar from "./components/SearchBar";
import PageLayout, {
  PageLayoutSlot,
} from "./layouts/NotesPageLayoutComponents";
import useNotes from "./hooks/useNotes";
import CreateNoteArea from "./components/CreateNote";
import DisplayAllNotes from "./components/DisplayAllNotes";
import { NotesContext } from "./Contexts/NotesContextProvider";
import NoteModal from "./components/NoteModal";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UniversalHeader from "./components/UniversalHeader";
import NotesPageLayout from "./layouts/NotesPageLayout";
import IconButton from "./elements/IconButton";
import Tooltip from "./elements/Tooltip";
import BarChart from "./components/BarChart";

function App() {
  const [searchString, setSearchString] = useState("");
  const [isNavbaropen, setIsNavbarOpen] = useState(false);

  return (
    <div className="App">
      <UniversalHeader style={{ height: "64px" }}>
        <Tooltip tooltipContent={"Main menu"}>
          <IconButton
            icon={
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "24px",
                  padding: "12px",
                  margin: "0 4px",
                }}
              >
                menu
              </span>
            }
            styles={{ fontSize: "22px" }}
            onClick={() => {
              setIsNavbarOpen((prev) => !prev);
            }}
          />
        </Tooltip>
        <div className="logo-container">
          <img src={KeepLogo} alt="keep-logo"></img>
          <span style={{ padding: "0 0 0 4px" }}>Keep</span>
        </div>
        <SearchBar
          searchString={searchString}
          setSearchString={setSearchString}
        />
        <div className="universal-header-options"></div>
      </UniversalHeader>

      <div className="workspace">
        <Router>
          <Navbar visibility={isNavbaropen} />
          <Routes>
            <Route
              exact
              path="/"
              element={<NotesPageLayout searchString={searchString} />}
            ></Route>
            <Route exact path="/barchart" element={<BarChart />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
