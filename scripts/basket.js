let basket = [];

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
    const emptyBasketElement = document.querySelector('.basket-empty');
    
    if (basket.length === 0) {
        if (!emptyBasketElement) {
            basketContainer.innerHTML = renderEmptyBasket();
        }
        summaryContainer.innerHTML = renderBasketSummary(0, 5.00, 5.00);
    } else {
       
        basketContainer.innerHTML = basket.map(item => renderBasketItem(item)).join('');
        
        let subtotal = basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let deliveryCost = 5.00;
        let total = subtotal + deliveryCost;
        
        summaryContainer.innerHTML = renderBasketSummary(subtotal, deliveryCost, total);
    }
}

function increaseQuantity(name) {
    const item = basket.find(item => item.name === name);
    if (item) {
        item.quantity += 1;
        updateBasketDisplay();
    }
}

function decreaseQuantity(name) {
    const item = basket.find(item => item.name === name);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateBasketDisplay();
    } else if (item && item.quantity === 1) {
        removeFromBasket(name);
    }
}

function removeFromBasket(name) {
    basket = basket.filter(item => item.name !== name);
    updateBasketDisplay();
}
