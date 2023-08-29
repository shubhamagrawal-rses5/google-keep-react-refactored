import React, { useEffect, useRef } from "react";
import Tooltip from "../elements/Tooltip";
import IconButton from "../elements/IconButton";
import SearchBar from "./SearchBar";
import KeepLogo from "../resources/keep_logo.png";

export type UniversalHeaderProps = {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  setIsNavbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  children?: React.ReactNode;
};

function UniversalHeader({
  searchString,
  setSearchString,
  setIsNavbarOpen,
  className,
  children,
  ...props
}: UniversalHeaderProps & React.HTMLAttributes<HTMLDivElement>) {
  const fixedHeaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollHandler = () => {
      const universalHeader = fixedHeaderRef.current;
      if (window.scrollY > 0) {
        universalHeader?.classList.add("add-shadow");
      } else {
        universalHeader?.classList.remove("add-shadow");
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const actualClassName = `header fixed-header ${className ?? ""}`;
  return (
    <div {...props} ref={fixedHeaderRef} className={actualClassName}>
      <div className="universal-header-options-left">
        <Tooltip tooltipContent={"Main menu"}>
          <IconButton
            icon={
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "24px",
                  padding: "12px",
                  margin: "0 4px",
                }}
              >
                menu
              </span>
            }
            styles={{ fontSize: "22px" }}
            onClick={() => {
              setIsNavbarOpen((prev) => !prev);
            }}
          />
        </Tooltip>
        <div className="logo-container">
          <img src={KeepLogo} alt="keep-logo"></img>
          <span style={{ padding: "0 0 0 4px" }}>Keep</span>
        </div>
        <SearchBar
          searchString={searchString}
          setSearchString={setSearchString}
        />
      </div>
      <div className="universal-header-options-right">
        <Tooltip tooltipContent={"Refresh"}>
          <IconButton
            icon={
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "24px",
                  padding: "12px",
                  margin: "0 4px",
                }}
              >
                refresh
              </span>
            }
            styles={{ fontSize: "22px" }}
            onClick={() => {}}
          />
        </Tooltip>
        <Tooltip tooltipContent={"List view"}>
          <IconButton
            icon={
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "24px",
                  padding: "12px",
                  margin: "0 4px",
                }}
              >
                grid_view
              </span>
            }
            styles={{ fontSize: "22px" }}
            onClick={() => {}}
          />
        </Tooltip>
        <Tooltip tooltipContent={"Settings"}>
          <IconButton
            icon={
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "24px",
                  padding: "12px",
                  margin: "0 4px",
                }}
              >
                settings
              </span>
            }
            styles={{ fontSize: "22px" }}
            onClick={() => {}}
          />
        </Tooltip>
        <div style={{ marginLeft: "1.5rem" }}>
          <Tooltip tooltipContent={"Apps"}>
            <IconButton
              icon={
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "24px",
                    padding: "12px",
                    margin: "0 4px",
                  }}
                >
                  apps
                </span>
              }
              styles={{ fontSize: "22px" }}
              onClick={() => {}}
            />
          </Tooltip>
        </div>
        <Tooltip tooltipContent={"Profile"}>
          <IconButton
            icon={
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "32px",
                  padding: "12px",
                  margin: "0 4px",
                }}
              >
                account_circle
              </span>
            }
            styles={{ fontSize: "22px" }}
            onClick={() => {}}
          />
        </Tooltip>
      </div>
    </div>
  );
}

export default UniversalHeader;
