import React, { Component } from "react";
import { Row, Col, Breadcrumb, Affix } from "antd";
import "../static/style/pages/detail.css";
import Footer from "../components/footer/footer";
import Right from "../components/myInfo/right";
import NavBar from "../components/header/header";
import Tocify from "../components/tocify.tsx";
import servicePath from "../config/apiURL";
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from "@ant-design/icons";
import "markdown-navbar/dist/navbar.css";
import axios from "axios";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
const Detail = props => {
  // callAPI() {
  //   fetch("http://localhost:3001/testApi")
  //     .then(res => res.text())
  //     .then(res => this.setState({ apiResponse: res }));
  // }

  // componentWillMount() {
  //   this.callAPI();
  // }

  let markdown =
    "# P01:课程介绍和环境搭建\n" +
    "[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n" +
    "> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n" +
    "**这是加粗的文字**\n\n" +
    "*这是倾斜的文字*`\n\n" +
    "***这是斜体加粗的文字***\n\n" +
    "~~这是加删除线的文字~~ \n\n" +
    "`console.log(111)` \n\n" +
    "# p02:来个Hello World 初始Vue3.0\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n" +
    "***\n\n\n" +
    "# p03:Vue3.0基础知识讲解\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n\n" +
    "# p04:Vue3.0基础知识讲解\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n\n" +
    "#5 p05:Vue3.0基础知识讲解\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n\n" +
    "# p06:Vue3.0基础知识讲解\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n\n" +
    "# p07:Vue3.0基础知识讲解\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n\n" +
    "``` var a=11; ```";
  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });
  const tocify = new Tocify();
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  let html = marked(props.content);
  return (
    <div>
      <NavBar />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">{props.title}</div>

              <div className="list-icon center">
                <span>
                  <CalendarOutlined /> {props.addTime}
                </span>
                <span>
                  <FolderOutlined /> {props.typeName}
                </span>
                <span>
                  <FireOutlined /> {props.view_count}人
                </span>
              </div>

              <div
                className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}
              ></div>
            </div>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Right />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">{tocify && tocify.render()}</div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

Detail.getInitialProps = async context => {
  // console.log("ffff" + context.query.id);
  let id = context.query.id;
  // console.log(servicePath.getArticleById);
  const promise = new Promise(resolve => {
    axios(servicePath.getArticleById + "?id=" + id).then(res => {
      console.log(res.data.data[0]);
      resolve(res.data.data[0]);
    });
  });

  return await promise;
};

export default Detail;
