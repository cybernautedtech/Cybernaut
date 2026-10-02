// Cybernaut — instant page navigation: prefetch on hover/touch + idle prefetch of visible links.
(function () {
  if (window.__cnNavSpeed) return; window.__cnNavSpeed = 1;
  var CLEAN = /(^|\.)cybernaut\.co\.in$|\.vercel\.app$/.test(location.hostname);
  var done = {}, conn = navigator.connection || {}, slow = conn.saveData || /2g/.test(conn.effectiveType || '');
  function url(a) {
    try { var u = new URL(a.getAttribute('href'), document.baseURI); } catch (e) { return null; }
    if (u.origin !== location.origin || a.target === '_blank' || a.hasAttribute('download')) return null;
    if (!/\.html$|\/$|\/[a-z0-9-]+$/.test(u.pathname)) return null;
    if (/\/[a-z0-9-]+$/.test(u.pathname) && !CLEAN) return null;
    u.hash = ''; return u.href;
  }
  function prefetch(href) {
    if (!href || done[href]) return; done[href] = 1;
    var l = document.createElement('link'); l.rel = 'prefetch'; l.href = href; l.as = 'document';
    document.head.appendChild(l);
  }
  function onIntent(e) { var a = e.target && e.target.closest && e.target.closest('a[href]'); if (a) prefetch(url(a)); }
  document.addEventListener('pointerover', onIntent, { passive: true, capture: true });
  document.addEventListener('touchstart', onIntent, { passive: true, capture: true });
  document.addEventListener('focusin', onIntent, true);
  if (slow) return;
  // warm the most common routes once the page is idle
  var idle = window.requestIdleCallback || function (f) { return setTimeout(f, 1500); };
  idle(function () {
    (CLEAN ? ['programs', 'about', 'events', 'contact', 'Navbar.dc.html', 'Footer.dc.html'] : ['Navbar.dc.html', 'Footer.dc.html'])
      .forEach(function (p) { prefetch(new URL(p, document.baseURI).href); });
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { prefetch(url(en.target)); io.unobserve(en.target); } }); });
    setTimeout(function () { document.querySelectorAll('a[href]').forEach(function (a) { if (url(a)) io.observe(a); }); }, 2500);
  }, { timeout: 4000 });
})();
