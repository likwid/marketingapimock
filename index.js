(function (R, mach) {
  "use strict";
  const app = mach.stack();
  app.use(mach.logger);
  app.use(mach.params);

  require("./groups")(app);
  require("./dealers")(app);
  require("./inventory")(app);

  mach.serve(app);
}(
  require("ramda"),
  require("mach")
));

