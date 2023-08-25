import React from "react";

function UniversalHeader({ className, children, ...props }) {
  const actualClassName = `header sticky-header ${className ?? ""}`;
  return (
    <div {...props} className={actualClassName}>
      {children}
    </div>
  );
}

export default UniversalHeader;
