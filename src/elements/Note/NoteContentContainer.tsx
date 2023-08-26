import React from "react";

type NoteContentContainerProps = {
  children?: React.ReactNode;
};

function NoteContentContainer({ children }: NoteContentContainerProps) {
  return <div className="note-content-container">{children}</div>;
}

export default NoteContentContainer;
