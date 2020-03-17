const JWT = require("jsonwebtoken");
module.exports = options => {
  return async function adminauth(ctx, next) {
    // console.log(ctx.session.openId);
    const token = ctx.request.header.authorization;
    const method = ctx.method.toLowerCase();
    console.log(ctx.request);
    let decode;
    console.log(this);

    decode = JWT.verify(token, "egg-api-jwt");
    console.log(decode);

    // if (ctx.session.openId) {
    //   await next();
    // } else {
    //   ctx.body = { data: "没有登录" };
    // }
    if (!decode || !decode.userName) {
      ctx.body = { data: "没有登录" };
    } else if (Date.now() - decode.expire > 0) {
      ctx.throw(401, "Token已过期");
      ctx.body = { data: "没有登录" };
    } else {
      await next();
    }
  };
};
