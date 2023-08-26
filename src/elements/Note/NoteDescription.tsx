import React from "react";

type NoteDescriptionProps = {
  descriptionValue: React.ReactNode;
};

function NoteDescription({
  descriptionValue,
  ...props
}: NoteDescriptionProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="note-content note-description" {...props}>
      {descriptionValue}
    </div>
  );
}

export default NoteDescription;
