import React from "react";
type PopoverProps = {
  open: boolean;
  popoverContent?: React.ReactNode;
  children?: React.ReactNode;
  popoverContentStyles?: React.CSSProperties;
};
function Popover({
  open,
  popoverContent,
  children,
  popoverContentStyles,
}: PopoverProps) {
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
