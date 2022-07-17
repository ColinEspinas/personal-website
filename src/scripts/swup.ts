import Swup from 'swup';
import SwupA11yPlugin from '@swup/a11y-plugin';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';

import SwupSlideTheme from '@swup/slide-theme';

const swup = new Swup({
  plugins: [
    new SwupA11yPlugin(),
    new SwupHeadPlugin(),
    new SwupSlideTheme({
      reverse: true,
    }),
    new SwupScrollPlugin({
      doScrollingRightAway: true,
      animateScroll: false,
    }),
  ],
});

export default swup;