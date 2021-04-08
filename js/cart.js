var itemsInCart = [];

// function for loading from storage
function loadCart() {
    itemsInCart = JSON.parse(localStorage.getItem("itemsInCart"));
    updateCounter();
}

// function for saving from storage
function saveCart() {
    localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart));
    updateCounter();
}

// function for clearing cart
function clearCart() {
    itemsInCart = [];
    localStorage.removeItem("itemsInCart");
    updateCounter();
}

// update the counter when an item is added or removed
function updateCounter() {
    $("#cartCount").html(itemsInCart.length);
}

// add to cart
function addToCart(item) {
    itemsInCart.push(item);
    saveCart();
}

// remove from cart
function removeFromCart(index) {
    console.log("index", index);
    console.log(itemsInCart);
    itemsInCart.splice(index, 1);
    console.log(itemsInCart);
    saveCart();

    // reload the page to re-render from localstorage
    location.reload();
}

// attach to onload, loading, number display
$(document).ready(function () {
    loadCart();

    // if there is a cartdisplay element, render it
    var table = $("#cartItems");

    // render a new table row for each item
    for (var i = 0; i < itemsInCart.length; i++) {
        var item = itemsInCart[i];
        var tr = $("<tr></tr>");

        var img = $("<td></td>").append($("<img/>").attr("src", "../img/donut_almond.png").attr("width", 100));
        var name = $("<td></td>").html(item.name);
        var cost = $("<td></td>").html(item.cost);
        var remove = $("<button>Remove</button>").attr("onclick", "removeFromCart(" +i +")");
        
        tr.append(img, name, cost, remove);

        table.append(tr);
    }

    // calculate total
    var subtotal = _.reduce(itemsInCart, function(sum, n) {
        return sum + n.cost;
      }, 0);
    subtotal = subtotal.toFixed(2);
    var tax = 0.07 * subtotal;
    tax = tax.toFixed(2);
    var total = parseFloat(subtotal) + parseFloat(tax);
    total = total.toFixed(2);
    
    $("#cartSubtotal").text(subtotal);
    $("#cartTax").text(tax);
    $("#cartTotal").text(total);
});