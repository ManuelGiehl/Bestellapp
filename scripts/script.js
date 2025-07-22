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

function updateBasketDisplay() {
    const basketContainer = document.getElementById('basket-items');
    const summaryContainer = document.querySelector('.basket-summary');
    
    if (basket.length === 0) {
        basketContainer.innerHTML = renderEmptyBasket();
        summaryContainer.innerHTML = renderBasketSummary(0, 5.00, 5.00);
    } else {
        basketContainer.innerHTML = basket.map(item => renderBasketItem(item)).join('');
        
        let subtotal = basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let deliveryCost = 5.00;
        let total = subtotal + deliveryCost;
        
        summaryContainer.innerHTML = renderBasketSummary(subtotal, deliveryCost, total);
    }
    
    saveBasketToStorage();
}

