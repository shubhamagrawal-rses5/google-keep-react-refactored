import React from "react";
import IconButton from "../elements/IconButton";
import Tooltip from "../elements/Tooltip";

type SearchBarProps = {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({ searchString, setSearchString }: SearchBarProps) {
  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    setSearchString(e.currentTarget.value);
  }

  function handleReset() {
    setSearchString("");
  }

  function handleSearchIconClick() {
    const searchBar = document.querySelector(
      'input[aria-label="Search"]'
    ) as HTMLElement;
    searchBar?.focus();
  }

  return (
    <div className="searchbar-container">
      <Tooltip tooltipContent={"Search"}>
        <IconButton
          icon={<span className="material-symbols-outlined">search</span>}
          styles={{ fontSize: "16px" }}
          onClick={handleSearchIconClick}
        />
      </Tooltip>
      <input
        aria-label="Search"
        placeholder="Search"
        type="text"
        value={searchString}
        onChange={handleChange}
      ></input>
      <Tooltip
        tooltipContent={"Cancel"}
        tooltipContentStyles={{
          visibility: searchString ? "visible" : "hidden",
        }}
      >
        <IconButton
          icon={<span className="material-symbols-outlined">close</span>}
          styles={{
            fontSize: "18px",
            visibility: searchString ? "visible" : "hidden",
          }}
          onClick={handleReset}
        />
      </Tooltip>
    </div>
  );
}

export default SearchBar;
