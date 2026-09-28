// Cybernaut — Programs hero particle morph (Month 1 → Month 6). ES module: mount(canvas) → stop()
const ease = (p) => (p < 0 ? 0 : p > 1 ? 1 : 1 - Math.pow(1 - p, 3));
const rr = (o, x, y, w, h, r) => { o.beginPath(); o.moveTo(x + r, y); o.arcTo(x + w, y, x + w, y + h, r); o.arcTo(x + w, y + h, x, y + h, r); o.arcTo(x, y + h, x, y, r); o.arcTo(x, y, x + w, y, r); o.closePath(); };

function sample(draw, n) {
  const W = 400, H = 400, oc = document.createElement('canvas'); oc.width = W; oc.height = H; const o = oc.getContext('2d');
  o.fillStyle = '#fff'; o.strokeStyle = '#fff'; o.lineCap = 'round'; o.lineJoin = 'round'; draw(o);
  const d = o.getImageData(0, 0, W, H).data, on = (x, y) => x >= 0 && y >= 0 && x < W && y < H && d[(y * W + x) * 4 + 3] > 128;
  const edge = [], fill = [];
  for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) { if (!on(x, y)) continue; const p = [(x - W / 2) / W, (y - H / 2) / W]; (!on(x - 3, y) || !on(x + 3, y) || !on(x, y - 3) || !on(x, y + 3) ? edge : fill).push(p); }
  const pick = (arr, k, off) => Array.from({ length: k }, (_, i) => arr[Math.floor((i * 0.61803398875 + off) * arr.length) % arr.length]);
  const ne = Math.round(n * .45), pts = pick(edge.length ? edge : fill, ne, .1).concat(pick(fill.length ? fill : edge, n - ne, .37));
  for (let i = pts.length - 1; i > 0; i--) { const j = (i * 2654435761) % (i + 1); const t = pts[i]; pts[i] = pts[j]; pts[j] = t; }
  return pts;
}
function shapes(N) {
  const digit = (ch) => (o) => { o.font = "800 380px 'Radio Canada Big', sans-serif"; o.textAlign = 'center'; o.textBaseline = 'middle'; o.fillText(ch, 200, 215); };
  const icons = [
    (o) => { o.lineWidth = 30; o.beginPath(); o.moveTo(130, 120); o.lineTo(50, 200); o.lineTo(130, 280); o.moveTo(270, 120); o.lineTo(350, 200); o.lineTo(270, 280); o.moveTo(232, 92); o.lineTo(168, 308); o.stroke(); },
    (o) => { o.beginPath(); const T = 10; for (let i = 0; i < T; i++) { const a0 = i / T * 6.283, a = 6.283 / T; [[a0 - a * .18, 150], [a0 - a * .06, 172], [a0 + a * .2, 172], [a0 + a * .32, 150]].forEach(([ang, r]) => o.lineTo(200 + Math.cos(ang) * r, 200 + Math.sin(ang) * r)); } o.closePath(); o.fill(); o.globalCompositeOperation = 'destination-out'; o.beginPath(); o.arc(200, 200, 62, 0, 6.283); o.fill(); o.globalCompositeOperation = 'source-over'; o.lineWidth = 14; o.beginPath(); o.arc(200, 200, 30, 0, 6.283); o.stroke(); },
    (o) => { o.lineWidth = 22; rr(o, 40, 80, 320, 240, 24); o.stroke(); o.beginPath(); o.moveTo(40, 138); o.lineTo(360, 138); o.stroke(); [78, 112, 146].forEach((cx) => { o.beginPath(); o.arc(cx, 109, 10, 0, 6.283); o.fill(); }); rr(o, 78, 170, 104, 116, 10); o.fill(); rr(o, 206, 172, 118, 22, 8); o.fill(); rr(o, 206, 214, 118, 22, 8); o.fill(); rr(o, 206, 256, 76, 22, 8); o.fill(); },
    (o) => { o.lineWidth = 24; rr(o, 40, 130, 320, 200, 26); o.stroke(); rr(o, 140, 76, 120, 66, 18); o.stroke(); o.beginPath(); o.moveTo(40, 214); o.lineTo(360, 214); o.stroke(); rr(o, 176, 192, 48, 46, 8); o.fill(); },
    (o) => { o.lineWidth = 22; o.beginPath(); o.moveTo(50, 60); o.lineTo(50, 340); o.lineTo(355, 340); o.stroke(); [[92, 270], [162, 230], [232, 180], [302, 120]].forEach(([bx, by]) => { rr(o, bx, by, 44, 320 - by, 8); o.fill(); }); o.lineWidth = 16; o.beginPath(); o.moveTo(90, 210); o.lineTo(170, 160); o.lineTo(230, 180); o.lineTo(330, 80); o.stroke(); o.beginPath(); o.moveTo(280, 76); o.lineTo(338, 72); o.lineTo(334, 130); o.stroke(); },
    (o) => { o.beginPath(); o.moveTo(110, 60); o.lineTo(290, 60); o.lineTo(280, 170); o.quadraticCurveTo(200, 262, 120, 170); o.closePath(); o.fill(); o.lineWidth = 22; o.beginPath(); o.moveTo(112, 92); o.quadraticCurveTo(40, 96, 62, 150); o.quadraticCurveTo(78, 184, 128, 180); o.moveTo(288, 92); o.quadraticCurveTo(360, 96, 338, 150); o.quadraticCurveTo(322, 184, 272, 180); o.stroke(); o.fillRect(182, 220, 36, 60); rr(o, 128, 274, 144, 30, 10); o.fill(); rr(o, 106, 312, 188, 30, 10); o.fill(); o.globalCompositeOperation = 'destination-out'; o.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 16 : 36; o.lineTo(200 + Math.cos(a) * r, 130 + Math.sin(a) * r); } o.closePath(); o.fill(); o.globalCompositeOperation = 'source-over'; }
  ];
  return { digits: ['1', '2', '3', '4', '5', '6'].map((c) => sample(digit(c), N)), icons: icons.map((f) => sample(f, N)) };
}

