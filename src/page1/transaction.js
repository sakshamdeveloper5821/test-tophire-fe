import React, { useState } from "react";
import { Button, Form, Input, Radio } from "antd";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";

const Transaction = () => {
  const [type, setType] = useState();
  const [balance, setBalance] = useState({});
  const onFinish = (values) => {
    const amount = values.amount;
    const description = values.description;
    const id = localStorage.getItem("id");
    if (!type) {
      alert("select any type");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}transact/${id}`, {
        amount: Number(amount),
        description,
        type,
      })
      .then((data) => {
        alert(" wallet updated successfully ");
        walletbalance();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
  const toggleDisplay = (e) => {
    setType(e.target.value);
  };
  const walletbalance = (e) => {
    const id = localStorage.getItem("id");
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}wallet/${id}`, {})
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setBalance(response.data.data);
        }
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="container">
      <div className="balance">
        {" "}
        <Button onClick={walletbalance}>Wallet Balance</Button>
        {balance?.name && (
          <div>
            {" "}
            <p>Name: {balance?.name}</p>
            <p>Balance: {balance?.balance}</p>
          </div>
        )}
      </div>

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
          label="Transaction Amount"
          name="amount"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Radio.Group
          className="radiobutton"
          onChange={toggleDisplay}
          value={type}
        >
          <Radio value={"credit"}>Credit</Radio>
          <Radio value={"debit"}>Debit</Radio>
        </Radio.Group>

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
      <Link className="link" to="/transaction-details">
        Transaction details
      </Link>
    </div>
  );
};
export default Transaction;
