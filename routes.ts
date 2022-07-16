// This file was added by layer0 init.
// You should commit this file to source control.

import { Router } from '@layer0/core/router'

// const ONE_HOUR = 60 * 60
// const ONE_DAY = 24 * ONE_HOUR

export default new Router()
  .get(
    '/:path*/:file.:ext(js|css|png|ico|jpg|gif|svg)',
    ({ cache, serveStatic }) => {
      cache({
        browser: {
          // cache js, css, and images in the browser for one hour...
          maxAgeSeconds: 60 * 60,
        },
        edge: {
          // ... and at the edge for one year
          maxAgeSeconds: 60 * 60 * 24 * 365,
        },
      });
      serveStatic('dist/:path*/:file.:ext');
    }
  )
  .match('/:path*', ({ cache, serveStatic, setResponseHeader }) => {
    cache({
      // prevent the browser from caching html...
      browser: false,
      edge: {
        // ...cache html at the edge for one year
        maxAgeSeconds: 60 * 60 * 24 * 365,
      },
    });
    setResponseHeader('content-type', 'text/html; charset=UTF-8');
    serveStatic('dist/:path*');
  });