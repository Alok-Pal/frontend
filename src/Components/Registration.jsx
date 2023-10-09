import React, { useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./Registration";
import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../Redux/Action/userAction";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Registration = () => {
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
    dispatch(registerAction(values)).then((res) => {
      if (res?.type === "registerAction/fulfilled") {
        navigate("/");
      }else{
        if(res?.payload?.message ==="User already existed " ){
            toast.error("User Already exist",'error');
        }
      }
    });
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center bg-image"
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
        height: "100vh",
      }}
    >
      <div className="mask gradient-custom-3"></div>
      <MDBCard className="m-5" style={{ maxWidth: "900px" }}>
        <MDBCardBody className="px-5" style={{ width: "600px" }} >
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <Form
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              className="mt-5"
              name="name"
              label="Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:"
              rules={[{ required: true }]}
            >
              <Input size="large" />
            </Form.Item>
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
              rules={[
                {
                  required: true,
                  message: "Please enter a password!",
                },
                {
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message:
                    "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long",
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item
              className="mt-5"
              name="role"
              label="Role &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:"
              rules={[{ required: true }]}
            >
              <Select
                defaultValue="select"
                style={{ width: 120 }}
                //   onChange={handleChange}
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "user", label: "User" },
                ]}
              />
            </Form.Item>

            <Form.Item>
              <div className="text-center text-md-start pt-2 ">
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "#3B71CA", width: "30%" }}
                >
                  {state?.register?.isLoading ? (
                    <img
                      src="assets/gifs/loading-black.gif"
                      className=" w-[50px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
                    />
                  ) : (
                    "register"
                  )}
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  have an account?{" "}
                  <a href="/" className="link-danger">
                    Login
                  </a>
                </p>
              </div>
            </Form.Item>
          </Form>
          {/* <div className="d-flex flex-row justify-content-center mb-4">
            <MDBCheckbox
              name="flexCheck"
              id="flexCheckDefault"
              label="I agree all statements in Terms of service"
            />
          </div>
          <MDBBtn className="mb-4 w-100 gradient-custom-4" size="lg">
            Register
          </MDBBtn> */}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Registration;
