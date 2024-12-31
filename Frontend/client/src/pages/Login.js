import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/Loginpage.css";

const Login = () => {
  const img =
    "https://images.unsplash.com/photo-1593538312308-d4c29d8dc7f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("Login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  // Redirect if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  // Handling the form submission with validation
  const onFinishFailed = () => {
    message.error("Please enter both email and password to login!");
  };

  return (
    <div className="login-page">
      {loading && <Spinner />}
      <div className="login-container">
        <div className="col-md-6 image-container">
          <img src={img} alt="login-img" width="100%" height="100%" />
        </div>
        <div className="col-md-4 login-form">
          <Form
            layout="vertical"
            onFinish={submitHandler}
            onFinishFailed={onFinishFailed}
            initialValues={{ email: "", password: "" }}
            validateMessages={{
              required: "${label} is required!",
            }}
          >
            <h1>Login Form</h1>

            {/* Email Field */}
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input type="email" />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between">
              <Link to="/register" className="register-link">
                Not a user? Click here to register!
              </Link>
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
              <button className="btn-login" type="submit">
                Login
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
