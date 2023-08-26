import React from "react";

type NoteImageProps = {
  src?: string;
};

function NoteImage({
  src,
  ...props
}: NoteImageProps & React.HTMLAttributes<HTMLImageElement>) {
  return (
    <div className="note-image">
      {src ? <img {...props} src={src} alt="not-loaded" /> : null}
    </div>
  );
}
export default NoteImage;
