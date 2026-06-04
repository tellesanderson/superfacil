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
            "/images/broken1.png", // Computador Quebrado / Desmontado
            "/images/broken2.png", // Erro de código retro glitched
            "/images/broken3.png"  // Circuito queimado tech abstrato
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

    // Form submission handler (only runs if form exists)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const statusEl = document.getElementById('form-status');
        const submitBtn = document.getElementById('form-submit-btn');
        const submitBtnText = submitBtn.innerHTML;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation check
            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
                return;
            }

            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Enviando...';
            statusEl.style.display = 'none';

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let res = await response.json();
                if (response.status === 200) {
                    // Fade out form fields
                    contactForm.style.transition = 'opacity 0.4s ease';
                    contactForm.style.opacity = '0';
                    setTimeout(() => {
                        contactForm.style.display = 'none';
                        statusEl.innerHTML = `
                            <div class="text-center py-5 animate-fade-in">
                                <div class="success-checkmark">
                                    <div class="check-icon">
                                        <span class="icon-line line-long"></span>
                                        <span class="icon-line line-tip"></span>
                                    </div>
                                </div>
                                <h3 style="font-family:'Outfit'; font-weight:800; font-size:1.8rem; margin-bottom:15px; color:#ffffff;">Mensagem Recebida!</h3>
                                <p class="text-muted mb-4" style="font-size:1.05rem; max-width:420px; margin: 0 auto 30px; line-height: 1.6;">
                                    Muito obrigado pelo contato. Nossa equipe de TI analisará a sua mensagem e responderá em até 2 horas úteis.
                                </p>
                                <button type="button" id="reset-form-btn" class="btn-outline-glass btn-sm" style="font-size:0.9rem; padding: 10px 24px; cursor: pointer;">
                                    <i class="fa-solid fa-arrow-left me-1"></i> Enviar Outra Mensagem
                                </button>
                            </div>
                        `;
                        statusEl.style.display = 'block';
                    }, 400);
                } else {
                    statusEl.innerHTML = `
                        <div class="alert alert-danger border-0 bg-danger-subtle text-danger p-3 rounded-3" style="font-family:'Outfit'; font-size: 0.95rem;">
                            <i class="fa-solid fa-circle-exclamation me-2"></i> ${res.message || 'Ops! Ocorreu um erro ao enviar sua mensagem.'}
                        </div>
                    `;
                    statusEl.style.display = 'block';
                }
            })
            .catch(error => {
                console.error(error);
                statusEl.innerHTML = `
                    <div class="alert alert-danger border-0 bg-danger-subtle text-danger p-3 rounded-3" style="font-family:'Outfit'; font-size: 0.95rem;">
                        <i class="fa-solid fa-triangle-exclamation me-2"></i> Erro de rede. Verifique sua conexão e tente novamente.
                    </div>
                `;
                statusEl.style.display = 'block';
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = submitBtnText;
            });
        });
        statusEl.addEventListener('click', function(e) {
            const btn = e.target.closest('#reset-form-btn');
            if (btn) {
                statusEl.style.transition = 'opacity 0.3s ease';
                statusEl.style.opacity = '0';
                setTimeout(() => {
                    statusEl.style.display = 'none';
                    statusEl.innerHTML = '';
                    statusEl.style.opacity = '1';
                    
                    contactForm.reset();
                    contactForm.classList.remove('was-validated');
                    contactForm.style.display = 'block';
                    setTimeout(() => {
                        contactForm.style.opacity = '1';
                    }, 50);
                }, 300);
            }
        });
    }
});
