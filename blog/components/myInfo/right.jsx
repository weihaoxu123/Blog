import React, { Component } from "react";
import { Avatar, Divider } from "antd";
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
