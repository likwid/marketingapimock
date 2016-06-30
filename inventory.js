module.exports = (function (R, mach, status, inventory) {
  "use strict";

  const selfMap = (list) => R.map(R.identity, list),
        inventoryByDealer = (conn) => {
          return conn.json(status.ok, R.filter((n) => n.dealerId === conn.params.dealerKey, inventory));
        },
        getInventoryItemByKey = (conn) => {
          return conn.json(status.ok, R.filter((n) => n.key === conn.params.inventoryKey));
        },
        createInventoryItem = (conn) => {
          const inventoryItem = {
            key: conn.params.key,
            dealerId: conn.params.dealerId,
            vehicleId: conn.params.vehicleId,
            type: conn.params.type,
            stockNumber: conn.params.stockNumber,
            year: conn.params.year,
            make: conn.params.make,
            model: conn.params.model,
            trim: conn.params.trim
          };
          inventory = R.concat(inventory, inventoryItem);
          return conn.json(status.created, inventoryItem);
        };
  
  return function(app) {
    app.get("/groups/:groupKey/dealers/:dealerKey/inventory", inventoryByDealer);
    app.get("/groups/:groupKey/dealers/:dealerKey/inventory/:inventoryKey", getInventoryItemByKey);
    app.put("/groups/:groupKey/dealers/:dealerKey/inventory/:inventoryKey", createInventoryItem);
    // app.get("/groups/:groupKey/dealers/:dealerKey/inventory/search", (conn) => {
  }
}(
  require("ramda"),
  require("mach"),
  require("./lib/status"),
  require("./mocks/inventory.json")
));

