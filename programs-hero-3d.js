import * as THREE from 'https://esm.sh/three@0.160.0';
import { RoomEnvironment } from 'https://esm.sh/three@0.160.0/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'https://esm.sh/three@0.160.0/examples/jsm/geometries/RoundedBoxGeometry.js';

const BLUE = 0x2F7BFF, CYAN = 0x1FD3E8, VIOLET = 0x7C3AED;

function base(canvas, camPos, look) {
  const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  r.toneMapping = THREE.ACESFilmicToneMapping;
  r.toneMappingExposure = 1.05;
  r.outputColorSpace = THREE.SRGBColorSpace;
  r.shadowMap.enabled = true;
  r.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(r);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  const cam = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  cam.position.set(...camPos);
  const target = new THREE.Vector3(...look);
  cam.lookAt(target);
  const size = () => {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
  };
  new ResizeObserver(size).observe(canvas); size();
  r.__fit = () => { const w = canvas.clientWidth, h = canvas.clientHeight; if (w && h && (w !== r.__w || h !== r.__h)) { r.__w = w; r.__h = h; r.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); } };

  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 7, 5); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024); key.shadow.radius = 6;
  Object.assign(key.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6 });
  scene.add(key);
  const rim = new THREE.PointLight(CYAN, 40, 22); rim.position.set(-5, 3, -4); scene.add(rim);
  const fill = new THREE.PointLight(BLUE, 30, 22); fill.position.set(4, 0, 5); scene.add(fill);
  scene.add(new THREE.AmbientLight(0x223355, 0.6));

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.38 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);

  const m = { x: 0, y: 0, tx: 0, ty: 0 };
  const host = canvas.parentElement;
  host.addEventListener('pointermove', (e) => {
    const b = host.getBoundingClientRect();
    m.tx = (e.clientX - b.left) / b.width - 0.5; m.ty = (e.clientY - b.top) / b.height - 0.5;
  });
  host.addEventListener('pointerleave', () => { m.tx = 0; m.ty = 0; });
  return { r, scene, cam, floor, target, m, camBase: new THREE.Vector3(...camPos) };
}

function run(ctx, fn) {
  const clock = new THREE.Clock();
  let vis = true;
  new IntersectionObserver((es) => { vis = es[0].isIntersecting; }).observe(ctx.r.domElement);
  const frame = () => {
    requestAnimationFrame(frame);
    if (!vis) return;
    ctx.r.__fit();
    const t = clock.getElapsedTime();
    ctx.m.x += (ctx.m.tx - ctx.m.x) * 0.05; ctx.m.y += (ctx.m.ty - ctx.m.y) * 0.05;
    ctx.cam.position.set(ctx.camBase.x + ctx.m.x * 1.6, ctx.camBase.y - ctx.m.y * 0.9, ctx.camBase.z);
    ctx.cam.lookAt(ctx.target);
    fn(t);
    ctx.r.render(ctx.scene, ctx.cam);
  };
  frame();
}

