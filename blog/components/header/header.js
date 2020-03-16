import React, { Component } from "react";
import Router from "next/router";
import { Row, Col, Menu } from "antd";
import {
  HomeOutlined,
  TrophyOutlined,
  SmileOutlined,
  FolderOutlined
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./style.css";

class NavbarPage extends Component {
  render() {
    const handleClick = e => {
      if (e.key == "home") {
        Router.push("/");
      } else if (e.key == "other") {
        Router.push("/thought");
      }
    };
    return (
      <div className="header">
        <Row type="flex" justify="center">
          <Col xs={24} sm={24} md={16} lg={10} xl={8}>
            <span className="header-logo">炜皓的博客</span>
            <span className="header-text">名言</span>
          </Col>
          <Col className="Menu" xs={0} sm={0} md={7} lg={10} xl={10}>
            <Menu mode="horizontal" onClick={handleClick}>
              <Menu.Item key="home">
                <HomeOutlined />
                首页
              </Menu.Item>
              <Menu.Item key="article">
                <FolderOutlined />
                文章
              </Menu.Item>
              <Menu.Item key="other">
                <SmileOutlined />
                思绪
              </Menu.Item>
              <Menu.Item key="Easter-egg">
                <TrophyOutlined />
                彩蛋
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NavbarPage;
