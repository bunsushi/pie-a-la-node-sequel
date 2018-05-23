// $(window).load(function(){        
//     $('#myModal').modal('show');
//      });

$(document).ready(function () {

    var pieFruits = [{
        fruit: "apple",
        image: "/assets/img/apple.png",
    }, {
        fruit: "apricot",
        image: "/assets/img/apricot.png"
    }, {
        fruit: "blueberry",
        image: "/assets/img/blueberry.png"
    }, {
        fruit: "lemon",
        image: "/assets/img/lemon.png"
    }, {
        fruit: "lime",
        image: "/assets/img/lime.png"
    }, {
        fruit: "peach",
        image: "/assets/img/peach.png"
    }, {
        fruit: "pear",
        image: "/assets/img/pear.png"
    }, {
        fruit: "raspberry",
        image: "/assets/img/raspberry.png"
    }, {
        fruit: "strawberry",
        image: "/assets/img/strawberry.png"
    }];

    function makePieIngredients() {
        for (var i = 0; i < pieFruits.length; i++) {

            var fruitInput = $("<input type='checkbox' name='option' id='" + pieFruits[i].fruit + "'/>");
            fruitInput.attr("value", pieFruits[i].fruit);

            var fruitLabel = $("<label>");
            fruitLabel.attr("for", pieFruits[i].fruit);
            fruitLabel.addClass("fruit-button");

            // var fruitBasket = $("<div>");
            // fruitBasket.addClass("fruit-button");

            var fruit = $("<img class='fruit-image'>");
            fruit.attr("src", pieFruits[i].image);

            // fruitBasket.append(fruit);

            fruitLabel.append(fruit);;

            $("#pie-fruit").append(fruitInput);
            $("#pie-fruit").append(fruitLabel);
        };
    };

    var pieContainer = $(".pie-container");
    var noPieContainer = $(".completed-pie-container");
    var pies;

    function getPies() {
        $.get("/api/pies", function (data) {
            console.log("Pies", data);
            pies = data;
            initializeRows();
        });
    };

    function initializeRows() {
        pieContainer.empty();
        noPieContainer.empty();
        var pieToAdd = [];
        var pieToSubtract = [];
        for (var i = 0; i < pies.length; i++) {
            if (!pies[i].stock) {
                pieToAdd.push(createNewRow(pies[i]));
            } else {
                pieToSubtract.push(createNewRow(pies[i]));
            }
        }
        pieContainer.append(pieToAdd);
        noPieContainer.append(pieToSubtract);
    }

    function createNewRow(pie) {
        var newPieItem = $("<div>");
        var newPieName = $("<h2>");
        newPieName.text(pie.pie_name);
        newPieItem.append(newPieName);
        newPieItem.data("pie", pie);
        return newPieItem;
    }

    getPies();

    // Event Listeners
    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newPie = {
            pie_name: $("#pie-name").val().trim(),
        };

        // Send the POST request.
        $.ajax("/api/pies", {
            type: "POST",
            data: newPie
        }).then(
            function () {
                console.log("Invented a new pie!");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".toggle-stock").on("click", function (event) {
        var id = $(this).data("id");
        var newStock = $(this).data("newstock");

        var newStockState = {
            stock: newStock
        };

        // Send the PUT request.
        $.ajax("/api/pies/" + id, {
            type: "PUT",
            data: newStockState
        }).then(
            function () {
                console.log("changed stock to", newStock);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".delete-pie").on("click", function (event) {
        var id = $(this).data("id");

        // Send the DELETE request.
        $.ajax("/api/pies/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted pie", id);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    makePieIngredients();

    // Capture input
    $(".fruit-button").on("click", function () {
        event.preventDefault();
        $(this).toggleClass("fruit-active");
        console.log($(this).attr('for'));
        // TO DO:
        // push labels to array for description; if array contains >1, delete repeats
    });

});