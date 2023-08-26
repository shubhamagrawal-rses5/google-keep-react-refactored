import React from "react";

type HeadingProps = {
  children?: React.ReactNode;
};

function Heading({ children }: HeadingProps) {
  return (
    <span className="heading">
      <pre>
        {"  "}
        {"   "}
        {children}
      </pre>
    </span>
  );
}

export default Heading;
