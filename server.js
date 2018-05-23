var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 5000;

var db = require("./models");

var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/pie_router.js")(app, db.Pie);

// Sync sequelize models and start server:
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("Server listening on PORT " + PORT);
  });
});
