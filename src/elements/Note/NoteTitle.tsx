import React from "react";

type NoteTitleProps = {
  titleValue: React.ReactNode;
};

function NoteTitle({
  titleValue,
  ...props
}: NoteTitleProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="note-content note-title" {...props}>
      {titleValue}
    </div>
  );
}

export default NoteTitle;
