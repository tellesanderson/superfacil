document.addEventListener('DOMContentLoaded', function() {
    // Set dynamic current year in footer
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Set years in market stat (only exists on homepage)
    const yearsMarketEl = document.getElementById('yearsMarket');
    if (yearsMarketEl) {
        yearsMarketEl.textContent = (new Date().getFullYear() - 2011) + '+';
    }

    // Sticky Navbar shadow effect on scroll
    const glassNav = document.querySelector('.glass-nav');
    if (glassNav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                glassNav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            } else {
                glassNav.style.boxShadow = 'none';
            }
        });
    }

    // Dynamic background image for 404 page (only exists on 404 page)
    const dynamicBgEl = document.getElementById('dynamic-bg');
    if (dynamicBgEl) {
        const brokenImages = [
            "images/broken1.png", // Computador Quebrado / Desmontado
            "images/broken2.png", // Erro de código retro glitched
            "images/broken3.png"  // Circuito queimado tech abstrato
        ];
        const randomElement = brokenImages[Math.floor(Math.random() * brokenImages.length)];
        dynamicBgEl.style.backgroundImage = `url('${randomElement}')`;
    }
});
