import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPasswordPage.css"
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Request OTP, Step 2: Enter OTP and Reset Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // Step 1: Request OTP
  const requestOtpHandler = async (values) => {
    try {
      setLoading(true);
      const { email } = values;
      await axios.post("/users/forgot-password", { email }); // Send email to backend to send OTP
      setEmail(email);
      setLoading(false);
      message.success("OTP has been sent to your email.");
      setStep(2); // Move to Step 2: OTP Verification
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong while sending OTP.");
    }
  };

  // Step 2: Verify OTP and Reset Password
  const resetPasswordHandler = async (values) => {
    try {
      setLoading(true);
      const { otp, newPassword } = values;

      // Send OTP and new password to backend for verification and reset
      await axios.post("/users/reset-password", { otp, email, newPassword });

      setLoading(false);
      message.success("Password reset successful.");
      navigate("/login"); // Redirect to login after password reset
    } catch (error) {
      setLoading(false);
      message.error("Invalid OTP or something went wrong.");
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        {/* Step 1: Request OTP */}
        {step === 1 && (
          <Form layout="vertical" onFinish={requestOtpHandler}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input type="email" required />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
              Send OTP
            </Button>
          </Form>
        )}

        {/* Step 2: Enter OTP and New Password */}
        {step === 2 && (
          <Form layout="vertical" onFinish={resetPasswordHandler}>
            <Form.Item
              label="Enter OTP"
              name="otp"
              rules={[{ required: true, message: "Please input the OTP!" }]}
            >
              <Input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
                {
                  min: 6,
                  message: "Password must be at least 6 characters long",
                },
              ]}
            >
              <Input.Password
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
              Reset Password
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
