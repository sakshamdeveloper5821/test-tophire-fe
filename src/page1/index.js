import React from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import "./login.css";

const User = () => {
  const onFinish = (values) => {
    const name = values.name;
    const balance = values.balance || 0;
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}setup`, {
        name,
        balance,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Wallet is Created");
          window.localStorage.setItem("id", response.data.id);
          window.location.href = "/transfer-amount";
        }
      })
      .catch((error) => {
        alert(error.response.data.message)
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="container">
      <Form
        name="basic"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 4,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item label="Initial Balance" name="balance">
          <Input/>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default User;
