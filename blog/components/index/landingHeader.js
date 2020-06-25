import React, { Component } from "react";
import Router from "next/router";
import { Row, Col, Menu, Dropdown } from "antd";
import {
  HomeOutlined,
  TrophyOutlined,
  GithubOutlined,
  FolderOutlined,
  MenuOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./../header/style.css";
import "./cover.css";

class NavbarPage extends Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={() => Router.push("/")}>
          Home
        </Menu.Item>
        <Menu.Item key="2" onClick={() => Router.push("/article")}>
          Blog
        </Menu.Item>
        <Menu.Item key="3" onClick={() => Router.push("/thought")}>
          Resume
        </Menu.Item>
        <Menu.Item key="3" onClick={() => Router.push("/article")}>
          Github
        </Menu.Item>
      </Menu>
    );
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
            <span className="logoText">Weihao Xu-徐炜皓</span>
          </Col>
          <Col className="Menu" xs={0} sm={0} md={7} lg={10} xl={10}>
            <Menu mode="horizontal" onClick={handleClick}>
              <Menu.Item key="home">
                <span class="headerText">
                  <HomeOutlined style={{ fontSize: "25px" }} />
                  Home
                </span>
              </Menu.Item>
              <Menu.Item key="article" onClick={() => Router.push("/article")}>
                <span class="headerText">
                  <FolderOutlined style={{ fontSize: "25px" }} />
                  Blog
                </span>
              </Menu.Item>
              <Menu.Item key="other" onClick={() => Router.push("/thought")}>
                <span class="headerText">
                  <EditOutlined style={{ fontSize: "25px" }} />
                  Resume
                </span>
              </Menu.Item>
              <Menu.Item key="Easter-egg">
                <span class="headerText">
                  <GithubOutlined style={{ fontSize: "25px" }} />
                  Github
                </span>
              </Menu.Item>
            </Menu>
          </Col>
          <Col
            xs={4}
            sm={4}
            lg={0}
            md={0}
            xl={0}
            style={{ paddingTop: "10px", paddingLeft: "10px" }}
          >
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
                style={{ fontSize: "30px", color: "#2a3a4a" }}
              >
                <MenuOutlined />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NavbarPage;