function glowTex(c1 = 'rgba(31,211,232,1)') {
  const cv = document.createElement('canvas'); cv.width = cv.height = 128;
  const g = cv.getContext('2d'); const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, c1); gr.addColorStop(0.35, c1.replace(',1)', ',.35)')); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(cv);
}
function glowSprite(scale, color) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex(color), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
  s.scale.set(scale, scale, 1); return s;
}
function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
function label(text, sub, w = 1.9) {
  const cv = document.createElement('canvas'); cv.width = 640; cv.height = sub ? 200 : 150;
  const g = cv.getContext('2d');
  rr(g, 6, 6, cv.width - 12, cv.height - 12, 40);
  g.fillStyle = 'rgba(9,18,38,.88)'; g.fill();
  g.lineWidth = 4; g.strokeStyle = 'rgba(140,205,255,.55)'; g.stroke();
  g.fillStyle = '#fff'; g.font = '700 58px "Radio Canada Big", Poppins, sans-serif'; g.textBaseline = 'middle';
  g.fillText(text, 44, sub ? 76 : cv.height / 2);
  if (sub) { g.fillStyle = '#7dd3fc'; g.font = '600 36px Poppins, sans-serif'; g.fillText(sub, 44, 144); }
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthWrite: false, transparent: true }));
  s.scale.set(w, w * cv.height / cv.width, 1); return s;
}
function dust(n, spread, color, size = 0.05) {
  const geo = new THREE.BufferGeometry(); const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { p[i * 3] = (Math.random() - 0.5) * spread; p[i * 3 + 1] = Math.random() * spread * 0.6; p[i * 3 + 2] = (Math.random() - 0.5) * spread; }
  geo.setAttribute('position', new THREE.BufferAttribute(p, 3));
  return new THREE.Points(geo, new THREE.PointsMaterial({ size, color, map: glowTex(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
}
const ease = (x) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);
const bounce = (x) => { x = Math.min(Math.max(x, 0), 1); const n = 7.5625, d = 2.75; if (x < 1 / d) return n * x * x; if (x < 2 / d) return n * (x -= 1.5 / d) * x + 0.75; if (x < 2.5 / d) return n * (x -= 2.25 / d) * x + 0.9375; return n * (x -= 2.625 / d) * x + 0.984375; };

/* ---------- 2a · Laptop, code comes alive ---------- */
function laptop(canvas) {
  const ctx = base(canvas, [0.4, 2.6, 7.6], [0, 0.9, 0]);
  const { scene } = ctx; ctx.floor.position.y = 0;
  const grp = new THREE.Group(); scene.add(grp);
  const alu = new THREE.MeshPhysicalMaterial({ color: 0xb8c0cc, metalness: 1, roughness: 0.28, clearcoat: 0.4 });
  const baseM = new THREE.Mesh(new RoundedBoxGeometry(3.4, 0.14, 2.3, 4, 0.06), alu);
  baseM.position.y = 0.07; baseM.castShadow = true; grp.add(baseM);

  const kc = document.createElement('canvas'); kc.width = 1024; kc.height = 640; const kg = kc.getContext('2d');
  kg.fillStyle = '#1b2230'; kg.fillRect(0, 0, 1024, 640);
  for (let rI = 0; rI < 5; rI++) for (let c = 0; c < 14; c++) { rr(kg, 40 + c * 67, 30 + rI * 70, 58, 58, 10); kg.fillStyle = '#0d121b'; kg.fill(); }
  rr(kg, 330, 400, 360, 200, 20); kg.fillStyle = '#141b27'; kg.fill();
  const kt = new THREE.CanvasTexture(kc); kt.colorSpace = THREE.SRGBColorSpace;
  const keys = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.9), new THREE.MeshStandardMaterial({ map: kt, roughness: 0.7 }));
  keys.rotation.x = -Math.PI / 2; keys.position.set(0, 0.145, 0.05); grp.add(keys);

  const hinge = new THREE.Group(); hinge.position.set(0, 0.14, -1.13); grp.add(hinge);
  const lid = new THREE.Mesh(new RoundedBoxGeometry(3.4, 2.15, 0.08, 4, 0.04), alu);
  lid.position.set(0, 1.075, 0); lid.castShadow = true; hinge.add(lid);

  const cc = document.createElement('canvas'); cc.width = 1024; cc.height = 2048; const cg = cc.getContext('2d');
  cg.fillStyle = '#060b16'; cg.fillRect(0, 0, 1024, 2048);
  const toks = [['#7dd3fc', 'const '], ['#fff', 'app '], ['#c4b5fd', '= '], ['#1FD3E8', 'express()'], ['#94a3b8', '// learn → build → hired'], ['#fbbf24', 'function '], ['#60a5fa', 'deploy'], ['#fff', '(project) {'], ['#34d399', "  return 'offer';"], ['#fff', '}'], ['#f472b6', 'import '], ['#fff', '{ skills } '], ['#f472b6', 'from '], ['#34d399', "'cybernaut'"]];
  cg.font = '600 38px "JetBrains Mono", Menlo, monospace';
  for (let ln = 0; ln < 44; ln++) {
    let x = 40 + (ln % 4) * 40; const y = 60 + ln * 46;
    const count = 2 + (ln * 7) % 4;
    for (let k = 0; k < count; k++) { const tk = toks[(ln * 3 + k * 5) % toks.length]; cg.fillStyle = tk[0]; cg.fillText(tk[1], x, y); x += cg.measureText(tk[1]).width + 6; }
  }
  const ct = new THREE.CanvasTexture(cc); ct.colorSpace = THREE.SRGBColorSpace; ct.wrapT = THREE.RepeatWrapping; ct.repeat.set(1, 0.5);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.12, 1.9), new THREE.MeshBasicMaterial({ map: ct, toneMapped: false }));
  screen.position.set(0, 1.08, 0.045); hinge.add(screen);
  const scrGlow = glowSprite(5, 'rgba(47,123,255,1)'); scrGlow.position.set(0, 1.1, 0.4); scrGlow.material.opacity = 0.35; hinge.add(scrGlow);

  const N = 160, pg = new THREE.BufferGeometry(), pp = new Float32Array(N * 3), sp = [];
  for (let i = 0; i < N; i++) { sp.push({ x: (Math.random() - 0.5) * 3, z: (Math.random() - 0.5) * 0.6 - 0.9, y: Math.random() * 3, v: 0.4 + Math.random() * 0.8 }); }
  pg.setAttribute('position', new THREE.BufferAttribute(pp, 3));
  const pts = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.07, color: CYAN, map: glowTex(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  grp.add(pts);

  const tags = [label('Full Stack', 'React · Node', 1.6), label('Data Analytics', 'Python · SQL', 1.6), label('AI & ML', 'Models · LLMs', 1.6)];
  tags.forEach((s) => grp.add(s));

  run(ctx, (t) => {
    hinge.rotation.x = -Math.PI / 2 + ease(t / 2.2) * (Math.PI / 2 - 0.22);
    grp.rotation.y = Math.sin(t * 0.35) * 0.35 - 0.2;
    grp.position.y = Math.sin(t * 1.1) * 0.04;
    ct.offset.y = -(t * 0.035) % 1;
    scrGlow.material.opacity = 0.25 + 0.15 * Math.sin(t * 2);
    for (let i = 0; i < N; i++) { const s = sp[i]; s.y += s.v * 0.012; if (s.y > 3.6) s.y = 0.8; pp[i * 3] = s.x; pp[i * 3 + 1] = s.y + 0.4; pp[i * 3 + 2] = s.z; }
    pg.attributes.position.needsUpdate = true;
    tags.forEach((s, i) => { const a = t * 0.5 + i * (Math.PI * 2 / 3); s.position.set(Math.cos(a) * 2.6, 2.2 + Math.sin(t * 1.3 + i) * 0.25, Math.sin(a) * 1.4); s.material.opacity = Math.min(1, ease((t - 1.6 - i * 0.3) / 0.8)); });
  });
}

