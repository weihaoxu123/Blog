import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import AdminIndex from "./AdminIndex";
import ArticleList from "./ArticleList";
function Main() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/index/" exact component={AdminIndex} />
      {/* <Route path="/index/add/" exact component={AdminIndex} /> */}
      {/* <Route path="/index/list/" component={ArticleList} /> */}
      <Route path="/index/add/" exact component={AdminIndex} />
      <Route path="/index/add/:id" exact component={AdminIndex} />
      <Route path="/index/list/" component={ArticleList} />
    </Router>
  );
}
export default Main;
