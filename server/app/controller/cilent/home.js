"use strict";
const Controller = require("egg").Controller;
class HomeController extends Controller {
  async index() {
    let result = await this.app.mysql.get("blog_content", {});
    console.log(result);
    this.ctx.body = result;
  }
  async getArticleList() {
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.id " +
      "WHERE type_id=1";
    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results
    };
  }
  async getThoughtList() {
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.id " +
      "WHERE type_id=2";
    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results
    };
  }
  async getArticleById() {
    //先配置路由的动态传值，然后再接收值
    let id = this.ctx.request.query.id;
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.content as content," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName ," +
      "type.id as typeId " +
      "FROM article LEFT JOIN type ON article.type_id = type.id " +
      "WHERE article.id=" +
      id;

    const result = await this.app.mysql.query(sql);

    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;
