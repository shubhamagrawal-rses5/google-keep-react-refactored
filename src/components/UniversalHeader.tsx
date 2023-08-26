import React from "react";

export type UniversalHeaderProps = {
  className?: string;
  children?: React.ReactNode;
};

function UniversalHeader({
  className,
  children,
  ...props
}: UniversalHeaderProps & React.HTMLAttributes<HTMLDivElement>) {
  const actualClassName = `header sticky-header ${className ?? ""}`;
  return (
    <div {...props} className={actualClassName}>
      {children}
    </div>
  );
}

export default UniversalHeader;
