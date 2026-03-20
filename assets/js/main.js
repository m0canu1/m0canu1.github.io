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

  // Contact form validation and submission
  const contactForm = document.getElementById('contactForm');
  const formGroups = contactForm.querySelectorAll('.form-group');

  // Validate email format
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Validate individual field
  function validateField(field) {
    const formGroup = field.closest('.form-group');
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (!value) {
      isValid = false;
      if (field.type === 'email') {
        errorMessage = "L'email è obbligatoria";
      } else if (field.name === 'service') {
        errorMessage = 'Seleziona un servizio';
      } else if (field.tagName === 'TEXTAREA') {
        errorMessage = 'Il messaggio è obbligatorio';
      } else {
        errorMessage = `${field.previousElementSibling.textContent} è obbligatorio`;
      }
    } else if (field.type === 'email' && !validateEmail(value)) {
      isValid = false;
      errorMessage = "Inserisci un'email valida";
    }

    if (!isValid) {
      formGroup.classList.add('error');
      formGroup.classList.remove('success');
      const errorSpan = formGroup.querySelector('.form-error-message');
      if (errorSpan) errorSpan.textContent = errorMessage;
    } else {
      formGroup.classList.remove('error');
      formGroup.classList.add('success');
    }

    return isValid;
  }

  // Real-time validation
  formGroups.forEach(group => {
    const field = group.querySelector('input, select, textarea');
    if (field) {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (group.classList.contains('error')) {
          validateField(field);
        }
      });
    }
  });

  // Form submission
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    let isFormValid = true;
    const fields = contactForm.querySelectorAll('input[required], select[required], textarea[required]');

    fields.forEach(field => {
      if (!validateField(field)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Invio in corso...';

      // Simulate API call
      setTimeout(() => {
        const formData = new FormData(contactForm);
        const name = formData.get('name');

        // Show success
        submitBtn.textContent = '✓ Messaggio inviato!';
        submitBtn.classList.add('success');

        // Reset after 2 seconds
        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('success');
          formGroups.forEach(group => {
            group.classList.remove('error', 'success');
          });
          alert(`Grazie ${name}! Ti contatteremo presto.`);
        }, 2000);
      }, 1500);
    }
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
