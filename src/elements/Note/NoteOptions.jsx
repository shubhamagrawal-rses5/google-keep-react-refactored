import { useContext, useEffect, useState } from "react";
import IconButton from "../IconButton";
import { NotesContext } from "../../Contexts/NotesContextProvider";
import Tooltip from "../Tooltip";
import Popover from "../Popover";
import ColorPalette from "../../components/ColorPalette";

export default function NoteOptions({ note, setNote }) {
  const { dispatchNotesState, notesState } = useContext(NotesContext);
  const { modalState } = notesState;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function handleDelete() {
    dispatchNotesState("DELETE_NOTE", { id: note.id });
    dispatchNotesState("UPDATE_MODAL", { open: false, note: null });
  }

  function handleDuplicate() {
    dispatchNotesState("DUPLICATE_NOTE", { id: note.id });
  }

  function handleUpdate(updates) {
    dispatchNotesState("UPDATE_NOTE", {
      id: note.id,
      updates,
    });
    dispatchNotesState("UPDATE_MODAL", {
      ...modalState,
      note: { ...modalState.note, ...updates },
    });
  }

  function handleFileChange(event) {
    const imageFile = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsDataURL(imageFile);

    fileReader.addEventListener("load", function (e) {
      handleUpdate({ imageSRC: e.target.result });
    });
  }

  function handleColorPaletteClick(event) {
    event.stopPropagation();
    setIsPopoverOpen((prev) => !prev);
  }

  function handleSelectColor(bgcolor) {
    dispatchNotesState("UPDATE_NOTE", {
      id: note.id,
      updates: { color: bgcolor },
    });
    if (modalState.open) {
      dispatchNotesState("UPDATE_MODAL", {
        ...modalState,
        note: { ...modalState.note, color: bgcolor },
      });
    }
    if (setNote) setNote({ ...note, color: bgcolor });
  }

  function handleComplete(event) {
    event.stopPropagation();

    if (modalState.open) {
      dispatchNotesState("UPDATE_MODAL", {
        ...modalState,
        note: { ...modalState.note, isCompleted: !note.isCompleted },
      });
    }
    dispatchNotesState("UPDATE_NOTE", {
      id: note.id,
      updates: { isCompleted: !note.isCompleted },
    });
    if (setNote) setNote({ ...note, isCompleted: !note.isCompleted });
  }

  useEffect(() => {
    const noteArea = document.querySelector(`#note-${note.id}`);
    const noteModal = document.querySelector(".note-modal");
    const outsideNoteAreaClickHandler = (event) => {
      if (document.contains(event.target) && !noteArea.contains(event.target)) {
        if (isPopoverOpen) {
          if (noteModal && !noteModal.contains(event.target)) {
            setIsPopoverOpen((prev) => !prev);
          } else if (!noteModal) {
            setIsPopoverOpen((prev) => !prev);
          }
        }
      }
    };

    window.addEventListener("click", outsideNoteAreaClickHandler);
    return () => {
      window.removeEventListener("click", outsideNoteAreaClickHandler);
    };
  }, [isPopoverOpen]);

  return (
    <div
      className="notes-options-container"
      style={{ visibility: isPopoverOpen ? "visible" : "" }}
    >
      <div className="note-options">
        <Tooltip tooltipContent={"Delete note"}>
          <IconButton
            icon={
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
              >
                delete
              </span>
            }
            styles={{ fontSize: "15px" }}
            onClick={handleDelete}
          />
        </Tooltip>
        <input
          type="file"
          accept="image/*"
          className="note-image-file"
          id={`note-image-file-${note.id}`}
          onChange={handleFileChange}
          hidden
        ></input>
        <label htmlFor={`note-image-file-${note.id}`}>
          <Tooltip tooltipContent={"Add image"}>
            <IconButton
              icon={
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                >
                  image
                </span>
              }
              styles={{ fontSize: "15px" }}
              onClick={(e) => {
                e.target.parentElement.click();
              }}
            />{" "}
          </Tooltip>
        </label>
        <Tooltip tooltipContent={"Duplicate note"}>
          <IconButton
            icon={
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                file_copy
              </span>
            }
            styles={{ fontSize: "15px" }}
            onClick={handleDuplicate}
          />{" "}
        </Tooltip>
        <Popover
          popoverContent={
            <ColorPalette
              selectedColor={note.color}
              handleSelectColor={handleSelectColor}
            />
          }
          open={isPopoverOpen}
        >
          <Tooltip tooltipContent={"Background color"}>
            <IconButton
              icon={
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                >
                  palette
                </span>
              }
              styles={{ fontSize: "15px" }}
              onClick={handleColorPaletteClick}
            />
          </Tooltip>
        </Popover>
        <Tooltip
          tooltipContent={note.isCompleted ? "Mark Undone" : "Mark as complete"}
        >
          <IconButton
            icon={
              note.isCompleted ? (
                <span className="material-icons" style={{ fontSize: "22px" }}>
                  check_circle
                </span>
              ) : (
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "22px" }}
                >
                  check_circle
                </span>
              )
            }
            styles={{ fontSize: "15px" }}
            onClick={handleComplete}
          />{" "}
        </Tooltip>
      </div>
    </div>
  );
}
