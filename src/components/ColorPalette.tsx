import React, { useState } from "react";
import Tooltip from "../elements/Tooltip";
import { SketchPicker } from "react-color";

const noteBackgroundColors: { [key: string]: string } = {
  white: "default",
  "#faafa8": "Coral",
  "#fff8b8": "Sand",
  "#e2f6d3": "Mint",
  "#b4ddd3": "Sage",
  "#aeccdc": "Storm",
  "#f6e2dd": "Blossom",
  "#efeff1": "Chalk",
};

const pickerStyle = {
  default: {
    picker: {
      position: "absolute" as "absolute",
      bottom: "30px",
      left: "100px",
    },
  },
};

type ColorPaletteProps = {
  selectedColor: string;
  handleSelectColor: (bgcolor: string) => void;
};

function ColorPalette({ selectedColor, handleSelectColor }: ColorPaletteProps) {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  function handleClick(
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.ChangeEvent<HTMLInputElement>,
    bgcolor: string
  ) {
    e.stopPropagation();
    handleSelectColor(bgcolor);
  }

  return (
    <div className="background-color-palette-container">
      {Object.keys(noteBackgroundColors).map((color) => {
        return (
          <Tooltip key={color} tooltipContent={noteBackgroundColors[color]}>
            <button
              className="background-color-button"
              style={
                {
                  backgroundColor: color,
                  border: color === selectedColor ? "2px solid blue" : null,
                } as React.CSSProperties
              }
              onClick={(e) => handleClick(e, color)}
            >
              {color === "white" && color !== selectedColor ? (
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "14px", color: "rgba(1, 1, 1, 0.7)" }}
                >
                  format_color_reset
                </span>
              ) : (
                ""
              )}
              {color === selectedColor ? (
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                >
                  done
                </span>
              ) : (
                ""
              )}
            </button>
          </Tooltip>
        );
      })}
      <Tooltip tooltipContent={"Select from picker"}>
        <button
          className="background-color-button"
          style={
            {
              backgroundColor: selectedColor,
              border: !Object.keys(noteBackgroundColors).includes(selectedColor)
                ? "2px solid blue"
                : null,
            } as React.CSSProperties
          }
          onClick={(e) => {
            e.stopPropagation();
            setIsColorPickerOpen(!isColorPickerOpen);
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "14px", color: "rgba(1, 1, 1, 0.7)" }}
          >
            colorize
          </span>
        </button>
      </Tooltip>
      {isColorPickerOpen ? (
        <SketchPicker
          styles={pickerStyle}
          color={selectedColor}
          onChange={(updatedColor, event) => {
            event.preventDefault();
            handleClick(event, updatedColor.hex);
          }}
        />
      ) : null}
    </div>
  );
}

export default ColorPalette;
