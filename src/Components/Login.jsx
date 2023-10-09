/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Button, Form, Input, Select } from "antd";
import "./Login.css"; // Import the CSS file
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../Redux/Action/userAction";
import { useNavigate } from "react-router-dom";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const Login = () => {
  // to dispatch action
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      navigate("/table");
    }
  }, []);

  const state = useSelector((state) => state);

  const onFinish = (values) => {
    dispatch(loginAction(values)).then((res) => {
      if (res?.type === "login/fulfilled") {
        navigate("/table");
      }
    });
  };

  return (
    <>
      <MDBContainer fluid className="pt-3 ps-3 pe-3 mt-5 h-custom ">
        <MDBRow
          style={{
            minHeight: "80vh",
          }}
        >
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </MDBCol>

          <MDBCol col="4" md="6">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="lead fw-normal mb-0 me-3">Sign in with</p>

              <MDBBtn floating size="md" tag="a" className="me-2">
                <MDBIcon fab icon="facebook-f" />
              </MDBBtn>

              <MDBBtn floating size="md" tag="a" className="me-2">
                <MDBIcon fab icon="twitter" />
              </MDBBtn>

              <MDBBtn floating size="md" tag="a" className="me-2">
                <MDBIcon fab icon="linkedin-in" />
              </MDBBtn>
            </div>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>

            <Form
              name="control-hooks"
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
            >
              <Form.Item
                className="mt-5"
                name="email"
                label="Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                className="mt-5"
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                {/* <Input type="password" size="large" /> */}
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item>
                <div className="text-center text-md-start pt-2 mt-5">
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    style={{ backgroundColor: "#3B71CA", width: "20%" }}
                  >
                    {state?.login?.isLoading ? (
                      <img
                        src="assets/gifs/loading-black.gif"
                        className=" w-[50px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
                      />
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <p className="small fw-bold mt-2 pt-1 mb-2">
                    Don't have an account?{" "}
                    <a href="/registration" className="link-danger">
                      Register
                    </a>
                  </p>
                </div>
              </Form.Item>
            </Form>
          </MDBCol>
        </MDBRow>
        <MDBRow className="">
          <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
            <div className="text-white mb-3 mb-md-0">
              Copyright © 2020. All rights reserved.
            </div>

            <div>
              <MDBBtn
                tag="a"
                color="none"
                className="mx-3"
                style={{ color: "white" }}
              >
                <MDBIcon fab icon="facebook-f" size="md" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="mx-3"
                style={{ color: "white" }}
              >
                <MDBIcon fab icon="twitter" size="md" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="mx-3"
                style={{ color: "white" }}
              >
                <MDBIcon fab icon="google" size="md" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="mx-3"
                style={{ color: "white" }}
              >
                <MDBIcon fab icon="linkedin-in" size="md" />
              </MDBBtn>
            </div>
          </div>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Login;
