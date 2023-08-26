import React, { useState } from "react";

export type TooltipProps = {
  tooltipContent?: React.ReactNode;
  children?: React.ReactNode;
  tooltipContentStyles?: React.CSSProperties;
};

function Tooltip({
  tooltipContent,
  children,
  tooltipContentStyles,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="tooltip ">
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </div>
      <span
        className="tooltip-content"
        style={{ display: open ? "inherit" : "none", ...tooltipContentStyles }}
      >
        {tooltipContent}
      </span>
    </div>
  );
}

export default Tooltip;
