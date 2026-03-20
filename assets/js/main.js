// ━━━━━━━━━━ FOUNDER DATA ━━━━━━━━━━
const foundersData = {
  luca: {
    name: 'Luca Lombisani',
    role: 'Personal Trainer',
    monogram: 'LL',
    gradientClass: 'luca',
    formation: [
      'Laurea in Scienze Biologiche',
      'Personal Trainer certificato FIF',
      'Corso Project Invictus (in corso)',
      'Master Hypertrophy – Schoenfeld',
      'Corso Plyometrics 2.0 – Squillante'
    ],
    focus: [
      { icon: 'fas fa-sync-alt', label: 'Ricomposizione Corporea' },
      { icon: 'fas fa-weight', label: 'Dimagrimento' },
      { icon: 'fas fa-dumbbell', label: 'Bodybuilding' },
      { icon: 'fas fa-barbell', label: 'Bilancieri & Manubri' },
      { icon: 'fas fa-user', label: 'Corpo Libero' },
      { icon: 'fas fa-people-group', label: 'Small Group Training' }
    ]
  },
  giacomo: {
    name: 'Giacomo Guidetti',
    role: 'Biologo Nutrizionista',
    monogram: 'GG',
    gradientClass: 'giacomo',
    formation: [
      'Laurea triennale in Scienze Biologiche',
      'Laurea magistrale in Biologia applicata alle Scienze della Nutrizione',
      'Iscritto all\'Ordine Nazionale Biologi',
      'Corso Basic Life Support Provider',
      'Corso "Oncologia nutrizionale pediatrica, dell\'anziano e tiroidea"',
      'Corso "Perdita di grasso e definizione in palestra: dieta e integratori"'
    ],
    focus: [
      { icon: 'fas fa-sync-alt', label: 'Ricomposizione Corporea' },
      { icon: 'fas fa-weight', label: 'Dimagrimento' },
      { icon: 'fas fa-muscle', label: 'Sviluppo Massa Muscolare' },
      { icon: 'fas fa-leaf', label: 'Regime Vegano/Vegetariano' },
      { icon: 'fas fa-heartbeat', label: 'Condizioni Patologiche' },
      { icon: 'fas fa-pills', label: 'Protocolli Integrativi' }
    ]
  },
  lorenzo: {
    name: 'Lorenzo Maggiolo',
    role: 'Personal Trainer',
    monogram: 'LM',
    gradientClass: 'lorenzo',
    formation: [
      'Laurea triennale SUISM Torino',
      'Laureato in Scienze e Tecniche Avanzate dello Sport IM-68',
      'Corso Personal Trainer FIF',
      'Academy Pro SBB',
      'Master in Preparazione Atletica – IEPA, NSCA e ACSI'
    ],
    focus: [
      { icon: 'fas fa-sync-alt', label: 'Ricomposizione Corporea' },
      { icon: 'fas fa-weight', label: 'Dimagrimento' },
      { icon: 'fas fa-dumbbell', label: 'Bodybuilding' },
      { icon: 'fas fa-running', label: 'Preparazione Atletica' },
      { icon: 'fas fa-barbell', label: 'Bilancieri & Manubri' },
      { icon: 'fas fa-people-group', label: 'Small Group Training' }
    ]
  }
};

// ━━━━━━━━━━ MODAL MANAGEMENT ━━━━━━━━━━
const modal = {
  backdrop: document.getElementById('modalBackdrop'),
  drawer: document.getElementById('modalDrawer'),
  close: document.getElementById('drawerClose'),
  lastFocusedElement: null,

  open(founderKey) {
    const data = foundersData[founderKey];
    this.populateDrawer(data);
    this.backdrop.classList.add('active');
    this.drawer.classList.add('active');
    document.body.classList.add('modal-open');
    this.lastFocusedElement = document.activeElement;
    this.setupFocusTrap();
  },

  closeModal() {
    this.backdrop.classList.remove('active');
    this.drawer.classList.remove('active');
    document.body.classList.remove('modal-open');
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }
  },

  populateDrawer(data) {
    document.getElementById('drawerName').textContent = data.name;
    document.getElementById('drawerRole').textContent = data.role;
    document.getElementById('drawerHeroRole').textContent = data.role;
    document.getElementById('drawerHero').setAttribute('data-monogram', data.monogram);
    document.getElementById('drawerHero').style.background = document.querySelector(`.founder-card.${data.gradientClass}`).style.background;

    // Formation
    const formationHtml = data.formation
      .map(item => `<div class="formation-item"><span class="formation-dot">•</span><span class="formation-text">${item}</span></div>`)
      .join('');
    document.getElementById('drawerFormation').innerHTML = formationHtml;

    // Focus
    const focusHtml = data.focus
      .map(item => `<div class="focus-item"><i class="${item.icon} focus-icon"></i>${item.label}</div>`)
      .join('');
    document.getElementById('drawerFocus').innerHTML = focusHtml;
  },

  setupFocusTrap() {
    const focusableElements = this.drawer.querySelectorAll('a, button, [tabindex]');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    this.drawer.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }
};

// ━━━━━━━━━━ EVENT LISTENERS ━━━━━━━━━━
document.addEventListener('DOMContentLoaded', function() {
  // Founder cards
  document.querySelectorAll('.founder-card').forEach(card => {
    card.addEventListener('click', () => {
      const founderKey = card.getAttribute('data-founder');
      modal.open(founderKey);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const founderKey = card.getAttribute('data-founder');
        modal.open(founderKey);
      }
    });
  });

  // Modal close
  modal.close.addEventListener('click', () => modal.closeModal());
  modal.backdrop.addEventListener('click', () => modal.closeModal());

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.drawer.classList.contains('active')) {
      modal.closeModal();
    }
  });

  // Contact form
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    alert(`Grazie ${name}! Riceveremo il tuo messaggio e ti contatteremo presto.`);
    e.target.reset();
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Compute founder gradients
  const lucaCard = document.querySelector('.founder-card.luca');
  const giacomoCard = document.querySelector('.founder-card.giacomo');
  const lorenzoCard = document.querySelector('.founder-card.lorenzo');

  if (lucaCard) lucaCard.style.background = 'linear-gradient(135deg, #2d1a1a, #4a2020)';
  if (giacomoCard) giacomoCard.style.background = 'linear-gradient(135deg, #0a1a3a, #1a2a5a)';
  if (lorenzoCard) lorenzoCard.style.background = 'linear-gradient(135deg, #3a1a1a, #5a2020)';
});
