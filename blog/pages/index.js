import React, { useState } from "react";
import { CalendarOutlined, FireOutlined } from "@ant-design/icons";
import { Row, Col, Breadcrumb, List, Icon } from "antd";
import Header from "../components/header/header";
import MyInfo from "../components/myInfo/right";
import Footer from "../components/footer/footer";
import axios from "axios";
import Link from "next/link";
import "highlight.js/styles/monokai-sublime.css";
import Cover from "./cover";
const styles = {
  paperContainer: {
    color: "red"
  }
};
const Home = list => {
  console.log(list);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${"../static/style/风景.gif"})`
      }}
    >
      <Cover />
    </div>
  );
};

export default Home;
