// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var pie = {
  all: function(cb) {
    orm.all("pies", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("pies", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("pies", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("pies", condition, function(res) {
      cb(res);
    });
  }
};

module.exports = pie;
