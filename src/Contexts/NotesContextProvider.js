import { createContext } from "react";
import useNotes from "../hooks/useNotes";

export const NotesContext = createContext();

function NotesContextProvider({ children }) {
  const [notesState, dispatchNotesState] = useNotes();
  return (
    <NotesContext.Provider value={{ notesState, dispatchNotesState }}>
      {children}
    </NotesContext.Provider>
  );
}

export default NotesContextProvider;
