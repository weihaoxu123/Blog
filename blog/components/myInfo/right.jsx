import React, { Component } from "react";
import { Avatar, Divider } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "./style.css";
class MyInfo extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="author-div comm-box">
          <div>
            <Avatar
              size={100}
              src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=264691766,907879248&fm=26&gp=0.jpg"
            />
          </div>
          <div className="author-introcution">
            Random Words
            <Divider>How to contact</Divider>
            <div>
              <HomeOutlined /> 501 S New Hampshire Ave, Los Angeles, CA, US,
              90020
            </div>
            <div>
              <MailOutlined /> weihaoxu@usc.edu
            </div>
            <div>
              <LinkedinOutlined />
              <a href="https://www.linkedin.com/in/weihao-xu-ba3768194/">
                LinkedIn Click Here
              </a>
            </div>
            <div>
              <PhoneOutlined /> 213-536-3424
            </div>
          </div>
        </div>
        {/* <div className="tag">
          <div className="title">tag</div>
        </div> */}
      </div>
    );
  }
}

export default MyInfo;
