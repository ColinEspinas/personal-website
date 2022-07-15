import Snd from 'snd-lib';

localStorage.setItem('sounds', 'false');

const snd = new Snd();

snd.load(Snd.KITS.SND01).then(() => {
  document.querySelectorAll('.button').forEach((button: HTMLLinkElement) => {
    button.addEventListener('click', (e) => {
      if (localStorage.sounds === 'true') snd.playButton();
    });
    button.addEventListener('mouseenter', (e) => {
      if (localStorage.sounds === 'true') snd.play(Snd.SOUNDS.TOGGLE_ON);
    });
  });
});

