import swup from './swup';

const navItems = document.querySelectorAll('.navigation .item');

swup.on('contentReplaced', () => {
  const currentPath = window.location.pathname;
  navItems.forEach(item => {
    const link = item.querySelector('a');
    if (link) item.classList.toggle('active', new URL(link.href).pathname === currentPath);
  });
});