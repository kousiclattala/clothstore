import React, { useState } from "react";
import colors from "../utils/colors";
import AddProduct from "./AddProduct";

function ProductsScreen() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div
      className="h-50"
      style={{
        marginTop: "10%",
        paddingLeft: "5%",
      }}
    >
      <div
        style={{
          width: "250px",
          height: "10%",
          backgroundColor: colors.secondary,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginBottom: 20,
          borderRadius: 10,
        }}
        onClick={() => {
          setModalShow(true);
        }}
      >
        <p
          style={{
            color: colors.white,
            fontSize: "20px",
            fontWeight: "600",
            textAlign: "center",
            alignSelf: "center",
            paddingTop: 10,
          }}
        >
          Add Product
        </p>
      </div>
      <div
        style={{
          backgroundColor: colors.white,
        }}
      >
        <table
          class="table table-striped jusify-content-center align-items-center"
          style={{
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Quantity</th>
              <th scope="col">Stock</th>
              <th scope="col">Rating</th>
              <th
                scope="col"
                style={{
                  width: "15%",
                }}
              >
                Created By
              </th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((item) => (
              <tr>
                <th scope="row">{item}</th>
                <td
                  style={{
                    width: "250px",
                  }}
                >
                  <p>Men Hoodie</p>
                </td>
                <td
                  style={{
                    width: "75px",
                  }}
                >
                  <p>499</p>
                </td>
                <td
                  style={{
                    width: "75px",
                  }}
                >
                  <p>Male</p>
                </td>
                <td
                  style={{
                    width: "75px",
                  }}
                >
                  <p>20</p>
                </td>
                <td
                  style={{
                    width: "75px",
                  }}
                >
                  <p>20</p>
                </td>
                <td
                  style={{
                    width: "75px",
                  }}
                >
                  <p>4.5</p>
                </td>
                <td>
                  <p
                    style={{
                      width: "2em",
                      height: "2em",
                      backgroundColor: colors.primary,
                      borderRadius: 100,
                      color: colors.white,
                      textAlign: "center",
                      alignSelf: "center",
                    }}
                  >
                    A
                  </p>
                </td>
                <td
                  style={{
                    width: "150px",
                  }}
                >
                  <i
                    className="bi bi-pencil"
                    style={{
                      paddingRight: 10,
                    }}
                  />
                  <i
                    className="bi bi-eye"
                    style={{
                      paddingRight: 10,
                    }}
                  />
                  <i
                    className="bi bi-trash"
                    style={{
                      paddingRight: 10,
                      color: "#ff0000",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <AddProduct
          show={modalShow}
          onClick={() => {
            setModalShow(false);
          }}
        />
      </div>
    </div>
  );
}

export default ProductsScreen;
