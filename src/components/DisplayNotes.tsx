import React from "react";
import Heading from "../elements/Heading";
import { Note as NoteType } from "../types";
import Note from "./Note";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type DisplayNotesProps = {
  notes: NoteType[];
  headingContent: React.ReactNode;
};

export default function DisplayNotes({
  notes,
  headingContent,
}: DisplayNotesProps) {
  const columnsCountBreakPoints: { [key: number]: number } = {
    375: 1,
    860: 2,
    1150: 3,
    1450: 4,
    1650: 5,
    1950: 6,
  };
  return (
    <>
      {notes.length > 0 ? <Heading>{headingContent}</Heading> : null}
      <div className="notes-display-area">
        <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
          <Masonry gutter="1rem">
            {notes.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
}
