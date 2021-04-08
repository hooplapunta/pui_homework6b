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
    itemsInCart.splice(index, 1);
    saveCart();

    // reload the page to re-render from localstorage
    location.reload();
}

// attach to onload, loading, number display
$(document).ready(function () {
    loadCart();

    // if there is a cartdisplay element, render it

    // new tr
    // td img
    // td name, description
    // td quantity
    // td cost

    // calculate total

});