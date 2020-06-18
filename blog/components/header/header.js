import React, { Component } from "react";
import Router from "next/router";
import { Row, Col, Menu } from "antd";
import {
  HomeOutlined,
  TrophyOutlined,
  SmileOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./style.css";

class NavbarPage extends Component {
  render() {
    const handleClick = (e) => {
      if (e.key == "home") {
        Router.push("/");
      } else if (e.key == "other") {
        Router.push("/thought");
      }
    };
    return (
      <div className="header">
        <Row type="flex" justify="center">
          <Col xs={20} sm={20} md={16} lg={10} xl={8}>
            <span className="header-logo">Weihao's Blog</span>
            <span className="header-text"></span>
          </Col>
          <Col className="Menu" xs={4} sm={4} md={7} lg={10} xl={10}>
            <Menu mode="horizontal" onClick={handleClick}>
              <Menu.Item key="home">
                <HomeOutlined />
                Home
              </Menu.Item>
              <Menu.Item key="article" onClick={() => Router.push("/article")}>
                <FolderOutlined />
                Coding
              </Menu.Item>
              <Menu.Item key="other" onClick={() => Router.push("/thought")}>
                <SmileOutlined />
                Thought
              </Menu.Item>
              <Menu.Item key="Easter-egg">
                <TrophyOutlined />
                Extra
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NavbarPage;
