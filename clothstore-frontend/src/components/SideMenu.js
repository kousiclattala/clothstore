import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserSelected } from "../redux/AuthSlice";
import colors from "../utils/colors";

function SideMenu() {
  const [selected, setSelected] = useState("home");

  const dispatch = useDispatch();

  return (
    <div
      className="vh-100"
      style={{
        width: "18%",
        backgroundColor: colors.primary,
        paddingTop: "10%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: selected === "home" ? colors.white : null,
          paddingLeft: "18%",
        }}
        onClick={() => {
          setSelected("home");
          dispatch(setUserSelected("home"));
        }}
      >
        <i
          class="bi-house-door"
          style={{
            fontSize: "2rem",
            color: selected === "home" ? colors.primary : colors.white,
          }}
        ></i>
        <p
          style={{
            color: selected === "home" ? colors.primary : colors.white,
            fontSize: "22px",
            alignSelf: "center",
            paddingLeft: "15px",
            marginTop: "14px",
            textTransform: "uppercase",
          }}
        >
          Home
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: selected === "products" ? colors.white : null,
          paddingLeft: "18%",
          marginTop: "5%",
        }}
        onClick={() => {
          setSelected("products");
          dispatch(setUserSelected("products"));
        }}
      >
        <i
          class="bi bi-file-earmark-text"
          style={{
            fontSize: "2rem",
            color: selected === "products" ? colors.primary : colors.white,
          }}
        ></i>
        <p
          style={{
            color: selected === "products" ? colors.primary : colors.white,
            fontSize: "22px",
            alignSelf: "center",
            paddingLeft: "15px",
            marginTop: "14px",
            textTransform: "uppercase",
          }}
        >
          Products
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: selected === "orders" ? colors.white : null,
          paddingLeft: "18%",
          marginTop: "5%",
        }}
        onClick={() => {
          setSelected("orders");
          dispatch(setUserSelected("orders"));
        }}
      >
        <i
          class="bi bi-shop"
          style={{
            fontSize: "2rem",
            color: selected === "orders" ? colors.primary : colors.white,
          }}
        ></i>
        <p
          style={{
            color: selected === "orders" ? colors.primary : colors.white,
            fontSize: "22px",
            alignSelf: "center",
            paddingLeft: "15px",
            marginTop: "14px",
            textTransform: "uppercase",
          }}
        >
          Orders
        </p>
      </div>
    </div>
  );
}

export default SideMenu;
