import React from "react";
import IconButton from "../elements/IconButton";
import Tooltip from "../elements/Tooltip";

function SearchBar({ searchString, setSearchString }) {
  function handleChange(e) {
    setSearchString(e.target.value);
  }

  function handleReset() {
    setSearchString("");
  }

  function handleSearchIconClick() {
    document.querySelector('input[aria-label="Search"]').focus();
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
          icon={<span class="material-symbols-outlined">close</span>}
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
