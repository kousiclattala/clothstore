import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import colors from "../utils/colors";
import HomeScreen from "./HomeScreen";
import OrderScreen from "./OrderScreen";
import ProductsScreen from "./ProductsScreen";

function MainScreen() {
  const { selected } = useSelector((state) => state.auth);

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <SideMenu />

        <div
          className="d-flex w-100"
          style={{
            backgroundColor: colors.secondaryLight,
          }}
        >
          {selected === "home" ? (
            <HomeScreen />
          ) : selected === "products" ? (
            <ProductsScreen />
          ) : (
            <OrderScreen />
          )}
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
