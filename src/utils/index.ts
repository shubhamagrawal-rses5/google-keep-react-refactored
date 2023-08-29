import { ID, Note, NoteContent } from "../types";

export function getSearchFilterData(notes: Note[], filterString: string) {
  const filteredData = notes.filter(
    (item) =>
      item.title?.toLowerCase().includes(filterString.toLowerCase()) ||
      item.description?.toLowerCase().includes(filterString)
  );
  return filteredData;
}

export function getTargetNote(notes: Note[], noteId: ID) {
  return notes.find((note) => note.id === noteId);
}

export function createNote(notes: Note[], noteContent: NoteContent) {
  const notesCopy: Note[] = JSON.parse(JSON.stringify(notes));
  notesCopy.push({ ...noteContent, id: Date.now() });
  return notesCopy;
}

export function updateNote(notes: Note[], noteId: ID, updates: NoteContent) {
  const notesCopy: Note[] = JSON.parse(JSON.stringify(notes));
  const noteToBeUpdated = getTargetNote(notesCopy, noteId);
  if (noteToBeUpdated) {
    Object.assign(noteToBeUpdated, { ...updates });
  }
  return notesCopy;
}

export function deleteNote(notes: Note[], noteId: ID) {
  const filteredNotes = notes.filter((note) => note.id !== noteId);
  const notesCopy: Note[] = JSON.parse(JSON.stringify(filteredNotes));
  return notesCopy;
}

export function duplicateNote(notes: Note[], noteId: ID) {
  const noteToBeDuplicated = getTargetNote(notes, noteId);
  if (noteToBeDuplicated) {
    const notesCopy = createNote(notes, {
      ...noteToBeDuplicated,
    });
    return notesCopy;
  }

  return notes;
}

export function toggleNote(notes: Note[], noteId: ID) {
  const noteToBeToggled = getTargetNote(notes, noteId);
  if (noteToBeToggled) {
    const notesCopy = updateNote(notes, noteId, {
      ...noteToBeToggled,
      isPinned: !noteToBeToggled.isPinned,
    });
    return notesCopy;
  }
  return notes;
}

export function deleteNoteImage(notes: Note[], noteId: ID) {
  const noteToBeToggled = getTargetNote(notes, noteId);
  if (noteToBeToggled) {
    const notesCopy = updateNote(notes, noteId, {
      ...noteToBeToggled,
      imageSRC: "",
    });
    return notesCopy;
  }
  return notes;
}
