import React, { useState, useEffect, createContext } from "react";
import "antd/dist/antd.css";
import { Card, Input, Button, Spin, message } from "antd";
import { LoginOutlined, SecurityScanOutlined } from "@ant-design/icons";
import "../static/css/Login.css";
import axios from "axios";
import servicePath from "../config/apiUrl";
const openIdContext = createContext();
const Login = props => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {}, []);
  const checkLogin = () => {
    setIsLoading(true);

    if (!userName) {
      message.error("用户名不能为空");
      setIsLoading(false);
      return false;
    } else if (!password) {
      message.error("密码不能为空");
      setIsLoading(false);
      return false;
    }
    let dataProps = {
      userName: userName,
      password: password
    };
    axios({
      method: "post",
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: false
    }).then(res => {
      setIsLoading(false);
      if (res.data.data == "登录成功") {
        localStorage.setItem("token", res.data.token);
        if (
          localStorage.getItem("draft") == "true" &&
          localStorage.getItem("id") > 0
        ) {
          //still editing
          props.history.push("/index/add/" + localStorage.getItem("id"));
        } else {
          //new post
          props.history.push("/index");
        }
      } else {
        message.error("用户名密码错误");
      }
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card
          title="徐炜皓博客后台"
          bordered={true}
          style={{ width: 400 }}
        >
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<LoginOutlined style={{ color: "rgba(10,0,0,.25)" }} />}
            onChange={e => {
              setUserName(e.target.value);
            }}
          />
          <br />
          <br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={
              <SecurityScanOutlined style={{ color: "rgba(0,0,0,.25)" }} />
            }
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button type="primary" size="large" block onClick={checkLogin}>
            {" "}
            Login in{" "}
          </Button>
        </Card>
      </Spin>
    </div>
  );
};
export default Login;
