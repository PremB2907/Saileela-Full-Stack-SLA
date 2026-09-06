document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('mainNav');
  if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));
});
