document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('main').innerHTML = renderApp();
    renderMenuItems();
    setupTabNavigation();
    updateBasketDisplay();
    updateHeaderBasketCounter();
});

function setupTabNavigation() {
    let tabs = document.querySelectorAll('.tab');
    
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function() {
            setActiveTab(tabs, this);
            scrollToBanner(this.getAttribute('data-category'));
        });
    }
}

function setActiveTab(tabs, clickedTab) {
    for (let j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove('active');
    }
    clickedTab.classList.add('active');
}

function scrollToBanner(category) {
    let bannerId = '';
    
    if (category === 'main-dishes') {
        bannerId = 'main-dishes-banner';
    } else if (category === 'side-dishes') {
        bannerId = 'side-dishes-banner';
    } else if (category === 'drinks') {
        bannerId = 'drinks-banner';
    }
    
    let banner = document.getElementById(bannerId);
    if (banner) {
        banner.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
