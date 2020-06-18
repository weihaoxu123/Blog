import React, { useState } from "react";
import "./cover.css";
import "highlight.js/styles/monokai-sublime.css";
import { Avatar, Row, Col, Card } from "antd";
import { GithubOutlined, EditOutlined, BulbOutlined } from "@ant-design/icons";
const Home = (list) => {
  return (
    <div>
      <Row>
        <Col xs={{ span: 0 }} lg={{ span: 8 }}></Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <div class="cover">
            <Avatar
              className="profile"
              size={200}
              src="../../static/style/WechatIMG224.jpeg"
            />
          </div>
          <div class="text">
            <Card>
              <h1>Hi there!</h1>
              <h2>This is Weihao, a software engineer based in Los Angeles</h2>
              <h2>
                Want to learn more? Why not click one of the buttons below!
              </h2>
            </Card>
          </div>
          <div class="ButtonGroup">
            <Row>
              <Col span={8}>
                <a href="/resume">
                  {" "}
                  <BulbOutlined />
                  Resume
                </a>
              </Col>
              <Col span={8}>
                <a href="/article">
                  <EditOutlined />
                  Blog
                </a>
              </Col>
              <Col span={8}>
                <a href="https://github.com/weihaoxu123">
                  {" "}
                  <GithubOutlined />
                  Github
                </a>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={{ span: 0 }} lg={{ span: 8 }}></Col>
      </Row>
    </div>
  );
};

export default Home;
