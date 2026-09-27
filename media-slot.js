/**
 * <media-slot> — user-fillable image OR video placeholder.
 *
 * Drag-and-drop (or click to browse) an image or a video file. Fills its
 * container by default; shape via `shape` (rect|rounded|circle|pill) or
 * `radius`. Give every slot a distinct `id` so the drop persists across
 * reloads via a sibling `.media-slots.state.json` sidecar (same
 * read-via-fetch / write-via-window.omelette contract as <image-slot>).
 *
 * Images are downscaled to WebP (~1200px longest side). Videos are stored
 * as a data URL when small enough to persist; larger clips still play for
 * the session. Videos render muted + looping + autoplay (poster-free).
 *
 * Attributes: id, shape, radius, placeholder, fit (cover|contain),
 *             src (optional initial image/video URL).
 */
(() => {
  const STATE_FILE = '.media-slots.state.json';
  const IMG_ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/gif'];
  const MAX_DIM = 1200;
  // Cap for persisting a video into the JSON sidecar (data URL ~1.37× bytes).
  const VIDEO_PERSIST_MAX = 14 * 1024 * 1024;

  const subs = new Set();
  let slots = {};
  const tombstones = new Set();
  let loaded = false, loadP = null;

  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE)
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j && typeof j === 'object') {
          const merged = Object.assign({}, j, slots);
          for (const id of tombstones) delete merged[id];
          slots = merged;
        }
        tombstones.clear();
      })
      .catch(() => {})
      .then(() => { loaded = true; subs.forEach((fn) => fn()); });
    return loadP;
  }

  let saving = false, saveDirty = false;
  function save() {
    if (saving) { saveDirty = true; return; }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots)))
      .catch(() => {})
      .then(() => { saving = false; if (saveDirty) { saveDirty = false; save(); } });
  }

  function getSlot(id) { return id ? (slots[id] || null) : null; }
  function setSlot(id, val) {
    if (!id) return;
    if (val) { slots[id] = val; tombstones.delete(id); }
    else { delete slots[id]; if (!loaded) tombstones.add(id); }
    subs.forEach((fn) => fn());
    if (loaded) save(); else load().then(save);
  }

  async function imgToDataUrl(file, targetW) {
    if (file.type === 'image/gif') return fileToDataUrl(file); // keep animation
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round((targetW || MAX_DIM) * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return c.toDataURL('image/webp', 0.85);
    } finally { bitmap.close && bitmap.close(); }
  }
  function fileToDataUrl(file) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
  }

  const css =
    ':host{display:block;position:relative;font:13px/1.3 system-ui,-apple-system,sans-serif;' +
    '  width:100%;height:100%;aspect-ratio:3/2;color:inherit}' +
    '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(127,127,127,.08)}' +
    '.frame img,.frame video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:none}' +
    ':host([data-fit=contain]) .frame img,:host([data-fit=contain]) .frame video{object-fit:contain}' +
    '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' +
    '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' +
    '  cursor:pointer;user-select:none}' +
    '.empty svg{opacity:.45}.empty .cap{max-width:90%;font-weight:500;opacity:.78}' +
    '.empty .sub{font-size:11px;opacity:.6}.empty:hover .sub{opacity:1}' +
    '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed currentColor;opacity:.35;' +
    '  transition:border-color .12s,opacity .12s}' +
    ':host([data-over]) .ring{border-color:#c96442;opacity:1}' +
    ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;background:rgba(201,100,66,.10)}' +
    ':host([data-filled]) .ring{display:none}' +
    '.ctl{position:absolute;top:8px;right:8px;display:flex;gap:6px;opacity:0;pointer-events:none;' +
    '  transition:opacity .12s;z-index:2}' +
    ':host([data-filled][data-editable]:hover) .ctl{opacity:1;pointer-events:auto}' +
    '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' +
    '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,sans-serif;backdrop-filter:blur(6px)}' +
    '.ctl button:hover{background:rgba(0,0,0,.82)}' +
    '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' +
    '  background:rgba(255,255,255,.9);padding:4px 6px;border-radius:5px;pointer-events:none}' +
    '@media print{.ctl{display:none!important}}';

  const icon =
    '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
    'stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/>' +
    '<circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/><path d="m10 11 4 2.5-4 2.5z" fill="currentColor" stroke="none"/></svg>';

  class MediaSlot extends HTMLElement {
    static get observedAttributes() { return ['shape', 'radius', 'placeholder', 'fit', 'src', 'id']; }

    constructor() {
      super();
      const root = this.shadowRoot || this.attachShadow({ mode: 'open', clonable: true });
      root.innerHTML =
        '<style>' + css + '</style>' +
        '<div class="frame"><img alt="" draggable="false"><video muted loop playsinline></video>' +
        '  <div class="empty">' + icon + '<div class="cap"></div>' +
        '  <div class="sub">image or video · <u>browse</u></div></div>' +
        '  <div class="ring"></div></div>' +
        '<div class="ctl"><button data-act="replace">Replace</button><button data-act="clear">Clear</button></div>' +
        '<input type="file" accept="image/*,video/*" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('img');
      this._vid = root.querySelector('video');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._ctl = root.querySelector('.ctl');
      this._input = root.querySelector('input');
      this._err = null; this._depth = 0; this._gen = 0; this._local = null;
      this._subFn = () => this._render();

      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', (e) => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act || !this.hasAttribute('data-editable')) return;
        if (act === 'replace') this._input.click();
        if (act === 'clear') { this._local = null; setSlot(this.id || '', null); if (!this.id) this._render(); }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
    }

    connectedCallback() {
      if (!this.id && !MediaSlot._warned) {
        MediaSlot._warned = true;
        console.warn('<media-slot> without an id will not persist its upload.');
      }
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((t) => this.addEventListener(t, this));
      subs.add(this._subFn);
      this.addEventListener('pointerenter', this._subFn);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((t) => this.removeEventListener(t, this));
    }
    attributeChangedCallback() { if (this.shadowRoot) this._render(); }

    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        e.preventDefault(); e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        if (--this._depth <= 0) { this._depth = 0; this.removeAttribute('data-over'); }
      } else if (e.type === 'drop') {
        e.preventDefault(); e.stopPropagation();
        this._depth = 0; this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }

    async _ingest(file) {
      this._setError(null);
      const gen = ++this._gen;
      const isImg = file.type.indexOf('image/') === 0;
      const isVid = file.type.indexOf('video/') === 0;
      if (!isImg && !isVid) { this._setError('Drop an image or a video file.'); return; }
      try {
        let val;
        if (isImg) {
          if (IMG_ACCEPT.indexOf(file.type) < 0) { this._setError('Use PNG, JPEG, WebP, AVIF or GIF.'); return; }
          const w = this.clientWidth || MAX_DIM;
          val = { u: await imgToDataUrl(file, w), t: 'image' };
        } else {
          if (file.size <= VIDEO_PERSIST_MAX) {
            val = { u: await fileToDataUrl(file), t: 'video' };
          } else {
            // Too large to store — play this session only via object URL.
            val = { u: URL.createObjectURL(file), t: 'video', session: true };
            this._setError('Video too large to save — showing for this session.');
          }
        }
        if (gen !== this._gen) return;
        if (val.session || !this.id) { this._local = val; this._render(); }
        if (this.id && !val.session) setSlot(this.id, val);
        else if (this.id && val.session) { this._local = val; this._render(); }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that file.');
        console.warn('<media-slot> ingest failed:', err);
      }
    }

    _setError(msg) {
      if (this._err) { this._err.remove(); this._err = null; }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err'; d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => { if (this._err === d) { d.remove(); this._err = null; } }, 3400);
    }

    _render() {
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';
      else if (shape === 'pill') radius = '9999px';
      else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = radius;
      this._ring.style.borderRadius = radius;
      this.setAttribute('data-fit', (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain' ? 'contain' : 'cover');

      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      let stored = this.id ? getSlot(this.id) : null;
      if (this._local) stored = this._local;
      if (stored && stored.u && !/^(data:|blob:)/i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      const url = (stored && stored.u) || srcAttr;
      const type = stored ? stored.t : (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(srcAttr) ? 'video' : 'image');

      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image or video';

      if (url && type === 'video') {
        if (this._vid.getAttribute('src') !== url) { this._vid.src = url; this._vid.play && this._vid.play().catch(() => {}); }
        this._vid.style.display = 'block';
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
      } else if (url) {
        if (this._img.getAttribute('src') !== url) this._img.src = url;
        this._img.style.display = 'block';
        this._vid.style.display = 'none';
        this._vid.pause && this._vid.pause();
        this._vid.removeAttribute('src');
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
      } else {
        this._img.style.display = 'none';
        this._vid.style.display = 'none';
        this._img.removeAttribute('src');
        this._vid.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }

  if (!customElements.get('media-slot')) customElements.define('media-slot', MediaSlot);
})();
