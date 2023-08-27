import React from "react";

export type PageLayoutHeaderProps = {
  className?: string;
  children?: React.ReactNode;
};

export type PageLayoutMainProps = {
  className?: string;
  children?: React.ReactNode;
};

export type PageLayoutFooterProps = {
  className?: string;
  children?: React.ReactNode;
};

export type PageLayoutOverlayProps = {
  className?: string;
  children?: React.ReactNode;
};

export type PageLayoutSlotProps = {
  className?: string;
  name?: string;
  children?: React.ReactNode;
};

export type PageLayoutProps = {
  className?: string;
  children?: React.ReactNode[];
};

function PageLayoutHeader({
  className,
  children,
  ...props
}: PageLayoutHeaderProps & React.HTMLAttributes<HTMLDivElement>) {
  const actualClassName = `header ${className ?? ""}`;
  return (
    <div {...props} className={actualClassName}>
      {children}
    </div>
  );
}

function PageLayoutMain({
  className,
  children,
  ...props
}: PageLayoutMainProps & React.HTMLAttributes<HTMLDivElement>) {
  const actualClassName = `main ${className ?? ""}`;
  return (
    <div {...props} className={actualClassName}>
      {children}
    </div>
  );
}

function PageLayoutFooter({
  className,
  children,
  ...props
}: PageLayoutFooterProps & React.HTMLAttributes<HTMLDivElement>) {
  const actualClassName = `page-layout ${className ?? ""}`;
  return (
    <div {...props} className={actualClassName}>
      {children}
    </div>
  );
}

function PageLayoutOverlay({
  className,
  children,
  ...props
}: PageLayoutOverlayProps & React.HTMLAttributes<HTMLDivElement>) {
  const actualClassName = `overlay c`;
  return (
    <div {...props} className={actualClassName}>
      {children}
    </div>
  );
}

export function PageLayoutSlot({
  children,
  className,
  name,
  ...props
}: PageLayoutSlotProps & React.HTMLAttributes<HTMLDivElement>) {
  const actualClassName = `page-layout-slot ${className ?? ""}`;
  return (
    <div {...props} className={actualClassName}>
      {children}
    </div>
  );
}

function PageLayout({
  className,
  children,
  ...props
}: PageLayoutProps & React.HTMLAttributes<HTMLDivElement>) {
  const actualClassName = `page-layout ${className ?? ""}`;
  return (
    <div {...props} className={actualClassName}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const props = child?.props;
          const childType: string = (props.name ?? "main").toUpperCase();
          switch (childType) {
            case "HEADER":
              return <PageLayoutHeader {...props} />;
            case "MAIN":
              return <PageLayoutMain {...props} />;
            case "FOOTER":
              return <PageLayoutFooter {...props} />;
            case "OVERLAY":
              return <PageLayoutOverlay {...props} />;
            default:
              return null;
          }
        }
        return child;
      })}
    </div>
  );
}

export default PageLayout;
