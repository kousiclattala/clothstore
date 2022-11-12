import React from "react";
import HomeCard from "../components/HomeCard";
import colors from "../utils/colors";

function HomeScreen() {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
        paddingLeft: "5%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <HomeCard title={"Users"} value={"50"} />
        <HomeCard title={"Products"} value={"50"} />
        <HomeCard title={"Orders"} value={"50"} />
      </div>
    </div>
  );
}

export default HomeScreen;
