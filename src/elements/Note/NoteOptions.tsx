import React from "react";
import { useContext, useEffect, useState } from "react";
import IconButton from "../IconButton";
import { NotesContext } from "../../Contexts/NotesContextProvider";
import Tooltip from "../Tooltip";
import Popover from "../Popover";
import ColorPalette from "../../components/ColorPalette";
import { ID, Note, NoteContent } from "../../types";

type NoteOptionsProps = {
  note: Note;
  setNote?: React.Dispatch<
    React.SetStateAction<{
      id: ID;
      title?: string;
      description?: string;
      isPinned?: boolean;
      isCompleted?: boolean;
      color?: string;
    }>
  >;
  handleModalClose?: () => void;
};

export default function NoteOptions({
  note,
  setNote,
  handleModalClose,
}: NoteOptionsProps) {
  const { dispatchNotesState, notesState } = useContext(NotesContext);
  const { modalState } = notesState;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function handleDelete() {
    dispatchNotesState("UPDATE_DELETE_MODAL", {
      open: true,
      noteId: note.id,
    });
  }

  function handleDuplicate() {
    dispatchNotesState("DUPLICATE_NOTE", { id: note.id });
  }

  function handleUpdate(updates: NoteContent) {
    dispatchNotesState("UPDATE_NOTE", {
      id: note.id,
      updates,
    });
    if (modalState.open) {
      dispatchNotesState("UPDATE_MODAL", {
        ...modalState,
        note: { ...modalState.note!, ...updates },
      });
    }
  }

  function handleFileChange(event: React.FormEvent<HTMLInputElement>) {
    const imageFiles = event.currentTarget.files;
    let imageFile;
    if (imageFiles) imageFile = imageFiles[0];
    const fileReader = new FileReader();

    fileReader.readAsDataURL(imageFile as Blob);

    fileReader.addEventListener("load", function (e) {
      handleUpdate({ imageSRC: e.target?.result } as NoteContent);
    });
  }

  function handleColorPaletteClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.stopPropagation();
    setIsPopoverOpen((prev) => !prev);
  }

  function handleSelectColor(bgcolor: string) {
    dispatchNotesState("UPDATE_NOTE", {
      id: note.id,
      updates: { color: bgcolor },
    });
    if (modalState.open) {
      dispatchNotesState("UPDATE_MODAL", {
        ...modalState,
        note: { ...modalState.note!, color: bgcolor },
      });
    }
    if (setNote) setNote({ ...note, color: bgcolor });
  }

  function handleComplete(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.stopPropagation();
    if (modalState.open) {
      dispatchNotesState("UPDATE_MODAL", {
        ...modalState,
        note: { ...modalState.note!, isCompleted: !note.isCompleted },
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
    const outsideNoteAreaClickHandler = (event: Event) => {
      const { target } = event;
      if (
        document.contains(target as Node) &&
        !noteArea?.contains(target as Node)
      ) {
        if (isPopoverOpen) {
          if (noteModal && !noteModal.contains(target as Node)) {
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
      style={
        { visibility: isPopoverOpen ? "visible" : "" } as React.CSSProperties
      }
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
                const _target = e.target as Node;
                _target?.parentElement?.click();
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
              selectedColor={note.color!}
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
      <div>
        <Tooltip tooltipContent={"Save note"}>
          <button className="save-button" onClick={handleModalClose}>
            Save
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
