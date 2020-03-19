import React, { useState } from "react";
import "../static/style/pages/cover.css";
import "highlight.js/styles/monokai-sublime.css";
import { Avatar } from "antd";
const Home = list => {
  return (
    <div>
      <div className="selection">
        <Avatar
          className="profile"
          size={200}
          src="https://biaochenxuying.cn/img/userLogo.9d2c524d.jpeg"
        />
        <div className="list">
          <a href="/article">Resume</a>
          <a href="/article">Article</a>
          <a href="/article">Github</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