const TITLES = ['Foundations', 'Core Skills', 'Projects', 'Internship', 'Real Work', 'Career Offer'];
const SKILLS = ['Programming basics · Logic · Git', 'Core stack · Frameworks · APIs', 'Build real portfolio projects', 'Join a real product team', 'Ship live features to users', 'Placement offer in hand'];

export function mount(c) {
  if (!c || c.__morph) return () => {}; c.__morph = 1;
  const t0 = performance.now(); let raf = 0, vis = true, M = null;
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => es.forEach((e) => { vis = e.isIntersecting; }), { threshold: 0 }) : null; io && io.observe(c);
  const host = c.closest('[data-morph-host]') || c.parentElement;
  const pt = (e) => { if (!M) return; const b = c.getBoundingClientRect(); M.mx = (e.clientX - b.left) * (c.clientWidth / b.width); M.my = (e.clientY - b.top) * (c.clientHeight / b.height); };
  const out = () => { if (M) M.mx = M.my = -1e4; };
  host.addEventListener('pointermove', pt, { passive: true }); host.addEventListener('pointerleave', out); host.addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') out(); });

  function frame() {
    raf = requestAnimationFrame(frame);
    if (!vis || document.hidden) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1), w = c.clientWidth, h = c.clientHeight; if (!w || !h) return;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
    const x = c.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0); x.clearRect(0, 0, w, h);
    const av = host.querySelector('[data-morph-avoid]'), cbr = c.getBoundingClientRect(), abr = av ? av.getBoundingClientRect() : null, beside = !!abr && abr.bottom > cbr.top + 4 && abr.top < cbr.bottom - 4 && abr.right > cbr.left;
    const t = (performance.now() - t0) / 1000, mobile = av ? !beside : w < 640, S = Math.min(w, h * (mobile ? 1.05 : 1)), N = mobile ? 1400 : 2200;
    let safeL = 0;
    if (!mobile && beside) { const k = c.clientWidth / (cbr.width || 1); safeL = Math.max(0, Math.min(w * .62, (abr.right - cbr.left) * k + 24)); }
    const fw = w - safeL, S2 = mobile ? S : Math.min(S, fw * 1.05);
    const cx = safeL + fw * .5, cy = mobile ? h * .38 : h * .43, sc = S2 * (mobile ? .66 : .72);
    const fontOk = !!(document.fonts && document.fonts.check("800 40px 'Radio Canada Big'"));
    if (!M || M.N !== N) { let s = 11; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647); M = { N, ps: Array.from({ length: N }, () => ({ x: cx + (r() - .5) * w, y: cy + (r() - .5) * h, vx: 0, vy: 0, k: .022 + r() * .03, r: r(), a: r() * 6.28 })), mx: -1e4, my: -1e4 }; }
    if (!M.sh || (!M.fontOk && fontOk)) { M.sh = shapes(N); M.fontOk = fontOk; }
    const DIG = 1.2, STEP = 3.8, cyc = STEP * 6 + 1.8, p = t % cyc, burst = p >= STEP * 6;
    const mi = burst ? 5 : Math.floor(p / STEP), inStep = burst ? 0 : p - mi * STEP, local = inStep / STEP, showIcon = inStep >= DIG;
    const lerp = (a, b, f) => a + (b - a) * f, hf = mi / 5, cr = Math.round(lerp(70, 40, hf)), cg = Math.round(lerp(140, 220, hf)), cb = Math.round(lerp(255, 240, hf));
    const shape = showIcon ? M.sh.icons[mi] : M.sh.digits[mi], since = showIcon ? inStep - DIG : inStep;
    const swirl = !burst && since < .45 ? 1 - since / .45 : 0, settle = !burst && since > .7 ? Math.min(1, (since - .7) / .5) : 0;
    const damp = .84 - settle * .08, kb = 1 + settle * 1.6, breath = .004 * (1 - settle * .7), RR = mobile ? 3600 : 8100;
    x.globalCompositeOperation = 'lighter';
    for (let i = 0; i < N; i++) {
      const q = M.ps[i]; let tx, ty;
      if (burst) { const b = (p - STEP * 6) / 1.8, ang = q.a + t * .6, rad = S2 * (.3 + q.r * .1) * (b < .55 ? ease(b / .55) : 1); tx = cx + Math.cos(ang) * rad; ty = cy + Math.sin(ang) * rad * .9; }
      else { const s = shape[i], br = 1 + breath * Math.sin(t * 2.2 + q.a); tx = cx + s[0] * sc * br; ty = cy + s[1] * sc * br; }
      let fx = (tx - q.x) * q.k * kb, fy = (ty - q.y) * q.k * kb;
      if (swirl) { const dx = q.x - cx, dy = q.y - cy; fx += -dy * .0045 * swirl; fy += dx * .0045 * swirl; }
      const mdx = q.x - M.mx, mdy = q.y - M.my, md2 = mdx * mdx + mdy * mdy;
      if (md2 < RR) { const f = (1 - md2 / RR) * 3.2 / Math.sqrt(md2 + 1); fx += mdx * f; fy += mdy * f; }
      q.vx = (q.vx + fx) * damp; q.vy = (q.vy + fy) * damp; q.x += q.vx; q.y += q.vy;
      const sp = Math.min(1, Math.hypot(q.vx, q.vy) / 6), al = .45 + q.r * .45 + sp * .1, sz = (mobile ? 1.2 : 1.3) + q.r * .9;
      x.fillStyle = `rgba(${cr},${cg},${cb},${al})`; x.fillRect(q.x - sz / 2, q.y - sz / 2, sz, sz);
      if (q.r > .95) { x.fillStyle = `rgba(${cr},${cg},${cb},.10)`; x.fillRect(q.x - 3, q.y - 3, 6, 6); }
    }
    x.globalCompositeOperation = 'source-over';
    // HUD
    const bw = mobile ? Math.min(w - 48, 360) : Math.min(S2 * .60, fw - 40), lx = cx - bw / 2, hy = mobile ? h - 118 : h - S2 * .19;
    const f1 = mobile ? 11 : Math.round(S2 * .018) + 5, f2 = mobile ? 20 : Math.round(S2 * .03) + 6, f3 = mobile ? 13 : Math.round(S2 * .016) + 5, f4 = mobile ? 10 : Math.round(S2 * .014) + 4;
    x.textAlign = 'left';
    x.font = `800 ${f1}px Orbitron, sans-serif`; x.fillStyle = `rgb(${cr},${cg},${cb})`; x.fillText(burst ? 'MONTH 06 · COMPLETE' : 'MONTH 0' + (mi + 1), lx, hy);
    x.font = `700 ${f2}px 'Radio Canada Big', sans-serif`; x.fillStyle = '#fff'; x.fillText(burst ? 'You are career ready' : TITLES[mi], lx, hy + f2 * 1.35);
    if (!burst && showIcon) { x.globalAlpha = Math.min(1, since / .5); x.font = `500 ${f3}px Poppins, sans-serif`; x.fillStyle = 'rgba(190,205,228,.95)'; x.fillText(SKILLS[mi], lx, hy + f2 * 1.35 + f3 * 1.7); x.globalAlpha = 1; }
    const chip = burst ? 'OFFER' : (mi < 3 ? 'LEARNING' : 'INTERNSHIP');
    x.font = `600 ${f4}px Poppins, sans-serif`; const cw = x.measureText(chip).width + 20, chh = f4 * 2.3, chx = lx + bw - cw, chy = hy - f1 - (chh - f1) / 2 + 1;
    x.fillStyle = `rgba(${cr},${cg},${cb},.16)`; x.strokeStyle = `rgba(${cr},${cg},${cb},.6)`; x.beginPath(); x.roundRect ? x.roundRect(chx, chy, cw, chh, 100) : x.rect(chx, chy, cw, chh); x.fill(); x.stroke();
    x.fillStyle = '#fff'; x.fillText(chip, chx + 10, chy + chh / 2 + f4 * .36);
    const by = hy + f2 * 1.35 + f3 * 1.7 + (mobile ? 18 : S2 * .03), seg = bw / 6;
    for (let i = 0; i < 6; i++) { const f = burst || i < mi ? 1 : i === mi ? ease(local) : 0; x.fillStyle = 'rgba(148,163,184,.18)'; x.fillRect(lx + i * seg + 2, by, seg - 4, 4); x.fillStyle = i < 3 ? '#2F7BFF' : '#1FD3E8'; x.fillRect(lx + i * seg + 2, by, (seg - 4) * f, 4); }
  }
  frame();
  return () => { cancelAnimationFrame(raf); io && io.disconnect(); host.removeEventListener('pointermove', pt); host.removeEventListener('pointerleave', out); c.__morph = 0; };
}
