/**
 * SuperFácil - Core Interactive Scripts
 * Lightweight, Vanilla JS, Zero Dependencies
 */

document.addEventListener('DOMContentLoaded', function() {
  // 1. Dynamic Footer Year
  const yearSpans = document.querySelectorAll('.current-year');
  const nowYear = new Date().getFullYear();
  yearSpans.forEach(el => el.textContent = nowYear);

  // 2. Sticky Navbar Blur & Shadow on Scroll
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 3. Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    // Close on clicking any link inside
    mobileMenu.querySelectorAll('.nav-link, .btn').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 4. Portfolio Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  if (filterBtns.length > 0 && portfolioCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        portfolioCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 20);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // 5. Portfolio Modal / Lightbox
  const modalOverlay = document.getElementById('portfolio-modal');
  if (modalOverlay) {
    const modalImg = modalOverlay.querySelector('.modal-img');
    const modalTitle = modalOverlay.querySelector('.modal-title');
    const modalDesc = modalOverlay.querySelector('.modal-desc');
    const modalWaBtn = modalOverlay.querySelector('.modal-wa-btn');
    const closeBtn = modalOverlay.querySelector('.modal-close-btn');

    document.querySelectorAll('[data-open-modal]').forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.portfolio-card') || this;
        const img = card.querySelector('.portfolio-thumb')?.getAttribute('src') || '';
        const title = card.querySelector('.portfolio-card-body h3')?.textContent || 'Modelo de Site';
        const desc = card.querySelector('.portfolio-card-body p')?.textContent || '';
        const niche = card.querySelector('.portfolio-badge-niche')?.textContent || 'Landing Page';

        if (modalImg) modalImg.src = img;
        if (modalTitle) modalTitle.textContent = title;
        if (modalDesc) modalDesc.textContent = desc;
        if (modalWaBtn) {
          const msg = encodeURIComponent(`Olá! Gostei muito do modelo "${title}" (${niche}) do portfólio da SuperFácil e gostaria de um orçamento para o meu negócio.`);
          modalWaBtn.href = `https://wa.me/sacsuperfacil?text=${msg}`;
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
    });
  }

  // 6. Contact Form Submission (Web3Forms API + Honeypot + Real-time feedback)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const statusBox = document.getElementById('form-status');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Enviar Mensagem';

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Honeypot check
      const honeypot = contactForm.querySelector('input[name="botcheck"]');
      if (honeypot && honeypot.checked) {
        console.warn('Spam detected via honeypot.');
        return;
      }

      // Basic HTML5 validation check
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
      }

      if (statusBox) {
        statusBox.style.display = 'none';
        statusBox.className = 'form-status-box';
      }

      const formData = new FormData(contactForm);
      const jsonObject = Object.fromEntries(formData);
      const payload = JSON.stringify(jsonObject);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: payload
      })
      .then(async (response) => {
        const res = await response.json();
        if (response.status === 200 && res.success) {
          contactForm.reset();
          if (statusBox) {
            statusBox.className = 'form-status-box success';
            statusBox.innerHTML = `
              <div style="display:flex; align-items:center; gap:12px;">
                <i class="fa-solid fa-circle-check" style="font-size:1.4rem;"></i>
                <div>
                  <strong>Mensagem enviada com sucesso!</strong>
                  <p style="margin:0; font-size:0.88rem; color:inherit;">Recebemos sua solicitação e entraremos em contato muito em breve via WhatsApp ou e-mail.</p>
                </div>
              </div>
            `;
            statusBox.style.display = 'block';
          }
        } else {
          throw new Error(res.message || 'Erro ao enviar mensagem.');
        }
      })
      .catch((err) => {
        console.error('Contact form error:', err);
        if (statusBox) {
          statusBox.className = 'form-status-box error';
          statusBox.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px;">
              <i class="fa-solid fa-triangle-exclamation" style="font-size:1.4rem;"></i>
              <div>
                <strong>Não foi possível enviar a mensagem.</strong>
                <p style="margin:0; font-size:0.88rem; color:inherit;">Por favor, tente novamente ou fale conosco diretamente pelo WhatsApp no botão ao lado.</p>
              </div>
            </div>
          `;
          statusBox.style.display = 'block';
        }
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      });
    });
  }
});
