module.exports = app => {
  const { router, controller } = app;
  router.get("/cilent/index", controller.cilent.home.index);
  router.get("/cilent/getArticleList", controller.cilent.home.getArticleList);
  router.get("/cilent/getThoughtList", controller.cilent.home.getThoughtList);
  router.get("/cilent/getArticleById", controller.cilent.home.getArticleById);
};
