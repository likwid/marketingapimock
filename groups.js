module.exports = (function (R, mach, status, groups) {
  "use strict";
  
  const selfMap = (list) => R.map(R.identity, list),
        listGroups = (conn) => conn.json(status.ok, selfMap(groups)),

        getGroupByKey = (conn) => {
          return conn.json(status.ok, R.filter((n) => n.groupKey === conn.params.groupKey, groups));
        },

        createGroup = (conn) => {
          const group = {id: conn.params.id, name: conn.params.name};
          groups = R.concat(groups, group);
          return conn.json(status.created, group);
        };

  return function(app) {
    app.get("/groups", listGroups);
    app.get("/groups/:groupKey", getGroupByKey);
    app.put("/groups/:groupKey", createGroup);
  }
}(
  require("ramda"),
  require("mach"),
  require("./lib/status"),
  require("./mocks/groups.json")
));

