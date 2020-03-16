import React, { useState } from "react";
import { CalendarOutlined, FireOutlined } from "@ant-design/icons";
import { Row, Col, Breadcrumb, List, Icon } from "antd";
import Header from "../components/header/header";
import MyInfo from "../components/myInfo/right";
import Footer from "../components/footer/footer";
import axios from "axios";
import Link from "next/link";
import "../static/style/pages/index.css";
import servicePath from "../config/apiURL";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
const Home = list => {
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
    sanitize: false,
    xhtml: false,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });
  const [mylist, setMylist] = useState(list.data);
  return (
    <div>
      <Header />
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
                  <div className="list-title">
                    <Link
                      href={{ pathname: "/detail", query: { id: item.id } }}
                    >
                      <a href={"/detail?id="+item.id}>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span>
                      <CalendarOutlined /> {item.addTime}
                    </span>
                    <span>
                      <CalendarOutlined />
                      {item.typeName}
                    </span>
                    <span>
                      <FireOutlined />
                      {item.view_count}人
                    </span>
                  </div>
                  <div
                    className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                  >
                    {/* {item.introduce} */}
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col className="main-page-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <MyInfo />
        </Col>
      </Row>
      <Footer/>
    </div>
  );
};
Home.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    axios(servicePath.getArticleList).then(res => {
      // console.log("远程获取数据结果:", res.data.data);
      // this.setState({ data: res.data.data });
      resolve(res.data);
    });
  });

  return await promise;
};

export default Home;