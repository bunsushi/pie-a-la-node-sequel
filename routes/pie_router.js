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

};

// router.get("/", function(req, res) {
//     pie.all(function(data) {
//         var hbsObject = {
//             pies: data
//         };
//         console.log(hbsObject);
//         res.render("index", hbsObject);
//     });
// });

// router.post("/api/pies", function(req, res) {
//     pie.create(["pie_name", "description"], [req.body.pie_name, req.body.description], function(result) {
//         res.json({ id: result.insertId });
//     });
// });

// router.put("/api/pies/:id", function(req, res) {
//     var condition = "id = " + req.params.id;

//     console.log("condition", condition);

//     pie.update(
//         {
//             stock: req.body.stock
//         },
//         condition,
//         function(results) {
//             if (results.changedRows === 0) {
//                 return res.status(404).end();
//             }
//             res.status(200).end();
//         }
//     );
// });

// router.delete("/api/pies/:id", function(req, res) {
//     var condition = "id = " + req.params.id;

//     pie.delete(condition, function(result) {
//       if (result.affectedRows == 0) {
//         // If no rows were changed, then the ID must not exist, so 404
//         return res.status(404).end();
//       } else {
//         res.status(200).end();
//       }
//     });
//   });

// module.exports = router;