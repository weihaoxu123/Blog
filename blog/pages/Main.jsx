import React, { Component, useState } from "react";
// import Game from "./tic/fun";
import NavbarPage from "../components/header/header";
import { Row, Col, Breadcrumb, List } from "antd";
import "../static/style/pages/index.css";
import MyInfo from "../components/myInfo/right";
import Footer from "../components/footer/footer";
import axios from "axios";

// state = { data: "" };

const Article = list => {
  // Article.getInitialProps();
  // console.log(list);
  const [mylist, setMylist] = useState(list.data);
  return (
    <div>
      <NavbarPage />
      <Row className="main-page" type="flex" justify="center">
        <Col className="main-page-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="/">文章</a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <List
              // header={<div>日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">{item.title}</div>
                  <div className="list-context">{this.state.data.content}</div>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col className="main-page-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <MyInfo />
        </Col>
      </Row>
      <Footer />
    </div>
  );
};
Article.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    axios("http://127.0.0.1:7001/cilent/getArticleList").then(res => {
      console.log("远程获取数据结果:", res.data.data);
      // this.setState({ data: res.data.data });
      resolve(res.data);
    });
  });

  return await promise;
};

export default Article;
