document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('main').innerHTML = renderApp();
    renderMenuItems();
    setupTabNavigation();
    updateBasketDisplay();
});