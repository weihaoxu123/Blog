import React, { useState } from "react";
import { CalendarOutlined, FireOutlined } from "@ant-design/icons";
import { Row, Col, Breadcrumb, List, Icon } from "antd";
import Header from "../components/header/header";
import MusicPlayer from "../components/musicPlayer/musicPlayer";
import axios from "axios";
import Link from "next/link";
import "../static/style/pages/article.css";
import "../static/style/pages/comm.css";
import servicePath from "../config/apiURL";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
const Home = (list) => {
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
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });
  const [mylist, setMylist] = useState(list.data);
  return (
    <div>
      <Header />
      <Row className="main-page" type="flex" justify="center">
        <Col className="main-page-left" xs={24} sm={24} md={16} lg={15} xl={13}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">Home</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="/">Thought</a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <List
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={(item) => (
                <List.Item>
                  <div className="list-title">
                    <Link
                      href={{ pathname: "/detail", query: { id: item.id } }}
                    >
                      <a href={"/detail?id=" + item.id}>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span>
                      <CalendarOutlined /> {item.addTime}
                    </span>
                    <span>
                      &nbsp; &nbsp;
                      <FireOutlined />
                      {item.view_count} view
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
        <Col className="main-page-right" xs={0} sm={0} md={7} lg={5} xl={5}>
          <MusicPlayer />
        </Col>
      </Row>
    </div>
  );
};
Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getThoughtList).then((res) => {
      resolve(res.data);
    });
  });

  return await promise;
};

export default Home;
