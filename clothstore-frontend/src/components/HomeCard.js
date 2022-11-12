import React from "react";
import colors from "../utils/colors";

function HomeCard({ title, value }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "250px",
        height: "8%",
        backgroundColor: colors.white,
        borderRadius: 10,
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: "50px",
      }}
    >
      <p
        style={{
          color: colors.primary,
          fontSize: "22px",
          fontWeight: "500",
          paddingLeft: "5%",
        }}
      >
        {title}
      </p>
      <p
        style={{
          color: colors.primary,
          fontSize: "22px",
          fontWeight: "500",
          paddingRight: "5%",
        }}
      >
        {value}
      </p>
    </div>
  );
}

export default HomeCard;