/* ---------- 2b · Graduation cap + certificate ---------- */
function gradcap(canvas) {
  const ctx = base(canvas, [0, 2.4, 8], [0, 1.4, 0]);
  const { scene } = ctx; ctx.floor.position.y = -0.2;
  const cap = new THREE.Group(); scene.add(cap);
  const cloth = new THREE.MeshPhysicalMaterial({ color: 0x0e1526, roughness: 0.75, sheen: 1, sheenColor: new THREE.Color(0x2F7BFF), sheenRoughness: 0.5 });
  const skull = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.05, 0.75, 64, 1, true), cloth);
  skull.material.side = THREE.DoubleSide; skull.castShadow = true; cap.add(skull);
  const board = new THREE.Mesh(new RoundedBoxGeometry(2.9, 0.09, 2.9, 3, 0.03), cloth);
  board.position.y = 0.42; board.rotation.y = Math.PI / 4; board.castShadow = true; cap.add(board);
  const gold = new THREE.MeshPhysicalMaterial({ color: 0xFFC24A, metalness: 1, roughness: 0.25 });
  const btn = new THREE.Mesh(new THREE.SphereGeometry(0.1, 32, 16), gold); btn.position.y = 0.5; cap.add(btn);
  const tassel = new THREE.Group(); tassel.position.set(0, 0.5, 0); cap.add(tassel);
  const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.45, 8), gold); cord.rotation.z = Math.PI / 2; cord.position.x = 0.72; tassel.add(cord);
  const drop = new THREE.Group(); drop.position.x = 1.44; tassel.add(drop);
  const hang = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.6, 8), gold); hang.position.y = -0.3; drop.add(hang);
  const fringe = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.42, 24, 1, true), gold); fringe.position.y = -0.75; fringe.rotation.x = Math.PI; drop.add(fringe);

  const cv = document.createElement('canvas'); cv.width = 1024; cv.height = 720; const g = cv.getContext('2d');
  const gr = g.createLinearGradient(0, 0, 1024, 720); gr.addColorStop(0, '#fdfeff'); gr.addColorStop(1, '#e6f1ff');
  g.fillStyle = gr; g.fillRect(0, 0, 1024, 720);
  g.lineWidth = 14; g.strokeStyle = '#2F7BFF'; g.strokeRect(28, 28, 968, 664);
  g.lineWidth = 3; g.strokeStyle = '#1FD3E8'; g.strokeRect(52, 52, 920, 616);
  g.textAlign = 'center'; g.fillStyle = '#2F7BFF'; g.font = '700 30px Poppins, sans-serif'; g.fillText('CYBERNAUT EDTECH', 512, 140);
  g.fillStyle = '#0A1124'; g.font = '800 64px "Radio Canada Big", sans-serif'; g.fillText('Certificate of Completion', 512, 240);
  g.fillStyle = '#475569'; g.font = '500 30px Poppins, sans-serif'; g.fillText('awarded for completing the 6-month program', 512, 320);
  g.fillStyle = '#0A1124'; g.font = '700 50px "Radio Canada Big", sans-serif'; g.fillText('Full Stack Development', 512, 410);
  g.beginPath(); g.arc(512, 540, 70, 0, Math.PI * 2); g.fillStyle = '#FFC24A'; g.fill(); g.fillStyle = '#fff'; g.font = '800 40px "Radio Canada Big"'; g.fillText('✓', 512, 556);
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  const cert = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.62), new THREE.MeshPhysicalMaterial({ map: tex, roughness: 0.45, clearcoat: 0.6, side: THREE.DoubleSide }));
  cert.castShadow = true; scene.add(cert);

  const CN = 180, conf = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.08, 0.14), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 0.4, metalness: 0.3 }), CN);
  const cols = [new THREE.Color(BLUE), new THREE.Color(CYAN), new THREE.Color(0xffffff), new THREE.Color(0xFFC24A)];
  const cd = []; const dm = new THREE.Object3D();
  for (let i = 0; i < CN; i++) { cd.push({ x: (Math.random() - 0.5) * 9, y: Math.random() * 7, z: (Math.random() - 0.5) * 5, v: 0.3 + Math.random() * 0.6, r: Math.random() * 6, rs: (Math.random() - 0.5) * 4 }); conf.setColorAt(i, cols[i % 4]); }
  scene.add(conf);
  const halo = glowSprite(6, 'rgba(47,123,255,1)'); halo.position.set(0, 1.6, -1.5); halo.material.opacity = 0.55; scene.add(halo);

  run(ctx, (t) => {
    const intro = ease(t / 1.8);
    cap.position.y = 1.6 + (1 - intro) * 3 + Math.sin(t * 1.2) * 0.12;
    cap.rotation.set(-0.35 + Math.sin(t * 0.8) * 0.06, t * 0.4, Math.sin(t * 0.6) * 0.05);
    drop.rotation.z = Math.sin(t * 2.1) * 0.25; drop.rotation.x = Math.cos(t * 1.7) * 0.2;
    const a = t * 0.45 + Math.PI * 0.2;
    cert.position.set(Math.cos(a) * 2.9, 1.3 + Math.sin(t * 0.9) * 0.2, Math.sin(a) * 1.8);
    cert.lookAt(ctx.cam.position); cert.rotateZ(Math.sin(t) * 0.06);
    for (let i = 0; i < CN; i++) { const c = cd[i]; c.y -= c.v * 0.012; c.r += c.rs * 0.016; if (c.y < -0.2) c.y = 7; dm.position.set(c.x + Math.sin(t + i) * 0.2, c.y, c.z); dm.rotation.set(c.r, c.r * 0.7, c.r * 0.3); dm.updateMatrix(); conf.setMatrixAt(i, dm.matrix); }
    conf.instanceMatrix.needsUpdate = true;
  });
}

