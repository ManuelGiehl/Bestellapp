let basket = [];

function addToBasket(name, price) {
    const existingItem = findBasketItem(name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        basket.push({ name, price, quantity: 1 });
    }
    updateBasketDisplay();
}

function updateBasketDisplay() {
    const { subtotal, deliveryCost, total } = calculateTotals();
    const basketContainer = document.getElementById('basket-items');
    const summaryContainer = document.querySelector('.basket-summary');
    
    basketContainer.innerHTML = basket.length === 0 ? 
        renderEmptyBasket() : basket.map(item => renderBasketItem(item)).join('');
    
    summaryContainer.innerHTML = renderBasketSummary(subtotal, deliveryCost, total);
    
    updateHeaderBasketCounter();
    
    const overlay = document.getElementById('basket-overlay');
    if (overlay?.classList.contains('active')) {
        updateBasketOverlayDisplay();
    }
}

function increaseQuantity(name) {
    const item = findBasketItem(name);
    if (item) {
        item.quantity += 1;
        updateBasketDisplay();
    }
}

function decreaseQuantity(name) {
    const item = findBasketItem(name);
    if (!item) return;
    
    if (item.quantity > 1) {
        item.quantity -= 1;
        updateBasketDisplay();
    } else {
        removeFromBasket(name);
    }
}

function removeFromBasket(name) {
    basket = basket.filter(item => item.name !== name);
    updateBasketDisplay();
}

function calculateTotals() {
    const subtotal = basket.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryCost = 5.00;
    return { subtotal, deliveryCost, total: subtotal + deliveryCost };
}

function getTotalItems() {
    return basket.reduce((sum, item) => sum + item.quantity, 0);
}

function findBasketItem(name) {
    return basket.find(item => item.name === name);
}

function updateBasketOverlayDisplay() {
    const { subtotal, deliveryCost, total } = calculateTotals(); 
    const overlayItems = document.getElementById('basket-overlay-items');
    const overlaySummary = document.getElementById('basket-overlay-summary');
    
    overlayItems.innerHTML = basket.length === 0 ? 
        renderEmptyBasket() : basket.map(item => renderBasketItem(item)).join('');
    
    overlaySummary.innerHTML = renderBasketSummary(subtotal, deliveryCost, total);
}

function updateHeaderBasketCounter() {
    const counter = document.getElementById('header-basket-counter');
    if (!counter) return;
    
    const totalItems = getTotalItems();
    counter.textContent = totalItems;
    counter.style.display = totalItems === 0 ? 'none' : 'flex';
}

function placeOrder() {
    if (basket.length === 0) return;
    
    basket = [];
    updateBasketDisplay();
    showOrderMessage();
    
    const overlay = document.getElementById('basket-overlay');
    if (overlay?.classList.contains('active')) {
        overlay.classList.remove('active');
    }
}

function toggleHeaderBasket() {
    const overlay = document.getElementById('basket-overlay');
    overlay.classList.add('active');
    updateBasketOverlayDisplay();
}

function closeBasketOverlay() {
    document.getElementById('basket-overlay').classList.remove('active');
}