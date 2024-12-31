import React, { useState } from "react";
import { Layout, Form, Input, Button, Typography, message, Row, Col } from "antd";
import "../styles/ContactUs.css"; // Ensure you create this CSS file for styling

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Creating a reference to the form

  // Handle form submission
  const handleFormSubmit = (values) => {
    const { name, email, message: userMessage } = values;
    
    // Start loading state
    setLoading(true);

    // Simulate an API call or form submission process
    setTimeout(() => {
      setLoading(false);
      
      // Show success message with user's name
      message.success(`Your message has been sent to the admin. Thank you for your valuable time, ${name}!`);

      // Reset form after submission
      form.resetFields(); // Reset all form fields to their initial state
    }, 1000);
  };

  return (
    <Layout className="contact-layout">
      <Content className="contact-content">
        <div className="contact-container">
          <Title level={1} className="contact-title">Contact Us</Title>
          <Row gutter={[16, 16]} className="contact-row">
            <Col span={24}>
              <Paragraph className="contact-text">
                Have any questions or suggestions? We'd love to hear from you. Please fill out the form below, and we will get back to you as soon as possible.
              </Paragraph>
            </Col>
            <Col span={24}>
              <Form
                name="contact-form"
                form={form} // Connect the form instance to this form
                layout="vertical"
                onFinish={handleFormSubmit}
                initialValues={{
                  remember: true,
                }}
              >
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your name!",
                    },
                  ]}
                >
                  <Input placeholder="Your full name" />
                </Form.Item>

                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please enter a valid email address!",
                    },
                  ]}
                >
                  <Input placeholder="Your email address" />
                </Form.Item>

                <Form.Item
                  label="Message"
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your message!",
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="Your message" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size="large"
                    className="contact-button"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default ContactUs;