/* ---------- 2c · 6-month career tower (v2) ---------- */
function tower(canvas) {
  const ctx = base(canvas, [6.2, 3.2, 10.5], [0, 2.1, 0]);
  const { scene, cam } = ctx; ctx.floor.position.y = 0;
  scene.fog = new THREE.FogExp2(0x050811, 0.035);

  /* floor: glowing grid + pedestal */
  const grid = new THREE.GridHelper(30, 60, 0x2F7BFF, 0x13305a);
  grid.material.transparent = true; grid.material.opacity = 0.35; grid.position.y = 0.001; scene.add(grid);
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.3, 0.22, 96), new THREE.MeshPhysicalMaterial({ color: 0x0c1730, metalness: 0.9, roughness: 0.25, clearcoat: 1 }));
  ped.position.y = 0.11; ped.receiveShadow = true; ped.castShadow = true; scene.add(ped);
  const pedRing = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.025, 12, 160), new THREE.MeshBasicMaterial({ color: CYAN, toneMapped: false }));
  pedRing.rotation.x = Math.PI / 2; pedRing.position.y = 0.23; scene.add(pedRing);
  const pedGlow = glowSprite(7, 'rgba(47,123,255,1)'); pedGlow.position.y = 0.3; pedGlow.material.opacity = 0.35; scene.add(pedGlow);

  /* shockwave rings for each landing */
  const waves = Array.from({ length: 6 }, () => { const w = new THREE.Mesh(new THREE.RingGeometry(0.9, 1, 96), new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })); w.rotation.x = -Math.PI / 2; scene.add(w); return w; });

  /* spark bursts */
  const SP = 240, sg = new THREE.BufferGeometry(), spos = new Float32Array(SP * 3), sparks = [];
  for (let i = 0; i < SP; i++) sparks.push({ life: 0, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0 });
  sg.setAttribute('position', new THREE.BufferAttribute(spos, 3));
  const sparkPts = new THREE.Points(sg, new THREE.PointsMaterial({ size: 0.09, color: 0xbff4ff, map: glowTex(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  scene.add(sparkPts);
  const burst = (y, r, n, gold) => { let k = 0; for (const p of sparks) { if (p.life > 0) continue; const a = Math.random() * Math.PI * 2; p.x = Math.cos(a) * r; p.z = Math.sin(a) * r; p.y = y; const sp = 1.5 + Math.random() * 2.5; p.vx = Math.cos(a) * sp; p.vz = Math.sin(a) * sp; p.vy = (gold ? 3 : 1) + Math.random() * 2; p.life = 1; if (++k >= n) break; } };

  const grp = new THREE.Group(); scene.add(grp);
  const steps = [['Month 1', 'Core foundations'], ['Month 2', 'Frameworks & tools'], ['Month 3', 'Capstone build'], ['Month 4', 'Team onboarding'], ['Month 5', 'Shipping features'], ['Month 6', 'Offer & placement']];
  const H = 0.6, blocks = [], tags = [], lines = [];
  steps.forEach((st, i) => {
    const last = i === 5;
    const c = last ? new THREE.Color(0xFFC24A) : new THREE.Color(BLUE).lerp(new THREE.Color(CYAN), i / 4);
    const w = 2.5 - i * 0.16;
    const mat = new THREE.MeshPhysicalMaterial({ color: c, metalness: last ? 0.85 : 0.05, roughness: last ? 0.22 : 0.08, transmission: last ? 0 : 0.7, thickness: 1.4, ior: 1.45, clearcoat: 1, clearcoatRoughness: 0.05, emissive: c, emissiveIntensity: 0.06, iridescence: last ? 0 : 0.5 });
    const b = new THREE.Mesh(new RoundedBoxGeometry(w, H - 0.05, w, 5, 0.09), mat);
    b.castShadow = true; b.receiveShadow = true;
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new RoundedBoxGeometry(w + 0.02, H - 0.03, w + 0.02, 1, 0.09)), new THREE.LineBasicMaterial({ color: last ? 0xffe3a3 : 0xc9f0ff, transparent: true, opacity: 0.6 }));
    b.add(edges);
    const seam = new THREE.Mesh(new THREE.BoxGeometry(w + 0.04, 0.035, w + 0.04), new THREE.MeshBasicMaterial({ color: last ? 0xffe3a3 : 0xbff4ff, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
    seam.position.y = -H / 2 + 0.06; b.add(seam); b.userData.seam = seam;
    grp.add(b); blocks.push({ b, w });
    const tg = label(st[0], st[1], 1.9); scene.add(tg); tags.push(tg);
    const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    const ln = new THREE.Line(lg, new THREE.LineBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0 })); scene.add(ln); lines.push(ln);
  });

  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 1.3, 12, 48, 1, true), new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false }));
  beam.position.y = 6; scene.add(beam);
  const crown = glowSprite(3, 'rgba(255,194,74,1)'); scene.add(crown);
  
  const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.34, 0), new THREE.MeshPhysicalMaterial({ color: 0xFFC24A, metalness: 1, roughness: 0.12, clearcoat: 1, emissive: 0xFF9F1C, emissiveIntensity: 0.5, flatShading: true }));
  gem.castShadow = true; scene.add(gem);
  const halos = [0, 1].map((k) => { const h = new THREE.Mesh(new THREE.TorusGeometry(1.9 + k * 0.45, 0.012, 8, 160), new THREE.MeshBasicMaterial({ color: k ? 0x7dd3fc : CYAN, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })); h.rotation.x = Math.PI / 2; scene.add(h); return h; });
  const hud = label('Month 0 / 6', '6-month sprint', 1.9); scene.add(hud);
  const d = dust(320, 14, CYAN, 0.055); scene.add(d);

  const CYCLE = 12.5, GAP = 0.95, FALL = 1.0;
  let lastLand = -1, lastCycle = -1;
  const wp = new THREE.Vector3(), tp = new THREE.Vector3();
  run(ctx, (t) => {
    const cyc = Math.floor(t / CYCLE), lt = t % CYCLE;
    if (cyc !== lastCycle) { lastCycle = cyc; lastLand = -1; }
    const NW = window.innerWidth <= 900 || ctx.r.domElement.clientWidth < 450;
    const out = lt > CYCLE - 1.1 ? ease((lt - (CYCLE - 1.1)) / 0.9) : 0;
    grp.rotation.y = t * 0.14;
    let landed = 0;
    blocks.forEach(({ b, w }, i) => {
      const k = bounce((lt - i * GAP) / FALL);
      const restY = 0.22 + H / 2 + i * H;
      b.position.y = restY + (1 - k) * 7 + out * (i + 1) * 1.1;
      b.visible = lt > i * GAP - 0.02 && out < 0.97;
      b.rotation.y = (1 - k) * 0.8;
      const hitT = i * GAP + FALL * 0.36;
      if (lt >= hitT && lastLand < i && out === 0) { lastLand = i; burst(restY - H / 2, w * 0.55, i === 5 ? 90 : 36, i === 5); const wv = waves[i]; wv.userData.t = 0; wv.position.y = restY - H / 2 + 0.01; }
      if (lt >= hitT) landed = i + 1;
      const land = Math.max(0, 1 - Math.abs(lt - hitT - 0.15) / 0.45);
      b.material.emissiveIntensity = 0.06 + land * 1.1 + (i === 5 && lt > 6 && !out ? 0.35 + 0.25 * Math.sin(t * 4) : 0);
      b.userData.seam.material.opacity = 0.35 + land * 0.65 + 0.15 * Math.sin(t * 2 + i);
      const tg = tags[i], ln = lines[i], side = i % 2 ? 1 : -1;
      b.getWorldPosition(wp);
      tp.set(side * (NW ? 2.35 : 3.1), wp.y + 0.15, 0.9); tg.position.copy(tp); if (!tg.userData.s0) tg.userData.s0 = tg.scale.clone(); tg.scale.copy(tg.userData.s0).multiplyScalar(NW ? 0.78 : 1);
      const op = b.visible ? Math.min(1, ease((lt - hitT - 0.1) / 0.45)) * (1 - out) : 0;
      tg.material.opacity = op;
      const edgeX = side * (w / 2 + 0.05);
      ln.geometry.setFromPoints([new THREE.Vector3(edgeX, wp.y, 0.3), new THREE.Vector3(side * (NW ? 1.6 : 2.2), wp.y + 0.15, 0.9)]);
      ln.material.opacity = op * 0.7;
    });
    waves.forEach((w) => { if (w.userData.t === undefined) return; w.userData.t += 0.016; const q = w.userData.t / 1.1; w.scale.setScalar(1 + q * 3.2); w.material.opacity = Math.max(0, 0.8 * (1 - q)); });
    for (let i = 0; i < SP; i++) { const p = sparks[i]; if (p.life > 0) { p.life -= 0.016 / 1.2; p.vy -= 0.09; p.x += p.vx * 0.016; p.y += p.vy * 0.016; p.z += p.vz * 0.016; if (p.y < 0.05) { p.y = 0.05; p.vy *= -0.35; } } spos[i * 3] = p.life > 0 ? p.x : 0; spos[i * 3 + 1] = p.life > 0 ? p.y : -50; spos[i * 3 + 2] = p.life > 0 ? p.z : 0; }
    sg.attributes.position.needsUpdate = true;
    sparkPts.material.opacity = 0.95;
    const done = lt > 5 * GAP + FALL * 0.4 && !out;
    const topY = 0.22 + H * 6;
    beam.material.opacity = done ? 0.09 + 0.04 * Math.sin(t * 3) : Math.max(0, beam.material.opacity - 0.01);
    const gk = done ? ease(Math.min(1, (lt - 5 * GAP - FALL * 0.4) / 0.8)) : 0;
    gem.visible = gk > 0.01; gem.scale.setScalar(gk); gem.position.set(0, topY + 0.55 + Math.sin(t * 1.6) * 0.08, 0); gem.rotation.y = t * 1.2;
    halos.forEach((h, k) => { h.position.y = 0.22 + landed * H * (k ? 0.45 : 0.9) + Math.sin(t * 1.2 + k * 2) * 0.12; h.rotation.z = t * (k ? -0.3 : 0.4); h.rotation.x = Math.PI / 2 + Math.sin(t * 0.7 + k) * 0.08; h.material.opacity = (landed ? 0.35 + 0.2 * Math.sin(t * 2 + k) : 0) * (1 - out); });
    crown.position.set(0, topY + 0.35, 0); crown.material.opacity = done ? 0.75 + 0.2 * Math.sin(t * 3) : 0;
    hud.position.set(NW ? 0 : -3.4, NW ? 6.3 : 5.4, -0.6);
    if (hud.userData.n !== landed) { hud.userData.n = landed; const nh = label('Month ' + landed + ' / 6', landed === 6 ? 'Placement ready' : 'Stacking skills', 1.9); hud.material.map.dispose(); hud.material.map = nh.material.map; hud.material.needsUpdate = true; }
    hud.material.opacity = 1 - out;
    pedRing.material.color.setHex(done ? 0xFFC24A : CYAN);
    pedGlow.material.opacity = 0.3 + (landed / 6) * 0.35;
    ctx.target.y = 1.6 + (landed / 6) * 1.2;
    ctx.camBase.y = 2.6 + (landed / 6) * 1.6;
    if (NW) { ctx.camBase.x = 1.8; ctx.camBase.z = 12.8; } else { ctx.camBase.x = 6.2; ctx.camBase.z = 10.5; }
    d.rotation.y = -t * 0.05;
  });
}

