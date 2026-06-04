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

    // Dynamic news loading (only exists on blog page)
    const newsContainer = document.getElementById('news-container');
    if (newsContainer) {
        const feedUrl = 'https://g1.globo.com/rss/g1/tecnologia/';
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição do feed');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'ok') {
                    renderNews(data.items);
                } else {
                    showNewsError();
                }
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                showNewsError();
            });
    }

    function renderNews(items) {
        newsContainer.innerHTML = ''; // Clear skeletons
        const limitItems = items.slice(0, 6);
        
        limitItems.forEach((item) => {
            const imgUrl = getNewsImage(item);
            const cleanedDesc = cleanDescription(item.description);
            const formattedDate = formatDate(item.pubDate);
            const category = item.categories && item.categories.length > 0 ? item.categories[0] : 'Tecnologia';

            const cardHtml = `
                <div class="col-lg-4 col-md-6">
                    <article class="news-card">
                        <div class="news-card-img-wrapper">
                            <img src="${imgUrl}" alt="${item.title}" class="news-card-img" loading="lazy">
                            <div class="news-card-img-overlay"></div>
                        </div>
                        <div class="news-card-content">
                            <span class="news-card-tag">${category}</span>
                            <h3 class="news-card-title">${item.title}</h3>
                            <p class="news-card-desc">${cleanedDesc}</p>
                            <div class="news-card-footer">
                                <span class="news-card-date">
                                    <i class="fa-regular fa-calendar me-1"></i> ${formattedDate}
                                </span>
                                <a href="${item.link}" target="_blank" class="news-card-link">
                                    Ler artigo <i class="fa-solid fa-arrow-up-right-from-square ms-1" style="font-size:0.75rem;"></i>
                                </a>
                            </div>
                        </div>
                    </article>
                </div>
            `;
            newsContainer.insertAdjacentHTML('beforeend', cardHtml);
        });
    }

    function getNewsImage(item) {
        if (item.thumbnail) return item.thumbnail;
        if (item.enclosure && item.enclosure.link) return item.enclosure.link;
        if (item.description) {
            const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch) return imgMatch[1];
        }
        const fallbackImages = [
            "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        ];
        return fallbackImages[item.title.length % fallbackImages.length];
    }

    function cleanDescription(html) {
        if (!html) return '';
        let text = html.replace(/<[^>]*>/g, '');
        text = text.replace(/&nbsp;/g, ' ')
                   .replace(/&amp;/g, '&')
                   .replace(/&lt;/g, '<')
                   .replace(/&gt;/g, '>')
                   .replace(/&quot;/g, '"');
        return text.trim();
    }

    function formatDate(dateString) {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    }

    function showNewsError() {
        newsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="glass-card d-inline-block p-5" style="max-width: 500px; border-color: rgba(220, 38, 38, 0.3);">
                    <i class="fa-solid fa-circle-exclamation text-danger mb-3" style="font-size: 3rem;"></i>
                    <h3 class="mb-3">Não foi possível carregar as notícias</h3>
                    <p class="text-muted mb-4">Houve um problema de conexão ao buscar o feed de notícias em tempo real. Por favor, verifique sua conexão ou tente novamente.</p>
                    <button onclick="window.location.reload()" class="btn-glow btn-sm">
                        <i class="fa-solid fa-rotate-right"></i> Tentar Novamente
                    </button>
                </div>
            </div>
        `;
    }
});
