import swup from './swup';

const navItems = document.querySelectorAll('.navigation .item');
const navLinkList = document.querySelector('.navigation .links') as HTMLElement;

swup.on('animationInStart', () => {
  const currentPath = "/" + window.location.pathname.split("/")[1];
  navItems.forEach((item, index) => {
    const link = item.querySelector('a');
    if (link) {
      const isLinkActive = new URL(link.href).pathname === currentPath;
      item.classList.toggle('active', isLinkActive);
      if (isLinkActive) navLinkList.style.setProperty('--activeIndex', index.toString());
    }
  });
});