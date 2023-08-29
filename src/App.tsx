import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UniversalHeader from "./components/UniversalHeader";
import NotesPageLayout from "./pages/NotesPageLayout";
import BarChart from "./pages/BarChart";
import CompletedNotes from "./pages/CompletedNotes";

function App() {
  const [searchString, setSearchString] = useState<string>("");
  const [isNavbaropen, setIsNavbarOpen] = useState<boolean>(false);
  const workSpaceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const workSpace = workSpaceRef.current;
    if (isNavbaropen) {
      workSpace?.setAttribute("style", "margin-left:270px");
    } else {
      workSpace?.setAttribute("style", "margin-left:60px");
    }
  }, [isNavbaropen]);

  return (
    <div className="App">
      <UniversalHeader
        style={{ height: "64px" }}
        searchString={searchString}
        setSearchString={setSearchString}
        setIsNavbarOpen={setIsNavbarOpen}
      />

      <div className="workspace" ref={workSpaceRef}>
        <Router>
          <Navbar visibility={isNavbaropen} />
          <Routes>
            <Route
              path="/"
              element={<NotesPageLayout searchString={searchString} />}
            ></Route>
            <Route path="/barchart" element={<BarChart />}></Route>
            <Route
              path="/completednotes"
              element={<CompletedNotes searchString={searchString} />}
            ></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
