let ipUrl = "http://127.0.0.1:7001/admin/";
const apiUrl = {
  checkLogin: ipUrl + "checkOpenId",
  getTypeInfo: ipUrl + "getTypeInfo",
  addArticle: ipUrl + "addArticle",
  getArticleList: ipUrl + "getArticleList",
  delArticle: ipUrl + "delArticle/",
  getArticleById: ipUrl + "getArticleById/",
  updateArticle: ipUrl + "updateArticle"
};
export default apiUrl;
