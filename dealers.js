module.exports = (function (R, mach, status, dealers) {
  "use strict";

  const getDealersByGroup = (conn) => {
          return conn.json(status.ok, R.filter((n) => n.groupKey === conn.params.groupKey, dealers));
        },

        getDealerByKey = (conn) => {
          return conn.json(status.ok, R.filter((n) => n.id === conn.params.dealerKey, dealers));
        },

        createDealer = (conn) => {
          const dealer = {id: conn.params.id, name: conn.params.name};
          dealers = R.concat(dealers, dealer);
          return conn.json(status.created, dealer);
        };
  
  return function(app) {
    app.get("/groups/:groupKey/dealers", getDealersByGroup);
    app.get("/groups/:groupKey/dealers/:dealerKey", getDealerByKey);
    app.put("/groups/:groupKey/dealers/:dealerKey", createDealer);
  }
}(
  require("ramda"),
  require("mach"),
  require("./lib/status"),
  require("./mocks/dealers.json")
));

