const openBtn = document.getElementById('openBtn');
const btnIcon = document.getElementById('btnIcon');

openBtn.addEventListener('mouseenter', () => {
  btnIcon.classList.replace('fa-envelope', 'fa-envelope-open');
});

openBtn.addEventListener('mouseleave', () => {
  btnIcon.classList.replace('fa-envelope-open', 'fa-envelope');
});
