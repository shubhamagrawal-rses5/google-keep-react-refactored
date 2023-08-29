export type ID = string | number;

export type NoteContent = {
  title?: string;
  description?: string;
  color?: string;
  imageSRC?: string;
  isPinned?: boolean;
  isCompleted?: boolean;
};

export type Note = NoteContent & { id: ID };
