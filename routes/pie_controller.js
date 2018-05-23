var express = require("express");
var router = express.Router();
var pie = require("../models/pie.js");

router.get("/", function(req, res) {
    pie.all(function(data) {
        var hbsObject = {
            pies: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/pies", function(req, res) {
    pie.create(["pie_name", "description"], [req.body.pie_name, req.body.description], function(result) {
        res.json({ id: result.insertId });
    });
});

router.put("/api/pies/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    pie.update(
        {
            stock: req.body.stock
        },
        condition,
        function(results) {
            if (results.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

router.delete("/api/pies/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    pie.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

module.exports = router;