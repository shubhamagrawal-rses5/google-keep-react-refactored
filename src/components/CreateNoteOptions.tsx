import React from "react";
import { useContext, useState } from "react";
import { NotesContext } from "../Contexts/NotesContextProvider";
import IconButton from "../elements/IconButton";
import { initialNote } from "./CreateNote";
import Tooltip from "../elements/Tooltip";
import Popover from "../elements/Popover";
import ColorPalette from "./ColorPalette";
import { NoteContent } from "../types";

type CreateNoteOptionsProps = {
  creatingNote: NoteContent;
  setCreatingNote: React.Dispatch<React.SetStateAction<NoteContent>>;
};

export default function CreateNoteOptions({
  creatingNote,
  setCreatingNote,
  ...props
}: CreateNoteOptionsProps & React.HTMLAttributes<HTMLDivElement>) {
  const { dispatchNotesState } = useContext(NotesContext);

  const [isCreatingPopoverOpen, setIsCreatingPopoverOpen] = useState(false);

  function eraseAllCreateData() {
    setCreatingNote(initialNote);
    document
      .querySelectorAll(".create-note-area div[contenteditable=true]")
      .forEach((e) => {
        e.innerHTML = "";
      });
    const image = document.querySelector(".create-note-area  .note-image");
    if (image) image.innerHTML = "";
    document
      .querySelector(".create-note-area  button > span")
      ?.setAttribute("innerHTML", "turned_in_not");
    setIsCreatingPopoverOpen(false);
  }

  function handleCreate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    if (
      creatingNote.title ||
      creatingNote.description ||
      creatingNote.imageSRC
    ) {
      dispatchNotesState("CREATE_NOTE", creatingNote);
    }
    eraseAllCreateData();
    dispatchNotesState("UPDATE_CREATE_AREA_VISIBILITY", false);
  }

  function handleDiscard() {
    eraseAllCreateData();
  }

  function handleFileChange(event: React.FormEvent<HTMLInputElement>) {
    const imageFiles = event.currentTarget.files;
    let imageFile;
    if (imageFiles) imageFile = imageFiles[0];
    const fileReader = new FileReader();

    fileReader.readAsDataURL(imageFile as Blob);

    const targetArea = document.querySelector(".create-note-area  .note-image");

    fileReader.addEventListener("load", function (e) {
      if (targetArea)
        targetArea.innerHTML = `<img {...props} src=${e.target?.result} alt="not-loaded" />`;
      setCreatingNote({
        ...creatingNote,
        imageSRC: e.target?.result,
      } as NoteContent);
    });
  }

  function handleBackgroundColor(bgcolor: string) {
    setCreatingNote({ ...creatingNote, color: bgcolor });
  }

  return (
    <div className="notes-options-container" {...props}>
      <div className="note-options">
        <Tooltip tooltipContent={"Discard note"}>
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
            onClick={handleDiscard}
          />
        </Tooltip>
        <input
          type="file"
          accept="image/*"
          className="create-note-image-file"
          id="create-note-image-file"
          hidden
          onChange={handleFileChange}
        ></input>
        <label htmlFor="create-note-image-file">
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
            />
          </Tooltip>
        </label>
        <Popover
          popoverContent={
            <ColorPalette
              selectedColor={creatingNote.color!}
              handleSelectColor={handleBackgroundColor}
            />
          }
          open={isCreatingPopoverOpen}
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
              onClick={() => setIsCreatingPopoverOpen((prev) => !prev)}
            />{" "}
          </Tooltip>
        </Popover>
      </div>
      <Tooltip tooltipContent={"Save note"}>
        <button
          className="save-button"
          onClick={handleCreate}
          style={{ marginRight: "0.5rem" }}
        >
          Save
        </button>
      </Tooltip>
    </div>
  );
}
