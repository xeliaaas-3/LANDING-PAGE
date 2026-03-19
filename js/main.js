/* ══════════════════════════════════════════════════════
   main.js — Dra. Valentina Ríos
   Responsabilidades:
   1. Navbar — sombra al hacer scroll
   2. Menú móvil — abrir / cerrar
   3. Fade-up — animaciones de entrada
   4. Formulario — armar mensaje y abrir WhatsApp
══════════════════════════════════════════════════════ */


/* ── 1. NAVBAR — sombra al hacer scroll ─────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});


/* ── 2. DRAWER MENÚ MÓVIL ───────────────────────────── */
const menuBtn      = document.getElementById('menuBtn');
const mobileMenu   = document.getElementById('mobileMenu');
const drawerOverlay = document.getElementById('drawerOverlay');
const menuClose    = document.getElementById('menuClose');

menuBtn.addEventListener('click', openMobileMenu);
menuClose.addEventListener('click', closeMobileMenu);
drawerOverlay.addEventListener('click', closeMobileMenu);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});

function openMobileMenu() {
  mobileMenu.classList.add('open');
  drawerOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  drawerOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

window.closeMobileMenu = closeMobileMenu;

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});

function openMobileMenu() {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

// Exponer al scope global (usado en los onclick del HTML)
window.closeMobileMenu = closeMobileMenu;


/* ── 3. ANIMACIONES FADE-UP ─────────────────────────── */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Retardo escalonado para grupos de elementos
        const delay = index * 100;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));


/* ── 4. FORMULARIO → WHATSAPP ───────────────────────── */

const WHATSAPP_NUMBER = '595981771474';

function enviarWhatsApp(e) {
  e.preventDefault();

  const nombre  = document.getElementById('campo-nombre').value.trim();
  const motivo  = document.getElementById('campo-motivo').value;
  const mensaje = document.getElementById('campo-mensaje').value.trim();

  // Armar el mensaje
  let texto = `Hola! Mi nombre es *${nombre}*.`;
  if (motivo)  texto += `\nMotivo de consulta: *${motivo}*.`;
  if (mensaje) texto += `\n\n${mensaje}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
}

// Exponer al scope global (usado en el onsubmit del HTML)
window.enviarWhatsApp = enviarWhatsApp;
