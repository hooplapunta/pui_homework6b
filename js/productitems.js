// product item definition
function Option(name, description) {
    this.name = name;
    this.description = description;
}

function Item(name, description, size, cost) {
    this.name = name;
    this.description = description;
    this.size = size;
    this.cost = cost;
}


// donut definitions
var donutOptions = [
    new Option("almond", "Head Baker Tom’s special creation was made when he toasted almonds for a little too long, \
but this donut has a wonderful smokiness, especially when paired with our signature toffee glaze."),
    new Option("classic", "Despite this donut having just the simple classic sugary glaze, our humble beginnings \
    uses the finest vanilla and sugar that is also sustainably sourced!"),
    new Option("chocolate","Nothing is quite like this decadant treat of a luscious glaze atop any donut, \
    made with a mix of both 70% dark and milk chocolate, plus a hint of spice."),
    new Option("pink", '"Hey, hey you", Pink Donut says. "Are you feeling craaaaazy?!" \
    Our crazy pink donut does not actually talk, but we believe that is what it would say. '),
    new Option("strawberry", "An innocent looking sugar-dusted donut this looks, but once you bite into \
    the center, expect an explosion of delicious homemade strawberry jelly."),
    new Option("mango",  "Is it mango? Is it lime? What we do know that this donut is a mystery. \
    We are pretty sure it tastes different every bite, but it will always be moreish.")
]

var donutItems = [
    new Item("Box of 1 Dozen", null, 12, 19.99),
    new Item("Box of 1/2 Dozen", null, 6, 10.99),
    new Item("Donuts in bag", null, 1, 1.99),
]

// hide all plus and minus buttons until hovered over
$(".menuItem").find("button").hide();

$(".menuItem").on("mouseover", function (event) {
    $(this).find("button").show()

    var id = $(this).attr("id")
    var text = "All our donuts are baked fresh daily. Select any donut to learn more about all of Donut Theory's doughy personality."

    text = _.find(donutOptions, {'name': id}).description;

    $("#description").html(text)
});

$(".menuItem").on("mouseleave", function (event) {
    $(this).find("button").hide()
});

// update totals when amounts change
$(".menuItem").find("input").on("change", updateAmount);

$(".up-button").on("click", function (event) {
    if ($(this).parent().find("input").val() < 12) {
        $(this).parent().find("input").val(parseInt($(this).parent().find("input").val()) + 1)
    }

    updateAmount();
});

$(".down-button").on("click", function (event) {
    if ($(this).parent().find("input").val() > 0) {
        $(this).parent().find("input").val(parseInt($(this).parent().find("input").val()) - 1)
    }

    updateAmount();
});

// update amount in add to cart button
var toAddToCart = [];

function updateAmount(event) {
    var totalDonuts = $(".menuItem").find("input").toArray().reduce((a, b) => a + parseInt(b.value), 0)
    $("#donutCount").html(totalDonuts)
    console.log("totalDonuts", totalDonuts)

    var totalSizes = [];
    var totalCost = 0;

    while (totalDonuts > 0) {
        for (item of donutItems) {
            if (item.size <= totalDonuts) {
                console.log("remove donuts", item.size);
                totalDonuts -= item.size;
                totalSizes.push(item);
                totalCost += item.cost;
                break;
            }
        }
    }
    $("#donutCost").html("$" + totalCost.toFixed(2))
    toAddToCart = totalSizes;

    var finalUnits = "";
    var totalUnits = _.countBy(totalSizes, "name");
    for (key in totalUnits) {
        finalUnits += totalUnits[key] + " " + key + "<br>"
    }
    $("#donutUnits").html(finalUnits)
}

$(".addToCartButton").on("click", function (event) {
    if (toAddToCart.length == 0) {
        return;
    }

    for (item of toAddToCart) {
        addToCart(item);
    }

    alert("Added " + toAddToCart.length + " items to cart");
});

