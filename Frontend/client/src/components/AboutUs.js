import React from "react";
import { Layout, Typography, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import "../styles/AboutUs.css"; // Ensure you create this CSS file for styling

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const AboutUs = () => {
  return (
    <Layout className="about-layout">
      <Content className="about-content">
        <div className="about-container">
          <Title level={1} className="about-title">About Us</Title>
          <Row gutter={[16, 16]} className="about-row">
            <Col span={24}>
              <Paragraph className="about-text">
                Budget Buddy is your personal finance assistant, designed to help you track and manage your finances effortlessly. We believe that budgeting should be simple, intuitive, and accessible to everyone. Whether you’re a student, a professional, or anyone looking to improve their financial habits, Budget Buddy is here to help you stay on top of your finances.
              </Paragraph>
            </Col>
            <Col span={24}>
              <Title level={2} className="about-subtitle">Our Mission</Title>
              <Paragraph className="about-text">
                Our mission is to empower individuals to take control of their financial future. With features such as expense tracking, budget planning, and goal setting, we aim to provide tools that help you make informed financial decisions.
              </Paragraph>
            </Col>
            <Col span={24}>
              <Button type="primary" size="large" className="about-button">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </Col>
            {/* New Button to go back to Dashboard */}
            <Col span={24}>
              <Button type="primary" size="large" className="about-button">
                <Link to="/">Back to Dashboard</Link>
              </Button>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default AboutUs;
