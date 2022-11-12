import React from "react";
import colors from "../utils/colors";

function Signin() {
  return (
    <div
      className="vh-100 d-flex"
      style={{
        backgroundColor: colors.primaryDark,
      }}
    >
      <div
        className="container"
        style={{
          backgroundColor: colors.secondary,
          height: "423px",
          width: "535px",
          marginTop: "55px",
          borderRadius: 10,
        }}
      >
        <div>
          <form>
            <div className="mb-3 mt-5 mx-5">
              <label
                for="exampleInputEmail1"
                className="form-label"
                style={{
                  fontWeight: "600",
                  fontSize: "20px",
                  color: colors.white,
                }}
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email Id"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                style={{
                  width: "424px",
                  height: "50px",
                  backgroundColor: colors.white,
                  borderRadius: "15px",
                  border: 0,
                }}
              />
            </div>
            <div className="mb-3 mt-5 mx-5">
              <label
                for="exampleInputPassword1"
                className="form-label"
                style={{
                  fontWeight: "600",
                  fontSize: "20px",
                  color: colors.white,
                }}
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                id="exampleInputPassword1"
                style={{
                  width: "424px",
                  height: "50px",
                  // left: "428px",
                  // marginTop: "162px",
                  backgroundColor: colors.white,
                  borderRadius: "15px",
                  border: 0,
                }}
              />
            </div>
            <p
              className="fs-6 mx-5"
              style={{
                fontWeight: "600",
                color: colors.white,
              }}
            >
              Forgot Password ?
            </p>
          </form>

          <button
            className="align-self-center"
            style={{
              width: "324px",
              height: "50px",
              marginLeft: "100px",
              marginTop: "139px",
              backgroundColor: colors.secondary,
              borderRadius: 15,
              borderWidth: 0,
              color: colors.white,
              fontSize: "24px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            SIGNIN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
