export const toggleDarkMode = () => {
  document.querySelector("html").classList.toggle("dark");
}

export const isDarkModeActive = () =>
  document.querySelector("html").classList.contains('dark');
