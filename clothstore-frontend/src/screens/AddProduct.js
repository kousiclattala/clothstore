import React from "react";
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import colors from "../utils/colors";
import "../App.css";

function AddProduct({ onClick, show }) {
  return (
    <>
      <Modal show={show} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row
              style={{
                marginTop: "3%",
              }}
            >
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="Name" />
                </FloatingLabel>
              </Col>
              <Col>
                <div class="mb-3">
                  <input
                    className="form-control h-50"
                    type="file"
                    id="formFile"
                    placeholder="Choose Images"
                  />
                </div>
              </Col>
            </Row>
            <Row
              style={{
                marginTop: "3%",
              }}
            >
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Category"
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="Men/Women/Other" />
                </FloatingLabel>
                <Row
                  style={{
                    marginTop: "5%",
                  }}
                >
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Price"
                      className="mb-3"
                    >
                      <Form.Control type="number" placeholder="0" />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Quantity"
                      className="mb-3"
                    >
                      <Form.Control type="number" placeholder="0" />
                    </FloatingLabel>
                  </Col>
                </Row>
              </Col>
              <Col>
                <div class="mb-3">
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="6"
                    placeholder="Enter Description"
                  ></textarea>
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{
              width: "165px",
              height: "50px",
              backgroundColor: colors.white,
              borderWidth: 0.5,
              borderColor: colors.primary,
              color: colors.primary,
            }}
            onClick={onClick}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            style={{
              width: "165px",
              height: "50px",
              backgroundColor: colors.secondary,
              borderWidth: 0.5,
              borderColor: colors.secondary,
              color: colors.white,
            }}
            onClick={onClick}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProduct;
