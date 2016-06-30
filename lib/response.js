module.exports = (conn) => (function (R) {
  "use strict"; 

  const stati = {
    ok: 200,
    created: 201
    // accepted: 202,
    // noContent: 204,
    // multipleChoices: 300,
    // movedPermanently: 301,
    // found: 302,
    // seeOther: 303,
    // notModified: 304,
    // temporaryRedirect: 307,
    // permanentRedirect: 308,
    // badRequest: 400,
    // unauthorized: 401,
    // paymentRequirement: 402,
    // forbidden: 403,
    // notFound: 404,
    // methodNotAllowed: 405,
    // notAcceptable: 406,
    // requestTimeout: 408,
    // conflict: 409,
    // gone: 410,
    // lengthRequired: 411,
    // preconditionFailed: 412,
    // requestEntityTooLarge: 413,
    // requestUriTooLarge: 414,
    // unsupportedMediaType: 415,
    // imATeapot: 418,
    // enhanceYourCalm: 420,
    // unprocessableEntity: 422,
    // internalServerError: 500,
    // notImplemented: 501,
    // badGateway: 502,
    // serviceUnavailable: 503,
    // gatewayTimeout: 504
  };

  const key = (kv) => R.head(kv),
        value = (kv) => R.last(kv),
        expandKV = R.curry((f, acc, kv) => f(acc, key(kv), value(kv))),
        reduceObj = R.curry((r, init, obj) => R.reduce(expandKV(r), init, R.toPairs(obj))),
        statusBuilder = R.curry(conn.json),
        status = reduceObj(function (acc, key, value) {
          return R.merge(acc, R.objOf(key, statusBuilder(value)));
        }, {}, stati);

  return {
    status: status
  };
}(
  require("ramda")
));
