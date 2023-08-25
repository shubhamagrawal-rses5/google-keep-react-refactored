import React, { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

function Navbar({ visibility = true }) {
  const navigate = useNavigate();
  const currentRoute = useLocation().pathname;

  useEffect(() => {
    const sidebar = document.querySelector(".navbar");
    const main = document.querySelector(".page-layout");
    if (visibility) {
      sidebar.setAttribute("style", "width:260px");
      main?.setAttribute("style", "margin-left:270px");
    } else {
      sidebar.setAttribute("style", "width:58px");
      main?.setAttribute("style", "margin-left:60px");
    }
  }, [visibility]);

  return (
    <div className="navbar">
      <div
        className={`navbar-item ${currentRoute === "/" ? "active" : ""}`}
        // style={{
        //   backgroundColor:
        //     !visibility && currentRoute === "/" ? "none" : "#feefc3",
        // }}
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
        // style={{
        //   backgroundColor:
        //     !visibility && currentRoute === "/barchart"
        //       ? "transparent"
        //       : "#feefc3",
        // }}
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
    </div>
  );
}

export default Navbar;
