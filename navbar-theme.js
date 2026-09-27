// Cybernaut navbar theme/scroll controller — runs in page context.
(function () {
  if (window.__cnNavThemeInit) return;
  window.__cnNavThemeInit = true;

  function detectDark(nav) {
    var r = nav.getBoundingClientRect();
    var stack = document.elementsFromPoint(Math.round(window.innerWidth / 2), Math.round(r.bottom + 14)) || [];
    function lumArr(p) { return (0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]) / 255; }
    function lumHex(h) { return lumArr([parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]); }
    for (var i = 0; i < stack.length; i++) {
      var nd = stack[i];
      if (nav.contains(nd)) continue;
      var c = nd;
      while (c && c !== document.documentElement) {
        var cs = getComputedStyle(c);
        var bg = cs.backgroundColor;
        if (bg && bg.slice(0, 3) === 'rgb') {
          var p = bg.replace(/[^0-9.,]/g, '').split(',').map(parseFloat);
          var a = p.length > 3 ? p[3] : 1;
          if (a > 0.5) return lumArr(p) < 0.5;
        }
        var bi = cs.backgroundImage;
        if (bi && bi.indexOf('gradient') !== -1 && bi.indexOf('transparent') === -1) {
          var L = 0, n = 0;
          var hx = bi.match(/#([0-9a-f]{6})/ig);
          if (hx) hx.forEach(function (x) { L += lumHex(x.slice(1)); n++; });
          var rgbs = bi.match(/rgba?\(([^)]+)\)/ig);
          if (rgbs) rgbs.forEach(function (x) {
            var q = x.replace(/[^0-9.,]/g, '').split(',').map(parseFloat);
            var al = q.length > 3 ? q[3] : 1;
            if (al > 0.5) { L += lumArr(q); n++; }
          });
          if (n) return L / n < 0.5;
        }
        c = c.parentElement;
      }
    }
    return false;
  }

  function init() {
    var nav = document.querySelector('[data-cn-nav]');
    if (!nav) return setTimeout(init, 150);
    var ht = nav.getAttribute('data-hero-theme') || 'auto';
    var autoDark;
    function isDark() {
      if (ht === 'dark') return true;
      if (ht === 'light') return false;
      if (autoDark === undefined) autoDark = detectDark(nav);
      return autoDark;
    }
    function apply(sc) {
      var logo = nav.querySelector('img');
      if (sc) {
        nav.style.background = '#ffffff';
        nav.style.backdropFilter = 'blur(16px)';
        nav.style.borderBottom = '1px solid #E6ECF3';
        nav.style.padding = '8px 0';
        nav.style.setProperty('--nav-fg', '#334155');
        nav.style.setProperty('--nav-line', '#DCE3EC');
        if (logo) { logo.style.height = '32px'; logo.src = 'cybernaut-logo.webp'; }
      } else {
        var dark = isDark();
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.borderBottom = '1px solid transparent';
        nav.style.padding = '14px 0';
        nav.style.setProperty('--nav-fg', dark ? '#ffffff' : '#334155');
        nav.style.setProperty('--nav-line', dark ? 'rgba(255,255,255,.35)' : '#DCE3EC');
        if (logo) { logo.style.height = '38px'; logo.src = dark ? 'footer-logo.webp' : 'cybernaut-logo.webp'; }
      }
    }
    var ticking = false, scrolled = null;
    function run() {
      ticking = false;
      var now = window.scrollY > 30;
      if (now === scrolled) return;
      scrolled = now;
      apply(now);
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
    run();
    if (ht === 'auto') {
      [400, 1200, 2600].forEach(function (t) {
        setTimeout(function () {
          var d = detectDark(nav);
          if (d !== autoDark) { autoDark = d; if (window.scrollY <= 30) apply(false); }
        }, t);
      });
    }
    // active underline
    var alias = { 'Blogs': 'Resources', 'Careers': 'Resources', 'Insights': 'Resources' };
    var key = nav.getAttribute('data-active') || '';
    key = alias[key] || key;
    if (key) {
      var mark = function (tries) {
        var link = nav.querySelector('[data-nav-key="' + key + '"]');
        var und = nav.querySelector('[data-nav-underline="' + key + '"]');
        if (!link && tries > 0) return setTimeout(function () { mark(tries - 1); }, 200);
        if (link) link.style.color = '#2F7BFF';
        if (und) und.style.transform = 'scaleX(1)';
      };
      mark(10);
    }
  }
  init();
})();
