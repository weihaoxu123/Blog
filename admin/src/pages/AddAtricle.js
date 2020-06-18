import React, { useState, useEffect } from "react";
import marked from "marked";
import "../static/css/AddAtricle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import moment from "moment";
const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
  const token = localStorage.getItem("token");
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false
  });
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [typeName, setTypeName] = useState();
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(1);
  const changeContent = e => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = e => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };
  const getTypeInfo = () => {
    axios({
      method: "get",
      url: servicePath.getTypeInfo,
      headers: {
        Authorization: `${token}`
      }
    }).then(res => {
      if (res.data.data == "没有登录") {
        localStorage.removeItem("openId");
        props.history.push("/");
      } else {
        setTypeInfo(res.data.data);
      }
    });
  };
  const selectTypeHandler = value => {
    setSelectType(value);
  };
  const draftArticle = () => {
    console.log(typeName);

    localStorage.setItem("title", articleTitle);
    localStorage.setItem("content", articleContent);
    localStorage.setItem("introduce", introducemd);
    localStorage.setItem("type", typeName);
    localStorage.setItem("date", showDate);
    localStorage.setItem("typeId", selectedType);
  };
  const saveArticle = () => {
    if (!selectedType) {
      message.error("必须选择文章类别");
      return false;
    } else if (!articleTitle) {
      message.error("文章名称不能为空");
      return false;
    } else if (!articleContent) {
      message.error("文章内容不能为空");
      return false;
    } else if (!introducemd) {
      message.error("简介不能为空");
      return false;
    } else if (!showDate) {
      message.error("发布日期不能为空");
      return false;
    }
    message.success("检验通过");
    let dataProps = {}; //传递到接口的参数
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.content = articleContent;
    dataProps.introduce = introducemd;
    let datetext = showDate.replace("-", "/"); //把字符串转换成时间戳
    dataProps.addTime = new Date(datetext).getTime() / 1000;

    if (!props.match.params.id) {
      dataProps.view_count = Math.ceil(Math.random() * 100) + 1000;
      axios({
        method: "post",
        url: servicePath.addArticle,
        data: dataProps,
        headers: {
          Authorization: `${token}`
        }
      }).then(res => {
        setArticleId(res.data.insertId);
        if (res.data.isScuccess) {
          // localStorage.clear();
          message.success("文章发布成功");
        } else {
          draftArticle();
          console.log("save");

          localStorage.setItem("draft", true);
          props.history.push("/");
          message.error("文章保存失败");
        }
      });
    } else {
      dataProps.id = articleId;
      axios({
        method: "post",
        url: servicePath.updateArticle,
        headers: {
          Authorization: `${token}`
        },
        data: dataProps
      }).then(res => {
        if (res.data.isScuccess) {
          // localStorage.clear();
          message.success("文章保存成功");
        } else {
          draftArticle();
          localStorage.setItem("draft", true);
          localStorage.setItem("id", articleId);
          props.history.push("/");
          message.error("保存失败");
        }
      });
    }
  };
  const getArticleById = id => {
    axios(servicePath.getArticleById + id, {
      headers: {
        Authorization: `${token}`
      }
    }).then(res => {
      setArticleTitle(res.data.data[0].title);
      setTypeName(res.data.data[0].typeName);

      setArticleContent(res.data.data[0].content);
      let html = marked(res.data.data[0].content);
      setMarkdownContent(html);
      setIntroducemd(res.data.data[0].introduce);
      let tmpInt = marked(res.data.data[0].introduce);
      setIntroducehtml(tmpInt);
      setShowDate(res.data.data[0].addTime);

      setSelectType(res.data.data[0].typeId);
    });
  };
  const fillDraft = () => {
    setArticleTitle(localStorage.getItem("title"));
    setTypeName(localStorage.getItem("type"));
    setArticleContent(localStorage.getItem("content"));
    let html = marked(localStorage.getItem("content"));
    setMarkdownContent(html);
    setIntroducemd(localStorage.getItem("introduce"));
    let tmpInt = marked(localStorage.getItem("introduce"));
    setIntroducehtml(tmpInt);
    setShowDate(localStorage.getItem("date"));
    setSelectType(localStorage.getItem("typeId"));
  };
  useEffect(() => {
    getTypeInfo();
    let tmpId = props.match.params.id;
    setArticleId(tmpId);
    if (localStorage.getItem("draft") == "true") {
      localStorage.setItem("draft", 0);
      fillDraft();
      localStorage.removeItem("id");
    } else if (tmpId) {
      getArticleById(tmpId);
    }
  }, []);
  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                placeholder="博客标题"
                size="large"
                onChange={e => {
                  setArticleTitle(e.target.value);
                }}
                value={articleTitle}
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select
                defaultValue={typeName}
                key={typeName}
                size="large"
                onChange={selectTypeHandler}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.id}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                onChange={changeContent}
                onPressEnter={changeContent}
                value={articleContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large" onClick={draftArticle}>
                暂存文章
              </Button>
              &nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>
                发布文章
              </Button>
              <br />
              <br />
              <TextArea
                rows={4}
                placeholder="文章简介"
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
                value={introducemd}
              />
              <br />
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  size="large"
                  value={moment(showDate)}
                  onChange={(date, dateString) => setShowDate(dateString)}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default AddArticle;

