import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined, EditOutlined, CameraOutlined } from "@ant-design/icons";
import { message, Button, Avatar, Typography, Dropdown, Menu, Modal, Input } from "antd";
import { useState as useCustomState } from "react";
import "../../styles/HeaderStyles.css";

const Header = () => {
  const [loginUser, setLoginUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useCustomState(false);
  const [newName, setNewName] = useCustomState(loginUser ? loginUser.name : "");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };

  const handleMenuClick = (e) => {
    if (e.key === "changeName") {
      setIsModalVisible(true); // Open modal for name change
    } else if (e.key === "addPhoto") {
      message.info("Feature coming soon!");
    }
  };

  const handleOk = () => {
    if (newName.trim()) {
      const updatedUser = { ...loginUser, name: newName };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setLoginUser(updatedUser);
      message.success("Name updated successfully!");
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="addPhoto" icon={<CameraOutlined />}>
        Add Photo
      </Menu.Item>
      <Menu.Item key="changeName" icon={<EditOutlined />}>
        Change Name
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/">
            <span className="brand-text">Budget Buddy</span>
          </Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/about" className="nav-link btn-about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link btn-contact">
                Contact Us
              </Link>
            </li>

            {/* Goal Management Button - Styled Similarly to Contact Us */}
            {loginUser && (
              <li className="nav-item">
                <Link to="/goal" className="nav-link btn-goal-management">
                  Goal Management
                </Link>
              </li>
            )}

            {loginUser ? (
              <>
                <li className="nav-item d-flex align-items-center">
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <Avatar
                      icon={<UserOutlined />}
                      size="large"
                      className="me-2 avatar-img"
                    />
                  </Dropdown>
                  <Typography.Text className="user-name">{loginUser.name}</Typography.Text>
                </li>
                <li className="nav-item ms-3">
                  <Button
                    type="primary"
                    danger
                    onClick={logoutHandler}
                    className="btn-logout"
                  >
                    <LogoutOutlined /> Logout
                  </Button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="btn btn-light text-primary">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Modal for Name Change */}
      <Modal
        title="Change Your Name"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Input
          placeholder="Enter new name"
          value={newName}
          onChange={handleNameChange}
        />
      </Modal>
    </nav>
  );
};

export default Header;
