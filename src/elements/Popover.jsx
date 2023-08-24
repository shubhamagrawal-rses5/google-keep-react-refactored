import React from "react";

function Popover({
  open,
  popoverContent,
  children,
  arrow = false,
  popoverContentStyles,
  ...props
}) {
  return (
    <div className="popover">
      <div>{children}</div>
      {open ? (
        <span
          className="popover-content"
          style={{
            display: open ? "inherit" : "none",
            ...popoverContentStyles,
          }}
        >
          {popoverContent}
        </span>
      ) : null}
    </div>
  );
}

export default Popover;
