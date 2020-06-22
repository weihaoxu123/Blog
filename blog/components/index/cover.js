import React, { useState } from "react";
import "./cover.css";
import "highlight.js/styles/monokai-sublime.css";
import Header from "./landingHeader";
import { Row, Col, Menu, Dropdown } from "antd";

const Home = (list) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="/article">Blog</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="/resume">Resume</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="/resume">Github</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${"../static/style/007.jpg"})`,
      }}
    >
      <Header />
      <div class="intro">
        <div style={{ fontSize: "3vw", color: "white" }}>Weihao</div>
        <span style={{ fontSize: "4vw", color: "white" }}>
          Software Engineer
        </span>
        <div style={{ fontSize: "4vw", color: "white" }}>
          BackEnd | Full-Stack
        </div>
        <div style={{ fontSize: "4.5vw", color: "white" }}>
          Everyone has to start somewhere....
        </div>
      </div>
    </div>
  );
};

export default Home;
