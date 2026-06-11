// ========== DARK MODE TOGGLE ==========
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Cek localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Mode Terang';
  } else {
    localStorage.setItem('darkMode', 'disabled');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Mode Gelap';
  }
});

// ========== BACK TO TOP BUTTON ==========
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== FORM VALIDASI (JavaScript Wajib) ==========
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const msgError = document.getElementById('msgError');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  // Reset error & success
  nameError.textContent = '';
  emailError.textContent = '';
  msgError.textContent = '';
  formSuccess.textContent = '';

  // Validasi Nama
  if (nameInput.value.trim() === '') {
    nameError.textContent = 'Nama tidak boleh kosong';
    isValid = false;
  } else if (nameInput.value.trim().length < 2) {
    nameError.textContent = 'Nama minimal 2 karakter';
    isValid = false;
  }

  // Validasi Email
  const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
  if (emailInput.value.trim() === '') {
    emailError.textContent = 'Email tidak boleh kosong';
    isValid = false;
  } else if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = 'Masukkan email yang valid (contoh: nama@domain.com)';
    isValid = false;
  }

  // Validasi Pesan
  if (messageInput.value.trim() === '') {
    msgError.textContent = 'Pesan tidak boleh kosong';
    isValid = false;
  } else if (messageInput.value.trim().length < 5) {
    msgError.textContent = 'Pesan minimal 5 karakter';
    isValid = false;
  }

  if (isValid) {
    formSuccess.textContent = '✓ Pesanan terkirim! Kami akan menghubungi Anda segera.';
    form.reset();
    // Optional: reset after 3 seconds
    setTimeout(() => {
      formSuccess.textContent = '';
    }, 4000);
  }
});

// ========== SMOOTH SCROLL UNTUK NAVIGATION ==========
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ========== ANIMASI COUNTER (Fitur Tambahan - Nilai Plus) ==========
// Fungsi counter sederhana ketika elemen masuk viewport
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = document.querySelectorAll('.stat-number');
      counters.forEach(counter => {
        const updateCount = () => {
          const target = parseInt(counter.getAttribute('data-target'));
          const current = parseInt(counter.innerText);
          const increment = target / 50;
          if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

// Jika ada elemen dengan class stat-number, observe
// (opsional, untuk demo nilai tambah - kita tambahkan statistik di about? Bisa ditambahkan jika ingin)
// Saya sertakan sebagai