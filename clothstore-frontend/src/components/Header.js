import React from "react";
import colors from "../utils/colors";

function Header() {
  return (
    <div
      className="vw-100 fixed-top"
      style={{
        backgroundColor: colors.primary,
        height: "80px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: "50px",
      }}
    >
      <p
        style={{
          color: colors.white,
          paddingRight: "20px",
          textAlign: "center",
        }}
      >
        kousic@gmail.com
      </p>
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: 100,
          backgroundColor: colors.white,
        }}
      >
        <img
          src={require("../assets/user-1.jpg")}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: 100,
          }}
        />
      </div>
    </div>
  );
}

export default Header;
