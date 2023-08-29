import { ID, Note, NoteContent } from ".";

export type ModalState = {
  open: boolean;
  note: Note | null;
};

export type DeleteModalState = {
  open: boolean;
  noteId: ID | null;
};

export type NotesState = {
  notes: Note[];
  modalState: ModalState;
  isCreateAreaExpanded: boolean;
  deleteModalState: DeleteModalState;
};

export type NotesDispatch = (
  actionType: NOTE_ACTION_TYPE,
  payload: DispatchNotePayload
) => void;

export type NOTE_ACTION_TYPE =
  | "CREATE_NOTE"
  | "DELETE_NOTE"
  | "DUPLICATE_NOTE"
  | "TOGGLE_NOTE"
  | "DELETE_NOTE_IMAGE"
  | "UPDATE_NOTE"
  | "UPDATE_MODAL"
  | "UPDATE_CREATE_AREA_VISIBILITY"
  | "UPDATE_DELETE_MODAL";

export type CreateNotePayload = NoteContent;
export type DeleteNotePayload = { id: ID };
export type DuplicateNotePayload = { id: ID };
export type ToggleNotePayload = { id: ID };
export type DeleteNoteImagePayload = { id: ID };
export type UpdateNotePayload = { id: ID; updates: NoteContent };
export type UpdateModalPayload = ModalState;
export type UpdateCreateAreaVisibilityPayload = boolean;
export type UpdateDeleteModalPayload = DeleteModalState;

export type DispatchNotePayload =
  | CreateNotePayload
  | DeleteNotePayload
  | DuplicateNotePayload
  | DeleteNoteImagePayload
  | ToggleNotePayload
  | UpdateNotePayload
  | UpdateModalPayload
  | UpdateCreateAreaVisibilityPayload
  | UpdateDeleteModalPayload;