/* ---------- 2d · AI tech core with course satellites ---------- */
function core(canvas) {
  const ctx = base(canvas, [0, 1.2, 9], [0, 1.6, 0]);
  const { scene } = ctx; ctx.floor.position.y = -1.2;
  const grp = new THREE.Group(); grp.position.y = 1.6; scene.add(grp);
  const coreM = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 1), new THREE.MeshPhysicalMaterial({ color: 0x9fb8ff, metalness: 1, roughness: 0.18, clearcoat: 1, flatShading: true }));
  coreM.castShadow = true; grp.add(coreM);
  const inner = new THREE.Mesh(new THREE.SphereGeometry(0.62, 48, 32), new THREE.MeshBasicMaterial({ color: CYAN, toneMapped: false }));
  grp.add(inner);
  const shell = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.6, 1)), new THREE.LineBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending }));
  grp.add(shell);
  const glow = glowSprite(5.5, 'rgba(47,123,255,1)'); grp.add(glow);
  const glow2 = glowSprite(3, 'rgba(31,211,232,1)'); grp.add(glow2);
  const rings = [], sats = [];
  const names = [['Full Stack', 'React · Node'], ['Data Analytics', 'Python · BI'], ['AI & ML', 'Models · LLMs'], ['UI / UX', 'Figma · Research'], ['Cybersecurity', 'Ethical hacking'], ['Tech Trio', 'C · C++ · DSA']];
  [[1.15, 0.3], [0.5, -0.9], [-0.35, 1.3]].forEach(([rx, rz], i) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.6 + i * 0.35, 0.012, 8, 160), new THREE.MeshBasicMaterial({ color: i === 1 ? VIOLET : CYAN, transparent: true, opacity: 0.55, toneMapped: false }));
    const piv = new THREE.Group(); piv.rotation.set(rx, 0, rz); piv.add(ring); grp.add(piv); rings.push(piv);
  });
  names.forEach((n, i) => {
    const piv = rings[i % 3];
    const s = new THREE.Group();
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.13, 24, 16), new THREE.MeshBasicMaterial({ color: i % 2 ? CYAN : BLUE, toneMapped: false }));
    s.add(orb); const gl = glowSprite(0.8, i % 2 ? 'rgba(31,211,232,1)' : 'rgba(47,123,255,1)'); s.add(gl);
    piv.add(s);
    const tg = label(n[0], n[1], 1.5); scene.add(tg);
    sats.push({ s, piv, r: 2.6 + (i % 3) * 0.35, ph: i * 1.05, tg });
  });
  const d = dust(700, 16, 0x7dd3fc, 0.045); d.position.y = -2; scene.add(d);
  const wp = new THREE.Vector3();
  run(ctx, (t) => {
    const intro = ease(t / 2);
    grp.scale.setScalar(0.4 + 0.6 * intro);
    coreM.rotation.set(t * 0.25, t * 0.35, 0);
    shell.rotation.set(-t * 0.12, -t * 0.18, 0);
    const pulse = 0.5 + 0.5 * Math.sin(t * 2.4);
    inner.scale.setScalar(0.9 + pulse * 0.12);
    glow.material.opacity = 0.45 + pulse * 0.3; glow2.material.opacity = 0.6 + pulse * 0.3;
    rings.forEach((p, i) => { p.rotation.y = t * (0.1 + i * 0.04); });
    sats.forEach((o, i) => {
      const a = t * 0.55 + o.ph;
      o.s.position.set(Math.cos(a) * o.r, Math.sin(a) * o.r, 0);
      o.s.getWorldPosition(wp);
      o.tg.position.set(wp.x, wp.y + 0.42, wp.z);
      o.tg.material.opacity = Math.min(1, ease((t - 1.5 - i * 0.2) / 0.7)) * (wp.z > -1.2 ? 1 : 0.35);
    });
    d.rotation.y = t * 0.03;
  });
}

const SCENES = { laptop, gradcap, tower, core };
export function mount(canvas, kind) {
  try { (SCENES[kind] || core)(canvas); } catch (e) { console.error('3D scene failed', kind, e); }
}
