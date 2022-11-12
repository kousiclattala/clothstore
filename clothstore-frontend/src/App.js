import logo from "./logo.svg";
import "./App.css";
import Signin from "./screens/Signin";
import ForgotPassword from "./screens/ForgotPassword";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import { Provider } from "react-redux";
import store from "./redux/store";
import MainScreen from "./screens/MainScreen";

function App() {
  return (
    <>
      <Provider store={store}>
        <MainScreen />
      </Provider>
    </>
  );
}

export default App;
