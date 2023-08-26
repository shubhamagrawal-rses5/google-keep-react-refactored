import React from "react";

function ContentEditableDiv(
  { ...props }: React.HTMLAttributes<HTMLDivElement>,
  ref: any
) {
  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning={true}
      {...props}
    ></div>
  );
}

export default React.forwardRef(ContentEditableDiv);
