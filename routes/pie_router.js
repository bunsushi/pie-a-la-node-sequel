var express = require("express");
var router = express.Router();
// var pie = require("../models/pie.js");

module.exports = function (router, Pie) {
    // Landing Page
    router.get("/", function (req, res) {
        Pie.findAll({})
            .then(function (data) {
                var hbsObject = {
                    pies: data
                };
                res.render("index", hbsObject)
            });
    });

    router.get("/api/pies", function (req, res) {
        Pie.findAll({
        }).then(function (result) {
            res.json(result);
        });
    });

    router.post("/api/pies", function (req, res) {
        Pie.create(req.body).then(function (result) {
            res.json(result);
        });
    });

    router.put("/api/pies/:id", function (req, res) {
        var condition = req.params.id;
        Pie.update({
            stock: req.body.stock
        },
            {
                where: {
                    id: condition
                }
            }).then(function (result) {
                if (result.changedRows == 0) {
                    return res.status(404).end();
                }
                else {
                    res.status(200).end();
                }
            });
    });

    router.delete("/api/pies/:id", function (req, res) {
        var condition = req.params.id;

        Pie.destroy({
            where: {
                id: condition
            }
        }, function (result) {
            res.json(result);
        });
    });

};