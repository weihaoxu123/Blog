const JWT = require("jsonwebtoken");
module.exports = options => {
  return async function adminauth(ctx, next) {
    // console.log(ctx.session.openId);
    const token = ctx.request.header.authorization;
    const method = ctx.method.toLowerCase();
    let decode;
    const flag = false;
    try {
      decode = JWT.verify(token, "egg-api-jwt");
      if (!decode || !decode.userName) {
        ctx.body = { data: "没有登录" };
      } else if (Date.now() - decode.expire > 0) {
        ctx.body = { data: "没有登录" };
      } else {
        await next();
      }
    } catch (err) {
      ctx.body = { data: "没有登录" };
    }
    // } catch (err) {
    //   console.log(err);

    //   this.logger.error(err);
    //   return {};
    // }
    // }
  };
};
