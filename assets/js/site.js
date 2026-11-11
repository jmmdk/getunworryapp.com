/*
 * STORE LINKS: the one place to change when the app goes live.
 * Set `url` to the real store link and `live: true`; the badges on every page update.
 * (The static fallback text inside each [data-stores] element is only shown without JavaScript.)
 */
var STORES = {
  ios: {
    live: false,
    url: '', // e.g. https://apps.apple.com/app/idXXXXXXXXXX
    label: 'App Store',
    soon: 'Coming soon to the',
    available: 'Download on the',
  },
  android: {
    live: false,
    url: '', // e.g. https://play.google.com/store/apps/details?id=com.usefulapps.unworry
    label: 'Google Play',
    soon: 'Coming soon to',
    available: 'Get it on',
  },
};

(function () {
  var ICONS = {
    ios: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.37 12.7c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.86-.76-1.47.02-2.83.86-3.59 2.17-1.53 2.66-.39 6.6 1.1 8.75.73 1.05 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.3-3.51zM14.2 6.24c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.68-.92 2.67.97.08 1.96-.49 2.56-1.22z"/></svg>',
    android: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.2 2.6c-.2.2-.3.6-.3 1v16.8c0 .4.1.8.3 1l.1.1 9.4-9.4v-.2L4.3 2.5l-.1.1zm12.6 12.6-3.1-3.1v-.2l3.1-3.1.1.1 3.7 2.1c1 .6 1 1.6 0 2.2l-3.7 2.1-.1-.1zm-.1.1-3.2-3.2-9.3 9.4c.3.4.9.4 1.6 0l10.9-6.2m0-6.6L5.8 2.5c-.7-.4-1.3-.3-1.6.1l9.3 9.3 3.2-3.2z"/></svg>',
  };

  function badge(key) {
    var s = STORES[key];
    var inner = ICONS[key] + '<span><small>' + (s.live ? s.available : s.soon) + '</small><strong>' + s.label + '</strong></span>';
    if (s.live && s.url) return '<a class="store" href="' + s.url + '" rel="noopener">' + inner + '</a>';
    return '<span class="store" role="img" aria-disabled="true" aria-label="' + s.soon + ' ' + s.label + '">' + inner + '</span>';
  }

  var html = badge('ios') + badge('android');
  var nodes = document.querySelectorAll('[data-stores]');
  for (var i = 0; i < nodes.length; i++) nodes[i].innerHTML = html;

  // Theme toggle (initial theme is set by the inline script in <head>).
  var btn = document.querySelector('.theme-toggle');
  if (btn) {
    var sync = function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      var meta = document.querySelector('meta[name="theme-color"]:not([media])');
      if (meta) meta.setAttribute('content', dark ? '#110A24' : '#2F1475');
    };
    sync();
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
  }
})();
