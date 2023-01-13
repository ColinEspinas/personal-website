import Swup from 'swup';
import SwupA11yPlugin from '@swup/a11y-plugin';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';

import SwupSlideTheme from '@swup/slide-theme';

const enableSwup = () => new Swup({
  plugins: [
    new SwupA11yPlugin(),
    new SwupHeadPlugin(),
    new SwupScriptsPlugin(),
    new SwupSlideTheme({
      reverse: true,
    }),
    new SwupScrollPlugin({
      doScrollingRightAway: true,
      animateScroll: false,
    }),
    new SwupPreloadPlugin()
  ],
});

const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

let swup = mediaQuery.matches ? null : enableSwup();

mediaQuery.addEventListener('change', () => {
  if (mediaQuery.matches) {
    // Reduce motion = true
    swup?.destroy()
  }
  else {
    // Reduce motion = false
    if (!swup) swup = enableSwup()
  }
});

export default swup;