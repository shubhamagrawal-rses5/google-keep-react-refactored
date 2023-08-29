import React, { useEffect, useRef } from "react";

import { useLocation, useNavigate } from "react-router-dom";

type NavbarProps = {
  visibility: boolean;
};

function Navbar({ visibility = true }: NavbarProps) {
  const navigate = useNavigate();
  const currentRoute = useLocation().pathname;

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (visibility) {
      sidebarRef.current?.setAttribute("style", "width:260px");
    } else {
      sidebarRef.current?.setAttribute("style", "width:58px");
    }
  }, [visibility]);

  return (
    <div className="navbar" ref={sidebarRef}>
      <div
        className={`navbar-item ${currentRoute === "/" ? "active" : ""}`}
        onClick={() => navigate("/")}
      >
        <span
          className={`material-symbols-outlined ${
            currentRoute === "/" ? "active" : ""
          }`}
          style={{
            fontSize: "24px",
            padding: "12px",
            backgroundColor:
              !visibility && currentRoute === "/" ? "#feefc3" : "transparent",
            borderRadius: "25px",
          }}
        >
          lightbulb
        </span>
        <span
          style={{
            marginLeft: "20px",
            fontSize: "14px",
            letterSpacing: ".01785714em",
            fontFamily: ` "Google Sans",Roboto,Arial,sans-serif`,
            fontWeight: "550",
            color: "#202124",
            display: visibility ? "inherit" : "none",
          }}
        >
          Notes
        </span>
      </div>
      <div
        className={`navbar-item
        ${currentRoute === "/barchart" ? "active" : ""}`}
        onClick={() => navigate("/barchart")}
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: "24px",
            padding: "12px",
            backgroundColor:
              !visibility && currentRoute === "/barchart"
                ? "#feefc3"
                : "transparent",
            borderRadius: "25px",
          }}
        >
          bar_chart
        </span>
        <span
          style={{
            marginLeft: "20px",
            fontSize: "14px",
            letterSpacing: ".01785714em",
            fontFamily: ` "Google Sans",Roboto,Arial,sans-serif`,
            fontWeight: "550",
            color: "#202124",
            display: visibility ? "inherit" : "none",
          }}
        >
          Chart
        </span>
      </div>
      <div
        className={`navbar-item
        ${currentRoute === "/completednotes" ? "active" : ""}`}
        onClick={() => navigate("/completednotes")}
      >
        <span
          className="material-symbols-outlined"
          style={{
            fontSize: "24px",
            padding: "12px",
            backgroundColor:
              !visibility && currentRoute === "/completednotes"
                ? "#feefc3"
                : "transparent",
            borderRadius: "25px",
          }}
        >
          tv_options_edit_channels
        </span>
        <span
          style={{
            marginLeft: "20px",
            fontSize: "14px",
            letterSpacing: ".01785714em",
            fontFamily: ` "Google Sans",Roboto,Arial,sans-serif`,
            fontWeight: "550",
            color: "#202124",
            display: visibility ? "inherit" : "none",
            width: "max-content",
          }}
        >
          Completed Notes
        </span>
      </div>
    </div>
  );
}

export default Navbar;
