let basket = [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('main').innerHTML = renderApp();
    renderMenuItems();
    setupTabNavigation();
    updateBasketDisplay();
});

function addToBasket(name, price) {
    const existingItem = basket.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        basket.push({
            name: name,
            price: price,
            quantity: 1
        });
    }
    updateBasketDisplay();
}

