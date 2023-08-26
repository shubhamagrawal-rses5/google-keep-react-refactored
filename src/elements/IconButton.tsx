import React from "react";

export type IconButtonProps = {
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  size?: string;
  styles?: React.CSSProperties;
  disabled?: Boolean;
};
function IconButton({
  icon,
  onClick,
  className,
  size = "24px",
  styles,
}: IconButtonProps) {
  const actualClassName = `icon-button ${className ?? ""}`;
  return (
    <button
      className={actualClassName}
      style={
        {
          height: size,
          width: size,
          ...styles,
        } as React.CSSProperties
      }
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

export default IconButton;
