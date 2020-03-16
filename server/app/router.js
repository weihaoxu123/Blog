"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require("./router/cilent")(app);
  require("./router/admin")(app);
  const { router, controller } = app;
  var adminauth = app.middleware.adminauth();
  router.get("/", controller.home.index);
  router.get("/list", adminauth, controller.home.list);
};
