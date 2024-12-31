import React, { useState, useEffect } from "react";
import { Form, Input, message, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/RegisterPage.css";

// Password strength checker component
const PasswordStrengthChecker = ({ password }) => {
  const [strength, setStrength] = useState({
    length: false,
    upperCase: false,
    lowerCase: false,
    number: false,
    specialChar: false,
  });

  useEffect(() => {
    setStrength({
      length: password.length >= 12 && password.length <= 15,
      upperCase: /[A-Z]/.test(password),
      lowerCase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  return (
    <div className="password-strength-checker">
      <div className={`rule ${strength.length ? "valid" : "invalid"}`}>
        <div className="rule-indicator"></div>
        <span>Length: 12-15 characters</span>
      </div>
      <div className={`rule ${strength.upperCase ? "valid" : "invalid"}`}>
        <div className="rule-indicator"></div>
        <span>Uppercase letter</span>
      </div>
      <div className={`rule ${strength.lowerCase ? "valid" : "invalid"}`}>
        <div className="rule-indicator"></div>
        <span>Lowercase letter</span>
      </div>
      <div className={`rule ${strength.number ? "valid" : "invalid"}`}>
        <div className="rule-indicator"></div>
        <span>Number</span>
      </div>
      <div className={`rule ${strength.specialChar ? "valid" : "invalid"}`}>
        <div className="rule-indicator"></div>
        <span>Special character</span>
      </div>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

  // Function to check password validity
  const checkPasswordStrength = (password) => {
    const length = password.length >= 12 && password.length <= 15;
    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    const number = /\d/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setPasswordValid(length && upperCase && lowerCase && number && specialChar);
  };

  // Submit handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
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

  // Check password strength on every password change
  useEffect(() => {
    checkPasswordStrength(password);
  }, [password]);

  return (
    <div className="register-page">
      {loading && <Spinner />}
      <div className="register-container">
        <Form className="register-form" layout="vertical" onFinish={submitHandler}>
          <h2>Create Your Account</h2>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input type="text" placeholder="Enter your name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}>
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Track password input
            />
          </Form.Item>

          {/* Password strength checker */}
          <PasswordStrengthChecker password={password} />

          <div className="d-flex justify-content-between">
            <Link to="/login" className="login-link">
              Already registered? Login here!
            </Link>
            {/* Disable the register button if the password is invalid */}
            <Button type="primary" htmlType="submit" disabled={!passwordValid} className="btn-register">
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
