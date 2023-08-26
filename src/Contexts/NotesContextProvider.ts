import { createContext } from "react";
import { NotesDispatch, NotesState } from "../types/hooks";

type NotesContextData = {
  notesState: NotesState;
  dispatchNotesState: NotesDispatch;
};

export const NotesContext = createContext({} as NotesContextData);

// function NotesContextProvider({ children }) {
//   const [notesState, dispatchNotesState] = useNotes();
//   return (
//     <NotesContext.Provider value={{ notesState, dispatchNotesState }}>
//       {children}
//     </NotesContext.Provider>
//   );
// }

// export default NotesContextProvider;
