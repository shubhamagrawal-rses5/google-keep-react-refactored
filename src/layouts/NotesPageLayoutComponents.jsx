import React from "react";

// function PageLayoutStickyHeader({ className, children, ...props }) {
//   const actualClassName = `header sticky-header ${className ?? ""}`;
//   return (
//     <div {...props} className={actualClassName}>
//       {children}
//     </div>
//   );
// }

function PageLayoutHeader({ className, children, ...props }) {
  const actualClassName = `header ${className ?? ""}`;
  return (
    <div {...props} className={actualClassName}>
      {children}
    </div>
  );
}

function PageLayoutMain({ className, children, ...props }) {
  const actualClassName = `main ${className ?? ""}`;
  return (
    <div {...props} className={actualClassName}>
      {children}
    </div>
  );
}

function PageLayoutFooter({ className, children, ...props }) {
  const actualClassName = `page-layout ${className ?? ""}`;
  return (
    <div {...props} className={actualClassName}>
      {children}
    </div>
  );
}

function PageLayoutOverlay({ className, children, ...props }) {
  const actualClassName = `overlay ${className ?? ""}`;
  return (
    <div {...props} className={actualClassName}>
      {children}
    </div>
  );
}

export function PageLayoutSlot({ children, className, ...props }) {
  return <div className="page-layout-slot">{children}</div>;
}

function PageLayout({ className, children, ...props }) {
  const actualClassName = `page-layout ${className ?? ""}`;
  return (
    <div {...props} className={actualClassName}>
      {React.Children.map(children, (child) => {
        const childType = (child.props.name ?? "main").toUpperCase();
        const props = child.props;
        switch (childType) {
          case "HEADER":
            return <PageLayoutHeader {...props} />;
          // case "STICKY-HEADER":
          //   return <PageLayoutStickyHeader {...props} />;
          case "MAIN":
            return <PageLayoutMain {...props} />;
          case "FOOTER":
            return <PageLayoutFooter {...props} />;
          case "OVERLAY":
            return <PageLayoutOverlay {...props} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

export default PageLayout;
