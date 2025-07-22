function renderApp() {
    return `
        ${renderHeader()}
        <div class="main-container">
            <main class="content">
                ${renderRestaurantBanner()}
                ${renderNavTabs()}
                ${renderMenuSection()}
            </main>
            ${renderBasket()}
        </div>
        ${renderFooter()}
    `;
}

function renderMenuItem(dish) {
    return `
        <div class="menu-item" data-id="${dish.name}">
            <div class="menu-item-info">
                <div class="menu-item-name">${dish.name}</div>
                <div class="menu-item-description">${dish.description}</div>
                <div class="menu-item-price">${dish.price.toFixed(2).replace('.', ',')}€</div>
            </div>
            <button class="add-button" onclick="addToBasket('${dish.name}', ${dish.price})">+</button>
        </div>
    `;
}

function renderHeader() {
    return `
        <header class="header">
            <div class="header-content">
                <img src="assets/icons/Bestell App- Logo.svg" alt="Bestell App Logo" class="logo">
                </div>
            </div>
        </header>
    `;
}

function renderRestaurantBanner() {
    return `
        <div class="restaurant-banner">
            <img src="assets/img/food-7724000_1920.jpg" alt="Restaurant Banner">
            <div class="restaurant-info">
                <div class="restaurant-logo">
                    <div class="logo-placeholder">
                        EM
                    </div>
                </div>
                <h2 class="restaurant-name">Pizzeria El Manuel</h2>
                <p class="restaurant-rating">Bewertung (4,2 von 5 Sternen)</p>
            </div>
        </div>
    `;
}

function renderNavTabs() {
    return `
        <div class="nav-tabs">
            <button class="tab active" data-category="main-dishes">Hauptgerichte</button>
            <button class="tab" data-category="side-dishes">Beilage</button>
            <button class="tab" data-category="drinks">Getränke</button>
        </div>
    `;
}

function renderCategorySection(category, title, imageSrc, imageAlt) {
    return `
        <div class="category-banner" id="${category}-banner">
            <img src="${imageSrc}" alt="${imageAlt}">
        </div>
        <h3 class="section-title" id="${category}-title">${title}</h3>
        <div class="menu-items" id="${category}-items">
        </div>
    `;
}

function renderMenuSection() {
    return `
        <div class="menu-section">
            ${renderCategorySection('main-dishes', 'Hauptgerichte', 'assets/img/pizza-3000274_1280.jpg', 'Bild Hauptgerichte')}
            ${renderCategorySection('side-dishes', 'Beilage', 'assets/img/haddock-1045953_1280.jpg', 'Bild Beilage')}
            ${renderCategorySection('drinks', 'Getränke', 'assets/img/getränke.jpg', 'Bild Getränke')}
        </div>
    `;
}

function renderBasket() {
    return `
        <aside class="basket_wrapper">
            <div class="basket-header">
                <h2>Warenkorb</h2>
            </div>
            <div class="basket-items" id="basket-items">
                ${renderEmptyBasket()}
            </div>
            <div class="basket-summary">
                ${renderBasketSummary(0, 5.00, 5.00)}
            </div>
        </aside>
    `;
}

function renderFooter() {
    return `
        <footer class="footer">
            <div class="footer-content">
                <img src="assets/icons/Bestell App- Logo.svg" alt="Bestell App Logo" class="footer-logo">
            </div>
        </footer>
    `;
}

function renderBasketItem(item) {
    return `
        <div class="basket-item" data-id="${item.name}">
            <div class="basket-item-header">
                <div class="basket-item-name">${item.name}</div>
                <div class="basket-item-price">${(item.price * item.quantity).toFixed(2).replace('.', ',')}€</div>
            </div>
            <div class="basket-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity('${item.name}')" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                    <span class="quantity-display">${item.quantity}x</span>
                    <button class="quantity-btn" onclick="increaseQuantity('${item.name}')">+</button>
                </div>
                <button class="delete-btn" onclick="removeFromBasket('${item.name}')">🗑</button>
            </div>
        </div>
    `;
}

function renderEmptyBasket() {
    return `
        <div class="basket-empty">
            <p>Ihr Warenkorb ist leer</p>
            <small>Fügen Sie Gerichte hinzu, um zu bestellen</small>
        </div>
    `;
}

function renderBasketSummary(subtotal, deliveryCost, total) {
    return `
        <div class="summary-row">
            <span>Zwischensumme</span>
            <span>${subtotal.toFixed(2).replace('.', ',')}€</span>
        </div>
        <div class="summary-row">
            <span>Lieferkosten</span>
            <span>${deliveryCost.toFixed(2).replace('.', ',')}€</span>
        </div>
        <div class="summary-row total">
            <span>Gesamt</span>
            <span>${total.toFixed(2).replace('.', ',')}€</span>
        </div>
        <button class="order-button" onclick="placeOrder()">Bestellen</button>
    `;
}

function renderMenuItems() {
    const mainDishesContainer = document.getElementById('main-dishes-items');
    const sideDishesContainer = document.getElementById('side-dishes-items');
    const drinksContainer = document.getElementById('drinks-items');
    
    const mainDishes = myDishes.filter(dish => dish.category === 'main-dishes');
    const sideDishes = myDishes.filter(dish => dish.category === 'side-dishes');
    const drinks = myDishes.filter(dish => dish.category === 'drinks');
    
    mainDishesContainer.innerHTML = mainDishes.map(dish => renderMenuItem(dish)).join('');
    sideDishesContainer.innerHTML = sideDishes.map(dish => renderMenuItem(dish)).join('');
    drinksContainer.innerHTML = drinks.map(dish => renderMenuItem(dish)).join('');
}

function showOrderMessage() {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'order-message';
    messageContainer.innerHTML = `
        <div class="order-message-content">
            <h3>Bestellung erfolgreich!</h3>
            <p>Ihre Bestellung wurde erfolgreich aufgegeben.</p>
            <button onclick="this.parentElement.parentElement.remove()">Schließen</button>
        </div>
    `;
    
    document.body.appendChild(messageContainer); 
}
