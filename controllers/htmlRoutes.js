// htmlRoutes.js
var path = require("path");

module.exports = function(app) {

  // display the cover page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cover.html"));
  });

}
