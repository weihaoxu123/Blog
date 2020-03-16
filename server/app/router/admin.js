module.exports = app => {
  const { router, controller } = app;
  var adminauth = app.middleware.adminauth();
  router.get("/admin/index", controller.back.main.index);
  router.post("/admin/checkOpenId", controller.back.main.checkLogin);
  router.get("/admin/getTypeInfo", adminauth, controller.back.main.getTypeInfo);
  router.post("/admin/addArticle", adminauth, controller.back.main.addArticle);
  router.get(
    "/admin/getArticleList",
    adminauth,
    controller.back.main.getArticleList
  );
  router.get(
    "/admin/delArticle/:id",
    adminauth,
    controller.back.main.delArticle
  );
  router.get(
    "/admin/getArticleById/:id",
    adminauth,
    controller.back.main.getArticleById
  );
  router.post(
    "/admin/updateArticle",
    adminauth,
    controller.back.main.updateArticle
  );
};
