/* @ds-bundle: {"format":3,"namespace":"CybernautDesignSystem_59c3d8","components":[{"name":"Badge","sourcePath":"components/actions/Badge.jsx"},{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"CardHeader","sourcePath":"components/display/Card.jsx"},{"name":"CardTitle","sourcePath":"components/display/Card.jsx"},{"name":"CardDescription","sourcePath":"components/display/Card.jsx"},{"name":"CardBody","sourcePath":"components/display/Card.jsx"},{"name":"CardFooter","sourcePath":"components/display/Card.jsx"},{"name":"StatCard","sourcePath":"components/display/StatCard.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"ProgressRing","sourcePath":"components/portal/ProgressRing.jsx"},{"name":"SidebarLink","sourcePath":"components/portal/SidebarLink.jsx"}],"sourceHashes":{"components/actions/Badge.jsx":"6a7a111bb959","components/actions/Button.jsx":"d04f343400b3","components/display/Avatar.jsx":"1cbceee7cde1","components/display/Card.jsx":"413b278d7835","components/display/StatCard.jsx":"5ebb58f30ba2","components/forms/Checkbox.jsx":"6973f9e0d926","components/forms/Input.jsx":"52805fcea78d","components/portal/ProgressRing.jsx":"26fb2af61642","components/portal/SidebarLink.jsx":"a0721683311f","ui_kits/portal/Shell.jsx":"809e55074868","ui_kits/portal/app.jsx":"c480c16fd431","ui_kits/portal/screens.jsx":"0124ec022ca0","ui_kits/portal/screens2.jsx":"48963e99457f","ui_kits/portal/ui.jsx":"5c8c5397c7ae","ui_kits/website/app.jsx":"aab2da148bc3","ui_kits/website/sections.jsx":"6844dd8d7d93","ui_kits/website/ui.jsx":"1adcc4643d1b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CybernautDesignSystem_59c3d8 = window.CybernautDesignSystem_59c3d8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "cn-badge-styles";
function useBadgeStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .cn-badge{
    font-family: var(--font-body, sans-serif);
    font-weight: var(--fw-semibold, 600);
    display:inline-flex; align-items:center; gap:.35em;
    font-size: var(--fs-xs, 12px); line-height:1;
    padding:.35em .7em; border-radius: var(--radius-pill, 9999px);
    border:1px solid transparent; white-space:nowrap;
  }
  .cn-badge--soft{ border-radius: var(--radius-sm, 6px); }
  .cn-badge__dot{ width:.5em; height:.5em; border-radius:50%; background:currentColor; }
  .cn-badge--primary{ background:var(--color-primary,#00a2ff); color:#fff; }
  .cn-badge--brand{ background:var(--cn-gradient-portal); color:#fff; }
  .cn-badge--neutral{ background:var(--surface-subtle,#f4f4f5); color:var(--text-strong,#121212); }
  .cn-badge--outline{ background:transparent; color:var(--text-strong,#121212); border-color:var(--border-subtle,#e4e4e7); }
  .cn-badge--success{ background:#dcfce7; color:#15803d; }
  .cn-badge--warning{ background:#fef9c3; color:#a16207; }
  .cn-badge--danger{ background:#fee2e2; color:#b91c1c; }
  .cn-badge--info{ background:var(--cn-blue-50,#e6f6ff); color:var(--cn-blue-600,#0370af); }
  `;
  document.head.appendChild(el);
}

/**
 * Cybernaut Badge — compact status / category label.
 * Tone variants map to the semantic palette; `brand` uses the portal gradient.
 */
function Badge({
  variant = "neutral",
  soft = false,
  dot = false,
  className = "",
  children,
  ...props
}) {
  useBadgeStyles();
  const cls = ["cn-badge", `cn-badge--${variant}`, soft ? "cn-badge--soft" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, props), dot && /*#__PURE__*/React.createElement("span", {
    className: "cn-badge__dot"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Badge.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inject component CSS once, scoped under .cn- classes that read design tokens. */
const STYLE_ID = "cn-button-styles";
function useButtonStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .cn-btn{
    font-family: var(--font-body, sans-serif);
    font-weight: var(--fw-semibold, 600);
    display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
    white-space:nowrap; cursor:pointer; border:1px solid transparent;
    transition: background var(--dur-fast,200ms) var(--ease-out), transform var(--dur-fast,200ms) var(--ease-spring), box-shadow var(--dur-fast,200ms) var(--ease-out), color var(--dur-fast,200ms);
    text-decoration:none; line-height:1; user-select:none;
  }
  .cn-btn:focus-visible{ outline:none; box-shadow:0 0 0 3px color-mix(in srgb, var(--ring,#00a2ff) 35%, transparent); }
  .cn-btn:disabled{ opacity:.5; pointer-events:none; }
  .cn-btn svg{ width:1.1em; height:1.1em; flex-shrink:0; }
  /* sizes */
  .cn-btn--sm{ height:34px; padding:0 14px; font-size:var(--fs-xs,12px); }
  .cn-btn--md{ height:40px; padding:0 20px; font-size:var(--fs-sm,14px); }
  .cn-btn--lg{ height:48px; padding:0 32px; font-size:var(--fs-base,16px); }
  .cn-btn--block{ width:100%; }
  .cn-btn--square{ border-radius:var(--radius-sm,6px); }
  .cn-btn--pill{ border-radius:var(--radius-pill,9999px); }
  /* variants */
  .cn-btn--primary{ background:var(--color-primary,#00a2ff); color:#fff; box-shadow:var(--shadow-sm); }
  .cn-btn--primary:hover{ background:var(--color-primary-hover,#38a7f4); }
  .cn-btn--primary:active{ background:var(--color-primary-pressed,#0370af); transform:translateY(1px); }
  .cn-btn--gradient{ background:var(--cn-gradient-brand); color:#fff; box-shadow:var(--shadow); }
  .cn-btn--gradient:hover{ transform:translateY(-3px); box-shadow:var(--shadow-lg); }
  .cn-btn--gradient:active{ transform:translateY(-1px); box-shadow:var(--shadow-md); }
  .cn-btn--secondary{ background:var(--cn-ink-soft,#2a2a2a); color:#fff; }
  .cn-btn--secondary:hover{ background:#000; }
  .cn-btn--secondary:active{ transform:translateY(1px); }
  .cn-btn--outline{ background:transparent; color:var(--text-strong,#121212); border-color:var(--border-subtle,#e4e4e7); }
  .cn-btn--outline:hover{ background:var(--surface-subtle,#f4f4f5); border-color:var(--color-primary,#00a2ff); color:var(--color-primary,#00a2ff); }
  .cn-btn--ghost{ background:transparent; color:var(--text-strong,#121212); }
  .cn-btn--ghost:hover{ background:var(--surface-subtle,#f4f4f5); color:var(--color-primary,#00a2ff); }
  .cn-btn--link{ background:transparent; color:var(--text-link,#00a2ff); height:auto; padding:0; }
  .cn-btn--link:hover{ text-decoration:underline; }
  .cn-btn--danger{ background:var(--cn-danger,#ff4444); color:#fff; }
  .cn-btn--danger:hover{ filter:brightness(.94); }
  `;
  document.head.appendChild(el);
}

/**
 * Cybernaut Button — the core call-to-action.
 * `gradient` + `pill` is the signature marketing CTA; `primary` is the solid
 * portal button; `secondary` is the dark ink pill.
 */
function Button({
  variant = "primary",
  size = "md",
  pill = false,
  block = false,
  leftIcon = null,
  rightIcon = null,
  as = "button",
  className = "",
  children,
  ...props
}) {
  useButtonStyles();
  const Comp = as;
  const shape = pill || variant === "gradient" ? "cn-btn--pill" : "cn-btn--square";
  const cls = ["cn-btn", `cn-btn--${variant}`, `cn-btn--${size}`, shape, block ? "cn-btn--block" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Comp, _extends({
    className: cls
  }, props), leftIcon, children, rightIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "cn-avatar-styles";
function useAvatarStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .cn-avatar{ position:relative; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; border-radius:var(--radius-pill,9999px); background:var(--cn-gradient-portal-br); color:#fff; font-family:var(--font-heading,sans-serif); font-weight:var(--fw-bold,700); overflow:visible; }
  .cn-avatar img{ width:100%; height:100%; object-fit:cover; border-radius:inherit; }
  .cn-avatar--xs{ width:28px; height:28px; font-size:11px; }
  .cn-avatar--sm{ width:36px; height:36px; font-size:13px; }
  .cn-avatar--md{ width:44px; height:44px; font-size:16px; }
  .cn-avatar--lg{ width:56px; height:56px; font-size:20px; }
  .cn-avatar__status{ position:absolute; bottom:0; right:0; width:30%; height:30%; min-width:9px; min-height:9px; border-radius:50%; border:2px solid var(--surface-card,#fff); }
  .cn-avatar__status--online{ background:#22c55e; }
  .cn-avatar__status--away{ background:#eab308; }
  .cn-avatar__status--offline{ background:#9ca3af; }
  `;
  document.head.appendChild(el);
}
function initials(name = "") {
  return name.trim().split(/\s+/).slice(0, 2).map(p => p[0] || "").join("").toUpperCase();
}

/**
 * Cybernaut Avatar — gradient circle with initials or image and an optional
 * status dot. Matches the portal profile chip.
 */
function Avatar({
  name = "",
  src = null,
  size = "md",
  status = null,
  className = "",
  ...props
}) {
  useAvatarStyles();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `cn-avatar cn-avatar--${size} ${className}`
  }, props), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : /*#__PURE__*/React.createElement("span", null, initials(name) || "?"), status && /*#__PURE__*/React.createElement("span", {
    className: `cn-avatar__status cn-avatar__status--${status}`
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "cn-card-styles";
function useCardStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .cn-card{
    background:var(--surface-card,#fff);
    border:1px solid var(--border-subtle,#e4e4e7);
    border-radius:var(--radius-xl,16px);
    box-shadow:var(--shadow);
    overflow:hidden;
    font-family:var(--font-body,sans-serif);
    color:var(--text-strong,#121212);
  }
  .cn-card--hover{ transition:box-shadow var(--dur-base,300ms) var(--ease-out), transform var(--dur-base,300ms) var(--ease-out), border-color var(--dur-base,300ms); }
  .cn-card--hover:hover{ box-shadow:var(--shadow-xl); transform:translateY(-4px); border-color:var(--cn-blue-300,#66cbff); }
  .cn-card--accent{ position:relative; }
  .cn-card--accent::before{ content:""; position:absolute; top:0; left:0; width:4px; height:100%; background:var(--cn-gradient-portal); }
  .cn-card__header{ padding:var(--space-6,24px) var(--space-6,24px) 0; }
  .cn-card__title{ font-family:var(--font-heading,sans-serif); font-weight:var(--fw-bold,700); font-size:var(--fs-h4,18px); margin:0; line-height:1.3; }
  .cn-card__desc{ color:var(--text-muted,#878787); font-size:var(--fs-sm,14px); margin:.35rem 0 0; }
  .cn-card__body{ padding:var(--space-6,24px); }
  .cn-card__footer{ padding:0 var(--space-6,24px) var(--space-6,24px); display:flex; align-items:center; gap:var(--space-3,12px); }
  `;
  document.head.appendChild(el);
}

/**
 * Cybernaut Card — soft, rounded surface container. Compose with the
 * CardHeader / CardTitle / CardDescription / CardBody / CardFooter parts.
 */
function Card({
  hover = false,
  accent = false,
  className = "",
  children,
  ...props
}) {
  useCardStyles();
  const cls = ["cn-card", hover ? "cn-card--hover" : "", accent ? "cn-card--accent" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, props), children);
}
function CardHeader({
  className = "",
  children,
  ...props
}) {
  useCardStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `cn-card__header ${className}`
  }, props), children);
}
function CardTitle({
  className = "",
  children,
  ...props
}) {
  useCardStyles();
  return /*#__PURE__*/React.createElement("h3", _extends({
    className: `cn-card__title ${className}`
  }, props), children);
}
function CardDescription({
  className = "",
  children,
  ...props
}) {
  useCardStyles();
  return /*#__PURE__*/React.createElement("p", _extends({
    className: `cn-card__desc ${className}`
  }, props), children);
}
function CardBody({
  className = "",
  children,
  ...props
}) {
  useCardStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `cn-card__body ${className}`
  }, props), children);
}
function CardFooter({
  className = "",
  children,
  ...props
}) {
  useCardStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `cn-card__footer ${className}`
  }, props), children);
}
Object.assign(__ds_scope, { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "cn-statcard-styles";
function useStatStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .cn-stat{ display:flex; align-items:center; gap:var(--space-3,12px); background:var(--surface-card,#fff); border:1px solid var(--border-subtle,#e4e4e7); border-radius:var(--radius-lg,12px); padding:var(--space-4,16px); font-family:var(--font-body,sans-serif); transition:box-shadow var(--dur-base,300ms), border-color var(--dur-base,300ms), transform var(--dur-base,300ms); }
  .cn-stat--hover:hover{ box-shadow:var(--shadow-lg); border-color:var(--cn-blue-300,#66cbff); transform:translateY(-2px); }
  .cn-stat__icon{ width:44px; height:44px; flex-shrink:0; border-radius:var(--radius-lg,12px); display:flex; align-items:center; justify-content:center; color:#fff; box-shadow:var(--shadow-md); }
  .cn-stat__icon svg{ width:20px; height:20px; }
  .cn-stat__icon--brand{ background:var(--cn-gradient-portal-br); }
  .cn-stat__icon--violet{ background:linear-gradient(135deg,#8b5cf6,#7c3aed); }
  .cn-stat__icon--amber{ background:linear-gradient(135deg,#f59e0b,#ea580c); }
  .cn-stat__icon--emerald{ background:linear-gradient(135deg,#10b981,#059669); }
  .cn-stat__label{ font-size:var(--fs-xs,12px); color:var(--text-muted,#878787); font-weight:var(--fw-medium,500); margin:0; }
  .cn-stat__value{ font-family:var(--font-heading,sans-serif); font-weight:var(--fw-bold,700); font-size:var(--fs-h3,21px); color:var(--text-strong,#121212); margin:2px 0 0; line-height:1; }
  .cn-stat__delta{ font-size:var(--fs-xs,12px); font-weight:var(--fw-semibold,600); margin-left:8px; }
  .cn-stat__delta--up{ color:#16a34a; }
  .cn-stat__delta--down{ color:#dc2626; }
  `;
  document.head.appendChild(el);
}

/**
 * Cybernaut StatCard — icon tile + metric, the portal dashboard summary card.
 */
function StatCard({
  icon = null,
  label,
  value,
  delta = null,
  tone = "brand",
  hover = true,
  className = "",
  ...props
}) {
  useStatStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["cn-stat", hover ? "cn-stat--hover" : "", className].filter(Boolean).join(" ")
  }, props), icon && /*#__PURE__*/React.createElement("span", {
    className: `cn-stat__icon cn-stat__icon--${tone}`
  }, icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "cn-stat__label"
  }, label), /*#__PURE__*/React.createElement("p", {
    className: "cn-stat__value"
  }, value, delta != null && /*#__PURE__*/React.createElement("span", {
    className: `cn-stat__delta cn-stat__delta--${delta.dir || "up"}`
  }, delta.label))));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "cn-checkbox-styles";
function useCheckboxStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .cn-check{ display:inline-flex; align-items:center; gap:.6rem; font-family:var(--font-body,sans-serif); font-size:var(--fs-sm,14px); font-weight:var(--fw-medium,500); color:var(--text-strong,#121212); cursor:pointer; user-select:none; }
  .cn-check input{ position:absolute; opacity:0; width:0; height:0; }
  .cn-check__box{ width:20px; height:20px; flex-shrink:0; border:1.5px solid var(--border-input,#e4e4e7); border-radius:6px; background:var(--surface-card,#fff); display:flex; align-items:center; justify-content:center; transition:all var(--dur-fast,200ms) var(--ease-out); }
  .cn-check__box svg{ width:13px; height:13px; color:#fff; opacity:0; transform:scale(.6); transition:all var(--dur-fast,200ms) var(--ease-spring); }
  .cn-check:hover .cn-check__box{ border-color:var(--color-primary,#00a2ff); }
  .cn-check input:focus-visible + .cn-check__box{ box-shadow:0 0 0 3px color-mix(in srgb, var(--ring,#00a2ff) 25%, transparent); }
  .cn-check input:checked + .cn-check__box{ background:var(--cn-gradient-portal); border-color:transparent; }
  .cn-check input:checked + .cn-check__box svg{ opacity:1; transform:scale(1); }
  .cn-check input:disabled + .cn-check__box{ opacity:.5; }
  .cn-check--disabled{ cursor:not-allowed; opacity:.7; }
  `;
  document.head.appendChild(el);
}
const Check = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "4",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));

/**
 * Cybernaut Checkbox — gradient-fill checkbox with label.
 */
function Checkbox({
  label,
  disabled = false,
  className = "",
  ...props
}) {
  useCheckboxStyles();
  return /*#__PURE__*/React.createElement("label", {
    className: ["cn-check", disabled ? "cn-check--disabled" : "", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    disabled: disabled
  }, props)), /*#__PURE__*/React.createElement("span", {
    className: "cn-check__box"
  }, /*#__PURE__*/React.createElement(Check, null)), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "cn-input-styles";
function useInputStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .cn-field{ display:flex; flex-direction:column; gap:.4rem; font-family:var(--font-body,sans-serif); }
  .cn-field__label{ font-size:var(--fs-sm,14px); font-weight:var(--fw-medium,500); color:var(--text-strong,#121212); }
  .cn-field__req{ color:var(--cn-danger,#ff4444); margin-left:2px; }
  .cn-input-wrap{ position:relative; display:flex; align-items:center; }
  .cn-input-wrap__icon{ position:absolute; left:14px; display:flex; color:var(--text-muted,#878787); pointer-events:none; }
  .cn-input-wrap__icon svg{ width:18px; height:18px; }
  .cn-input{
    width:100%; box-sizing:border-box;
    font-family:var(--font-body,sans-serif); font-size:var(--fs-sm,14px); font-weight:var(--fw-medium,500);
    height:44px; padding:0 16px; color:var(--text-strong,#121212);
    background:var(--surface-card,#fff); border:1px solid var(--border-input,#e4e4e7);
    border-radius:var(--radius-md,8px); outline:none;
    transition:border-color var(--dur-fast,200ms), box-shadow var(--dur-fast,200ms);
  }
  .cn-input--has-icon{ padding-left:42px; }
  .cn-input::placeholder{ color:var(--text-muted,#878787); font-weight:var(--fw-regular,400); }
  .cn-input:hover{ border-color:var(--cn-blue-300,#66cbff); }
  .cn-input:focus{ border-color:var(--color-primary,#00a2ff); box-shadow:0 0 0 3px color-mix(in srgb, var(--ring,#00a2ff) 22%, transparent); }
  .cn-input:disabled{ background:var(--surface-subtle,#f4f4f5); opacity:.7; cursor:not-allowed; }
  .cn-input--error{ border-color:var(--cn-danger,#ff4444); }
  .cn-input--error:focus{ box-shadow:0 0 0 3px color-mix(in srgb, var(--cn-danger,#ff4444) 20%, transparent); }
  .cn-field__hint{ font-size:var(--fs-xs,12px); color:var(--text-muted,#878787); }
  .cn-field__hint--error{ color:var(--cn-danger,#ff4444); }
  `;
  document.head.appendChild(el);
}

/**
 * Cybernaut Input — labelled text field with optional leading icon, hint and error.
 */
function Input({
  label,
  hint,
  error,
  required = false,
  icon = null,
  id,
  className = "",
  ...props
}) {
  useInputStyles();
  const fieldId = id || (label ? `cn-input-${label.replace(/\s+/g, "-").toLowerCase()}` : undefined);
  const inputCls = ["cn-input", icon ? "cn-input--has-icon" : "", error ? "cn-input--error" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: "cn-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "cn-field__label",
    htmlFor: fieldId
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "cn-field__req"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "cn-input-wrap"
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "cn-input-wrap__icon"
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: inputCls
  }, props))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    className: `cn-field__hint${error ? " cn-field__hint--error" : ""}`
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/portal/ProgressRing.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Cybernaut ProgressRing — circular progress used across the portal dashboard
 * (assignments / quizzes / coding). Stroke uses the brand gradient by default.
 */
function ProgressRing({
  value = 0,
  size = 80,
  stroke = 6,
  tone = "brand",
  label = null,
  showValue = true,
  className = "",
  ...props
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const offset = circ * (1 - pct / 100);
  const gid = React.useMemo(() => "cn-ring-" + Math.random().toString(36).slice(2, 8), []);
  const stops = {
    brand: ["#06b6d4", "#3b82f6"],
    violet: ["#8b5cf6", "#7c3aed"],
    amber: ["#f59e0b", "#ea580c"],
    emerald: ["#10b981", "#059669"]
  }[tone] || ["#06b6d4", "#3b82f6"];
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `cn-ring ${className}`,
    style: {
      position: "relative",
      width: size,
      height: size,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, props), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: "rotate(-90deg)"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gid,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: stops[0]
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: stops[1]
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--surface-subtle,#f4f4f5)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: `url(#${gid})`,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: circ,
    strokeDashoffset: offset,
    style: {
      transition: "stroke-dashoffset 1s var(--ease-out,ease)"
    }
  })), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-heading,sans-serif)",
      fontWeight: 700,
      color: "var(--text-strong,#121212)",
      fontSize: size * 0.26
    }
  }, Math.round(pct), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size * 0.16
    }
  }, "%"), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size * 0.13,
      fontWeight: 500,
      color: "var(--text-muted,#878787)",
      marginTop: 2
    }
  }, label)));
}
Object.assign(__ds_scope, { ProgressRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/portal/ProgressRing.jsx", error: String((e && e.message) || e) }); }

// components/portal/SidebarLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STYLE_ID = "cn-sidelink-styles";
function useSideStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
  .cn-sidelink{
    display:flex; align-items:center; gap:1rem;
    padding:.75rem 1rem; margin:.25rem 0; border-radius:var(--radius-lg,12px);
    font-family:var(--font-body,sans-serif); font-size:var(--fs-sm,14px); font-weight:var(--fw-semibold,600);
    letter-spacing:.01em; color:var(--text-strong,#121212);
    text-decoration:none; cursor:pointer; border:none; background:transparent; width:100%; box-sizing:border-box; text-align:left;
    transition:background var(--dur-fast,200ms) var(--ease-out), color var(--dur-fast,200ms);
  }
  .cn-sidelink__icon{ display:flex; flex-shrink:0; }
  .cn-sidelink__icon svg{ width:18px; height:18px; }
  .cn-sidelink__badge{ margin-left:auto; }
  .cn-sidelink:hover{ background:var(--surface-subtle,#f4f4f5); }
  .dark .cn-sidelink:hover{ background:#374151; }
  .cn-sidelink--active{ background:var(--cn-gradient-portal); color:#fff; box-shadow:var(--shadow-lg); }
  .cn-sidelink--active:hover{ background:var(--cn-gradient-portal); }
  `;
  document.head.appendChild(el);
}

/**
 * Cybernaut SidebarLink — portal navigation row. The active state fills with
 * the signature cyan→blue gradient and lifts on a soft shadow.
 */
function SidebarLink({
  icon = null,
  active = false,
  badge = null,
  as = "a",
  className = "",
  children,
  ...props
}) {
  useSideStyles();
  const Comp = as;
  return /*#__PURE__*/React.createElement(Comp, _extends({
    className: ["cn-sidelink", active ? "cn-sidelink--active" : "", className].filter(Boolean).join(" ")
  }, props), icon && /*#__PURE__*/React.createElement("span", {
    className: "cn-sidelink__icon"
  }, icon), /*#__PURE__*/React.createElement("span", null, children), badge != null && /*#__PURE__*/React.createElement("span", {
    className: "cn-sidelink__badge"
  }, badge));
}
Object.assign(__ds_scope, { SidebarLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/portal/SidebarLink.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/Shell.jsx
try { (() => {
/* Cybernaut Portal — app shell: Sidebar + Topbar */
const {
  useState
} = React;
const NAV = [{
  id: "dashboard",
  icon: "home",
  label: "Dashboard"
}, {
  id: "course",
  icon: "book",
  label: "My Course"
}, {
  id: "reports",
  icon: "chart",
  label: "Quiz Reports"
}, {
  id: "practical",
  icon: "flask",
  label: "Practical"
}, {
  id: "chat",
  icon: "chat",
  label: "Chat",
  badge: 3
}, {
  id: "settings",
  icon: "cog",
  label: "Profile"
}];
function Sidebar({
  active,
  onNav,
  student
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 260,
      flexShrink: 0,
      height: "100%",
      background: "#fff",
      borderRight: "1px solid var(--cn-border)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 80,
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      borderBottom: "1px solid var(--cn-border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "var(--cn-gray-100)",
      padding: "10px 14px",
      borderRadius: 14,
      border: "1px solid var(--cn-border)",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: student.name,
    status: "online",
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 700,
      color: "var(--cn-ink)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, student.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: "var(--cn-gray-500)",
      fontWeight: 500,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, student.email)))), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      padding: "20px 12px",
      overflowY: "auto"
    }
  }, NAV.map(n => {
    const on = active === n.id;
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      onClick: () => onNav(n.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 16,
        width: "100%",
        boxSizing: "border-box",
        padding: "12px 16px",
        margin: "4px 0",
        borderRadius: 12,
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        fontSize: 14,
        fontWeight: 600,
        textAlign: "left",
        background: on ? "var(--cn-gradient-portal)" : "transparent",
        color: on ? "#fff" : "var(--cn-ink)",
        boxShadow: on ? "var(--shadow-lg)" : "none",
        transition: "all .2s var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: n.icon
    }), /*#__PURE__*/React.createElement("span", null, n.label), n.badge && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        background: on ? "rgba(255,255,255,.25)" : "#fee2e2",
        color: on ? "#fff" : "#b91c1c",
        fontSize: 11,
        fontWeight: 700,
        borderRadius: 9999,
        padding: "2px 8px"
      }
    }, n.badge));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      borderTop: "1px solid var(--cn-border)"
    }
  }, /*#__PURE__*/React.createElement(PBtn, {
    variant: "danger",
    style: {
      width: "100%"
    },
    onClick: () => onNav("logout")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "logout"
  }), " Sign Out")));
}
function Topbar({
  title,
  student
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      height: 64,
      background: "rgba(255,255,255,.85)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid var(--cn-border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/cybernaut-logo-main.png",
    alt: "Cybernaut EdTech",
    style: {
      height: 34
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      position: "relative",
      border: "none",
      background: "transparent",
      color: "var(--cn-gray-500)",
      cursor: "pointer",
      padding: 6,
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 4,
      right: 4,
      width: 8,
      height: 8,
      background: "#ef4444",
      borderRadius: 9999,
      border: "1.5px solid #fff"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: student.name,
    size: 32
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "var(--cn-ink)"
    }
  }, student.name))));
}
Object.assign(window, {
  Sidebar,
  Topbar,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/app.jsx
try { (() => {
/* Cybernaut Portal — interactive app shell */
const {
  useState: useState_
} = React;
const STUDENT = {
  name: "Aarav Sharma",
  email: "aarav.sharma@cybernaut.in"
};
function PortalApp() {
  const [authed, setAuthed] = useState_(false);
  const [screen, setScreen] = useState_("dashboard");
  if (!authed) return /*#__PURE__*/React.createElement(LoginScreen, {
    onLogin: () => setAuthed(true)
  });
  const titles = {
    dashboard: "Dashboard",
    course: "My Course",
    reports: "Quiz Reports",
    practical: "Practical",
    chat: "Chat",
    settings: "Profile"
  };
  const body = {
    dashboard: /*#__PURE__*/React.createElement(DashboardScreen, {
      student: STUDENT
    }),
    course: /*#__PURE__*/React.createElement(CourseScreen, null),
    chat: /*#__PURE__*/React.createElement(ChatScreen, {
      student: STUDENT
    }),
    reports: /*#__PURE__*/React.createElement(EmptyScreen, {
      icon: "chart",
      title: "Quiz Reports"
    }),
    practical: /*#__PURE__*/React.createElement(EmptyScreen, {
      icon: "flask",
      title: "Practical Labs"
    }),
    settings: /*#__PURE__*/React.createElement(EmptyScreen, {
      icon: "user",
      title: "Your Profile"
    })
  }[screen];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: screen,
    student: STUDENT,
    onNav: id => {
      if (id === "logout") setAuthed(false);else setScreen(id);
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    title: titles[screen],
    student: STUDENT
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto"
    }
  }, body)));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(PortalApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/screens.jsx
try { (() => {
/* Cybernaut Portal — screens */
const {
  useState: useS
} = React;

/* ---------------- LOGIN ---------------- */
function LoginScreen({
  onLogin
}) {
  const [email, setEmail] = useS("aarav.sharma@cybernaut.in");
  const [pw, setPw] = useS("••••••••");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      background: "linear-gradient(135deg,#38bdf8 0%,#ffffff 45%,#ffffff 100%)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      width: "100%",
      maxWidth: 920,
      background: "#fff",
      borderRadius: 28,
      overflow: "hidden",
      boxShadow: "var(--shadow-2xl)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "48px 44px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/cybernaut-logo-main.png",
    alt: "Cybernaut",
    style: {
      height: 44
    }
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 28,
      textAlign: "center",
      margin: "0 0 6px",
      color: "var(--cn-ink)"
    }
  }, "Sign in"), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: "center",
      color: "var(--cn-gray-500)",
      fontSize: 14,
      margin: "0 0 26px"
    }
  }, "Please login to continue to your account."), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onLogin();
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontSize: 14,
      fontWeight: 500,
      color: "#374151"
    }
  }, "Email", /*#__PURE__*/React.createElement("input", {
    value: email,
    onChange: e => setEmail(e.target.value),
    style: inp
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      fontSize: 14,
      fontWeight: 500,
      color: "#374151"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "space-between"
    }
  }, "Password ", /*#__PURE__*/React.createElement("a", {
    style: {
      color: "#2563eb",
      fontWeight: 600,
      cursor: "pointer"
    }
  }, "Forgot password?")), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: pw,
    onChange: e => setPw(e.target.value),
    style: inp
  })), /*#__PURE__*/React.createElement(PBtn, {
    variant: "primary",
    size: "lg",
    style: {
      width: "100%",
      marginTop: 4
    }
  }, "Sign in"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative",
      minHeight: 480
    },
    className: "login-side"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/login-side.webp",
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }))));
}
const inp = {
  width: "100%",
  boxSizing: "border-box",
  height: 44,
  padding: "0 16px",
  borderRadius: 10,
  border: "1px solid #d1d5db",
  background: "#f9fafb",
  fontFamily: "var(--font-body)",
  fontSize: 14,
  fontWeight: 500,
  outline: "none"
};

/* ---------------- DASHBOARD ---------------- */
function PanelHead({
  icon,
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: "24px 24px 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 4,
      height: "100%",
      background: "var(--cn-gradient-portal)",
      borderRadius: "16px 0 0 16px"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 20,
      color: "var(--cn-ink)",
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 8,
      background: "var(--cn-gradient-portal-br)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 14
  })), title), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--cn-gray-500)",
      fontSize: 14,
      margin: "4px 0 0"
    }
  }, sub));
}
const panel = {
  background: "#fff",
  borderRadius: 16,
  boxShadow: "var(--shadow-lg)",
  border: "1px solid var(--cn-border)",
  overflow: "hidden"
};
function DashboardScreen({
  student
}) {
  const reports = [{
    module: "React Fundamentals",
    day: 12,
    code: 92,
    quiz: 88,
    assign: 95
  }, {
    module: "Node & Express",
    day: 11,
    code: 78,
    quiz: 90,
    assign: -1
  }, {
    module: "Databases",
    day: 10,
    code: 85,
    quiz: 72,
    assign: 80
  }, {
    module: "JavaScript Deep Dive",
    day: 9,
    code: 96,
    quiz: 84,
    assign: 89
  }];
  const cell = m => {
    if (m === -1) return ["Pending", "#fef9c3", "#a16207"];
    if (m === -2) return ["Not Submitted", "#fee2e2", "#b91c1c"];
    return [m + "%", "#dcfce7", "#15803d"];
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      background: "linear-gradient(135deg,#f8fafc,#eff6ff55,#ecfeff55)",
      minHeight: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: 24,
      overflow: "hidden",
      boxShadow: "var(--shadow-2xl)",
      background: "linear-gradient(90deg,#3b82f6,#06b6d4,#2563eb)",
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -120,
      right: -80,
      width: 260,
      height: 260,
      background: "rgba(255,255,255,.12)",
      borderRadius: 9999
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: 36,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 280
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 14px",
      background: "rgba(255,255,255,.2)",
      borderRadius: 9999,
      color: "#fff",
      fontSize: 13,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "fire",
    size: 14,
    style: {
      color: "#fdba74"
    }
  }), " Good Morning!"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 34,
      color: "#fff",
      margin: "14px 0 8px"
    }
  }, "Welcome back, ", student.name.split(" ")[0], "!"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#dbeafe",
      fontSize: 16,
      margin: 0,
      maxWidth: 520
    }
  }, "Your learning journey is progressing beautifully. Keep up the great work!"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      background: "rgba(255,255,255,.15)",
      border: "1px solid rgba(255,255,255,.25)",
      borderRadius: 16,
      padding: 16,
      maxWidth: 520
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "rgba(255,255,255,.95)",
      fontStyle: "italic",
      fontSize: 14
    }
  }, "\"The beautiful thing about learning is that no one can take it away from you.\""), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      color: "#dbeafe",
      fontSize: 13,
      fontWeight: 600
    }
  }, "\u2014 B.B. King"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,.15)",
      border: "1px solid rgba(255,255,255,.25)",
      borderRadius: 16,
      padding: 22,
      textAlign: "center",
      minWidth: 150
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 30,
      color: "#fff"
    }
  }, "12"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 0",
      color: "#dbeafe",
      fontSize: 13
    }
  }, "Current Day")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 18,
      marginBottom: 26
    }
  }, [["user", "brand", "Students Trained", "75K+"], ["code", "violet", "Coding Tasks", "86%"], ["question", "amber", "Quizzes Done", "24"], ["trophy", "emerald", "Achievements", "14"]].map(([ic, tone, lbl, val]) => {
    const grads = {
      brand: "var(--cn-gradient-portal-br)",
      violet: "linear-gradient(135deg,#8b5cf6,#7c3aed)",
      amber: "linear-gradient(135deg,#f59e0b,#ea580c)",
      emerald: "linear-gradient(135deg,#10b981,#059669)"
    };
    return /*#__PURE__*/React.createElement("div", {
      key: lbl,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "#fff",
        border: "1px solid var(--cn-border)",
        borderRadius: 12,
        padding: 16,
        boxShadow: "var(--shadow-sm)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 12,
        background: grads[tone],
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "var(--shadow-md)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 20
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 12,
        color: "var(--cn-gray-500)",
        fontWeight: 500
      }
    }, lbl), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "2px 0 0",
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        fontSize: 22,
        color: "var(--cn-ink)"
      }
    }, val)));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr",
      gap: 24,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: panel
  }, /*#__PURE__*/React.createElement(PanelHead, {
    icon: "rocket",
    title: "Performance Metrics",
    sub: "Detailed breakdown of your academic performance"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      paddingTop: 8,
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 18
    }
  }, [["Assignments", 95, "#06b6d4", "#3b82f6", "#eff6ff"], ["Quizzes", 84, "#f59e0b", "#ea580c", "#fffbeb"], ["Coding", 86, "#8b5cf6", "#7c3aed", "#f5f3ff"]].map(([l, v, f, t, bg]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      textAlign: "center",
      padding: 22,
      borderRadius: 16,
      background: bg,
      border: "1px solid #e0e7ff"
    }
  }, /*#__PURE__*/React.createElement(Ring, {
    value: v,
    size: 92,
    stroke: 7,
    from: f,
    to: t
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px 0 0",
      fontSize: 14,
      fontWeight: 600,
      color: "var(--cn-ink)"
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: panel
  }, /*#__PURE__*/React.createElement(PanelHead, {
    icon: "star",
    title: "Latest Activity",
    sub: "Your most recent learning material"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 14,
      padding: 22,
      border: "1px solid #cffafe",
      background: "linear-gradient(135deg,#eff6ff,#ecfeff)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 16,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 12px",
      borderRadius: 9999,
      background: "#dbeafe",
      color: "#1d4ed8",
      fontSize: 12,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 12
  }), " Day 12"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "10px 0 4px",
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 18,
      color: "var(--cn-ink)"
    }
  }, "Building REST APIs with Express"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--cn-gray-500)",
      fontSize: 14
    }
  }, "New lesson available for you to explore and learn")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(PBtn, {
    variant: "gradient",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 14
  }), " Join Meet"), /*#__PURE__*/React.createElement(PBtn, {
    variant: "emerald",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file",
    size: 14
  }), " Take Quiz"))))), /*#__PURE__*/React.createElement("div", {
    style: panel
  }, /*#__PURE__*/React.createElement(PanelHead, {
    icon: "chart",
    title: "Academic Performance",
    sub: "Detailed record of your assignments and assessments"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      paddingTop: 8,
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: "1px solid var(--cn-border)"
    }
  }, ["Module", "Day", "Code", "Quiz", "Assignment"].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      padding: "12px 14px",
      textAlign: i < 2 ? "left" : "center",
      fontWeight: 600,
      color: "#374151"
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, reports.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.module,
    style: {
      borderBottom: "1px solid #f1f5f9"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "12px 14px",
      fontWeight: 600,
      color: "var(--cn-ink)"
    }
  }, r.module), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 30,
      height: 30,
      borderRadius: 8,
      background: "var(--cn-gray-100)",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 600,
      fontSize: 13
    }
  }, r.day)), [r.code, r.quiz, r.assign].map((m, i) => {
    const [t, bg, c] = cell(m);
    return /*#__PURE__*/React.createElement("td", {
      key: i,
      style: {
        padding: "12px 14px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        minWidth: 80,
        padding: "4px 10px",
        borderRadius: 9999,
        fontSize: 12,
        fontWeight: 600,
        background: bg,
        color: c
      }
    }, t));
  })))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: panel
  }, /*#__PURE__*/React.createElement(PanelHead, {
    icon: "trophy",
    title: "Overall Progress",
    sub: "Your learning snapshot"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      paddingTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Ring, {
    value: 88,
    size: 140,
    stroke: 10,
    label: "Overall"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, [["check", "Completed Tasks", "18", "#dbeafe", "#2563eb"], ["star", "Best Score", "96%", "#fef9c3", "#a16207"], ["fire", "Day Streak", "12", "#ffedd5", "#c2410c"]].map(([ic, l, v, bg, c]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 12px",
      background: "var(--cn-gray-100)",
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 14,
      fontWeight: 500,
      color: "#374151"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      background: bg,
      color: c,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 14
  })), l), /*#__PURE__*/React.createElement("b", {
    style: {
      color: c,
      fontFamily: "var(--font-heading)"
    }
  }, v)))))))));
}
Object.assign(window, {
  LoginScreen,
  DashboardScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/screens2.jsx
try { (() => {
/* Cybernaut Portal — more screens: Course & Chat */

function CourseScreen() {
  const modules = [{
    name: "React Fundamentals",
    days: 14,
    done: 14,
    color: "#06b6d4",
    img: "../../assets/courses/full-stack.webp"
  }, {
    name: "Node & Express",
    days: 12,
    done: 9,
    color: "#3b82f6"
  }, {
    name: "Databases & SQL",
    days: 10,
    done: 4,
    color: "#8b5cf6"
  }, {
    name: "Deployment & DevOps",
    days: 8,
    done: 0,
    color: "#10b981"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      background: "linear-gradient(135deg,#f8fafc,#eff6ff55)",
      minHeight: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 22,
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 28,
      margin: 0,
      color: "var(--cn-ink)"
    }
  }, "Full Stack Development"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      color: "var(--cn-gray-500)"
    }
  }, "Batch FS-2026-A \xB7 90-day industry track")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "#fff",
      padding: "10px 18px",
      borderRadius: 14,
      border: "1px solid var(--cn-border)",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement(Ring, {
    value: 64,
    size: 56,
    stroke: 6
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: "var(--cn-gray-500)"
    }
  }, "Course progress"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontWeight: 700,
      fontFamily: "var(--font-heading)",
      color: "var(--cn-ink)"
    }
  }, "27 / 44 days")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: 18
    }
  }, modules.map(m => {
    const pct = Math.round(m.done / m.days * 100);
    const locked = m.done === 0;
    return /*#__PURE__*/React.createElement("div", {
      key: m.name,
      style: {
        background: "#fff",
        borderRadius: 16,
        border: "1px solid var(--cn-border)",
        boxShadow: "var(--shadow)",
        overflow: "hidden",
        opacity: locked ? 0.85 : 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        background: m.color
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 22
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        fontSize: 18,
        color: "var(--cn-ink)"
      }
    }, m.name), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "4px 0 0",
        fontSize: 13,
        color: "var(--cn-gray-500)"
      }
    }, m.done, " of ", m.days, " days completed")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        padding: "4px 10px",
        borderRadius: 9999,
        background: locked ? "#f1f5f9" : pct === 100 ? "#dcfce7" : "#dbeafe",
        color: locked ? "#64748b" : pct === 100 ? "#15803d" : "#1d4ed8"
      }
    }, locked ? "Locked" : pct === 100 ? "Completed" : pct + "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        height: 8,
        borderRadius: 9999,
        background: "#eef2f7",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: pct + "%",
        height: "100%",
        borderRadius: 9999,
        background: `linear-gradient(90deg,${m.color},#3b82f6)`,
        transition: "width 1s var(--ease-out)"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        display: "flex",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(PBtn, {
      variant: locked ? "outline" : "gradient",
      size: "sm",
      style: {
        flex: 1
      }
    }, locked ? "Locked" : "Continue"), /*#__PURE__*/React.createElement(PBtn, {
      variant: "outline",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "file",
      size: 14
    }), " Notes"))));
  })));
}
function ChatScreen({
  student
}) {
  const msgs = [{
    who: "Lecturer · Priya M",
    me: false,
    text: "Today we'll cover REST API design. Please pull the latest starter repo before class.",
    time: "09:12"
  }, {
    who: "Rahul K",
    me: false,
    text: "Got it! Should we use the same Postman collection from Day 10?",
    time: "09:14"
  }, {
    who: student.name,
    me: true,
    text: "Pushed my Day 11 assignment — the auth middleware is working now 🎉",
    time: "09:21"
  }, {
    who: "Lecturer · Priya M",
    me: false,
    text: "Nice work Aarav. I'll review it after the session and drop feedback in your report.",
    time: "09:24"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "#f8fafc"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 28px",
      background: "#fff",
      borderBottom: "1px solid var(--cn-border)",
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 12,
      background: "var(--cn-gradient-portal-br)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chat",
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 18,
      color: "var(--cn-ink)"
    }
  }, "Batch Forum \xB7 FS-2026-A"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: "#16a34a",
      fontWeight: 600
    }
  }, "\u25CF 28 online"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: 28,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, msgs.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 10,
      flexDirection: m.me ? "row-reverse" : "row",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: m.who.replace("Lecturer · ", ""),
    size: 34
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "62%"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 4px",
      fontSize: 12,
      fontWeight: 600,
      color: "var(--cn-gray-500)",
      textAlign: m.me ? "right" : "left"
    }
  }, m.who), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 16px",
      borderRadius: 16,
      fontSize: 14,
      lineHeight: 1.5,
      color: m.me ? "#fff" : "var(--cn-ink)",
      background: m.me ? "var(--cn-gradient-portal)" : "#fff",
      border: m.me ? "none" : "1px solid var(--cn-border)",
      borderBottomRightRadius: m.me ? 4 : 16,
      borderBottomLeftRadius: m.me ? 16 : 4,
      boxShadow: "var(--shadow-sm)"
    }
  }, m.text), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontSize: 11,
      color: "#9ca3af",
      textAlign: m.me ? "right" : "left"
    }
  }, m.time))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      background: "#fff",
      borderTop: "1px solid var(--cn-border)",
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Message the batch\u2026",
    style: {
      flex: 1,
      height: 46,
      padding: "0 18px",
      borderRadius: 9999,
      border: "1px solid var(--cn-border)",
      background: "#f9fafb",
      fontFamily: "var(--font-body)",
      fontSize: 14,
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement(PBtn, {
    variant: "gradient"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 16
  }), " Send")));
}
function EmptyScreen({
  icon,
  title
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f8fafc"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      color: "var(--cn-gray-500)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 72,
      height: 72,
      borderRadius: 20,
      background: "var(--cn-gradient-portal-br)",
      color: "#fff",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 32
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-heading)",
      color: "var(--cn-ink)",
      margin: "0 0 6px"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, "This section is part of the live portal.")));
}
Object.assign(window, {
  CourseScreen,
  ChatScreen,
  EmptyScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/screens2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portal/ui.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Cybernaut Portal — shared UI atoms + icon set (self-contained recreation
   mirroring the design-system primitives, styled via styles.css tokens). */

/* ---------- Icons (Font-Awesome-style solid, matching the LMS) ---------- */
const Ico = {
  home: "M12 3 2 12h3v8h6v-6h2v6h6v-8h3z",
  book: "M4 4a2 2 0 0 1 2-2h12v18H6a2 2 0 0 0-2 2zM6 4v12h10V4z",
  chart: "M3 3h2v18H3zm4 8h3v10H7zm5-5h3v15h-3zm5-4h3v19h-3z",
  flask: "M9 2h6v2h-1v4.6l5.2 9A2 2 0 0 1 18.5 21h-13a2 2 0 0 1-1.7-3.4L9 8.6V4H8z",
  chat: "M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8l-4 4z",
  cog: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8m9 4a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2l-.4-2.6H9.9l-.4 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 3 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2l.4 2.6h4.2l.4-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c0-.4.1-.8.1-1.2",
  logout: "M16 17v-2H9V9h7V7l5 5zM4 3h8v2H6v14h6v2H4z",
  bell: "M12 2a6 6 0 0 0-6 6c0 5-2 6-2 6h16s-2-1-2-6a6 6 0 0 0-6-6m2 17h-4a2 2 0 0 0 4 0",
  user: "M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10m0 2c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6",
  rocket: "M12 2c4 2 6 6 6 10l-3 3-2-1-2 2-2-2-2 1-3-3c0-4 2-8 6-10m0 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4",
  fire: "M12 2c1 3-1 4-2 6-1-1-1-2-1-3-2 2-4 5-4 8a7 7 0 0 0 14 0c0-4-4-7-7-11",
  code: "M9 18 3 12l6-6 1.5 1.5L6 12l4.5 4.5zm6 0-1.5-1.5L18 12l-4.5-4.5L15 6l6 6z",
  file: "M6 2h8l6 6v14H6zm8 1.5V8h4.5",
  star: "m12 2 3 6.5 7 .6-5.3 4.6 1.6 7L12 17l-6 3.7 1.6-7L2 9l7-.5z",
  check: "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m1 10V6h-2v8h6v-2z",
  trophy: "M5 4h14v2h2v3a4 4 0 0 1-4 4 5 5 0 0 1-3 2v2h3v2H8v-2h3v-2a5 5 0 0 1-3-2 4 4 0 0 1-4-4V6h2zM5 8v1a2 2 0 0 0 2 2zm14 0v3a2 2 0 0 0 2-2V8z",
  play: "M8 5v14l11-7z",
  arrow: "M5 12h12l-5-5 1.4-1.4L21 12l-7.6 7.4L12 18l5-5H5z",
  menu: "M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z",
  search: "M10 2a8 8 0 1 0 4.9 14.3l5 5 1.4-1.4-5-5A8 8 0 0 0 10 2m0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12",
  question: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m0 15a1.3 1.3 0 1 0 0 2.6A1.3 1.3 0 0 0 12 17m1-3.3c0-1 .4-1.4 1.3-2 .9-.7 1.7-1.5 1.7-3A3.7 3.7 0 0 0 12 5a3.8 3.8 0 0 0-3.8 3l2 .4A1.8 1.8 0 0 1 12 7c1 0 1.7.6 1.7 1.5 0 .7-.4 1-1.2 1.6-.9.7-1.5 1.4-1.5 2.9v.3h2z"
};
function Icon({
  name,
  size = 18,
  style
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    style: style,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: Ico[name] || ""
  }));
}

/* ---------- Atoms ---------- */
function PBtn({
  variant = "primary",
  size = "md",
  children,
  style,
  ...p
}) {
  const base = {
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    cursor: "pointer",
    border: "1px solid transparent",
    borderRadius: variant === "gradient" ? 9999 : 10,
    transition: "all .2s var(--ease-out)",
    whiteSpace: "nowrap",
    lineHeight: 1,
    height: size === "sm" ? 36 : size === "lg" ? 48 : 42,
    padding: size === "sm" ? "0 14px" : size === "lg" ? "0 28px" : "0 18px",
    fontSize: size === "sm" ? 13 : size === "lg" ? 16 : 14
  };
  const variants = {
    primary: {
      background: "#2563eb",
      color: "#fff",
      boxShadow: "var(--shadow-sm)"
    },
    gradient: {
      background: "var(--cn-gradient-portal)",
      color: "#fff",
      boxShadow: "var(--shadow-md)"
    },
    emerald: {
      background: "linear-gradient(90deg,#10b981,#059669)",
      color: "#fff"
    },
    outline: {
      background: "#fff",
      color: "var(--cn-ink)",
      borderColor: "var(--cn-border)"
    },
    ghost: {
      background: "transparent",
      color: "var(--cn-ink)"
    },
    danger: {
      background: "transparent",
      color: "#dc2626",
      borderColor: "#dc2626",
      borderWidth: 2
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    style: {
      ...base,
      ...variants[variant],
      ...style
    }
  }, p), children);
}
function Ring({
  value = 0,
  size = 80,
  stroke = 6,
  from = "#06b6d4",
  to = "#3b82f6",
  label
}) {
  const r = (size - stroke) / 2,
    c = 2 * Math.PI * r,
    off = c * (1 - value / 100);
  const id = "g" + from.replace("#", "") + to.replace("#", "");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: size,
      height: size,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: "rotate(-90deg)"
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: from
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: to
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "#eef2f7",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: `url(#${id})`,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: off,
    style: {
      transition: "stroke-dashoffset 1s var(--ease-out)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      color: "var(--cn-ink)",
      fontSize: size * 0.26
    }
  }, value, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size * 0.15
    }
  }, "%"), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size * 0.13,
      fontWeight: 500,
      color: "var(--cn-gray-500)",
      marginTop: 2
    }
  }, label)));
}
function Avatar({
  name = "",
  size = 40,
  status
}) {
  const init = name.trim().split(/\s+/).slice(0, 2).map(s => s[0] || "").join("").toUpperCase();
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: size,
      height: size,
      borderRadius: 9999,
      background: "var(--cn-gradient-portal-br)",
      color: "#fff",
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: size * 0.38,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, init || "?", status && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: size * 0.28,
      height: size * 0.28,
      borderRadius: 9999,
      background: status === "online" ? "#22c55e" : "#9ca3af",
      border: "2px solid #fff"
    }
  }));
}
Object.assign(window, {
  Icon,
  PBtn,
  Ring,
  Avatar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portal/ui.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app.jsx
try { (() => {
/* Cybernaut Website — page composition */
function WebsiteApp() {
  return /*#__PURE__*/React.createElement("div", {
    id: "wsite-scroll",
    style: {
      height: "100vh",
      overflowY: "auto",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement(Navbar, {
    onLogin: () => {
      const el = document.getElementById("login-note");
      if (el) {
        el.style.opacity = 1;
        setTimeout(() => el.style.opacity = 0, 2200);
      }
    }
  }), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Courses, null), /*#__PURE__*/React.createElement(WhyBand, null), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement("div", {
    id: "login-note",
    style: {
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: "translateX(-50%)",
      background: "var(--cn-ink)",
      color: "#fff",
      padding: "12px 22px",
      borderRadius: 9999,
      fontFamily: "var(--font-body)",
      fontSize: 14,
      fontWeight: 600,
      opacity: 0,
      transition: "opacity .3s",
      pointerEvents: "none",
      boxShadow: "var(--shadow-xl)",
      zIndex: 100
    }
  }, "Opens the LMS Student Portal \u2192"));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(WebsiteApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections.jsx
try { (() => {
/* Cybernaut Website — page sections */
const {
  useState: useW,
  useEffect: useWE
} = React;
const NAVLINKS = ["Home", "Programs", "About", "Blogs", "Events", "Contact"];
function Navbar({
  onLogin
}) {
  const [scrolled, setScrolled] = useW(false);
  useWE(() => {
    const root = document.getElementById("wsite-scroll");
    const fn = () => setScrolled((root ? root.scrollTop : window.scrollY) > 20);
    (root || window).addEventListener("scroll", fn);
    return () => (root || window).removeEventListener("scroll", fn);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: scrolled ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.65)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid " + (scrolled ? "var(--cn-border)" : "transparent"),
      transition: "all .3s var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "14px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/cybernaut-logo-main.png",
    alt: "Cybernaut EdTech",
    style: {
      height: 38
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 28
    },
    className: "wnav"
  }, NAVLINKS.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: l,
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 15,
      fontWeight: 600,
      color: i === 0 ? "var(--cn-blue-500)" : "#3f3f46",
      textDecoration: "none",
      cursor: "pointer",
      transition: "color .2s"
    },
    onMouseEnter: e => e.target.style.color = "var(--cn-blue-500)",
    onMouseLeave: e => e.target.style.color = i === 0 ? "var(--cn-blue-500)" : "#3f3f46"
  }, l))), /*#__PURE__*/React.createElement(WBtn, {
    variant: "gradient",
    style: {
      padding: "10px 24px",
      fontSize: 15
    },
    onClick: onLogin
  }, "Student Login")));
}
const HEADLINES = [{
  h: "Boost Up and Build Your Tech Career",
  b: "Learn to code, build innovative solutions, and shape the digital future. Every line you write brings you closer to new possibilities. Step into the world of tech — your adventure begins now!"
}, {
  h: "Reboot Campus Innovation",
  b: "At Cybernaut EdTech, we empower students to code, create, and innovate with industry-leading tools. Together, let's shape the future of learning and technology!"
}, {
  h: "Join the Hidden Order of Tech Clans",
  b: "Connect with tech minds, access exclusive resources, and level up your skills. At CDSC, innovation isn't just learned — it's built. Ready to enter the next era of tech?"
}];
function Hero() {
  const [i, setI] = useW(0);
  const [fade, setFade] = useW(true);
  useWE(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setI(p => (p + 1) % HEADLINES.length);
        setFade(true);
      }, 350);
    }, 4500);
    return () => clearInterval(t);
  }, []);
  const cur = HEADLINES[i];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "70px 28px 40px",
      display: "grid",
      gridTemplateColumns: "1.05fr .95fr",
      gap: 50,
      alignItems: "center"
    },
    className: "whero"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 200,
      opacity: fade ? 1 : 0,
      transform: fade ? "translateY(0)" : "translateY(10px)",
      transition: "all .35s var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 400,
      fontSize: "clamp(2.2rem,4vw,3.1rem)",
      lineHeight: 1.12,
      letterSpacing: ".01em",
      color: "var(--cn-ink)",
      margin: 0
    }
  }, cur.h), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 17,
      lineHeight: 1.7,
      color: "var(--cn-gray-500)",
      margin: "22px 0 0",
      maxWidth: 520,
      fontWeight: 500
    }
  }, cur.b)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement(WBtn, {
    variant: "sky",
    style: {
      padding: "13px 34px"
    }
  }, "Contact us"), /*#__PURE__*/React.createElement(WBtn, {
    variant: "dark"
  }, "Explore Solutions ", /*#__PURE__*/React.createElement(WIcon, {
    name: "arrow",
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 48,
      marginTop: 44
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: "#a1a1aa",
      fontWeight: 600
    }
  }, "Students Trusted on"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 0,
      marginTop: 8
    }
  }, ["AR", "RK", "KV", "MK"].map((n, k) => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      width: 38,
      height: 38,
      borderRadius: 9999,
      background: "var(--cn-gradient-portal-br)",
      color: "#fff",
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 13,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid #fff",
      marginLeft: k ? -10 : 0
    }
  }, n)), /*#__PURE__*/React.createElement("b", {
    style: {
      marginLeft: 14,
      fontFamily: "var(--font-heading)",
      fontSize: 24,
      color: "var(--cn-ink)"
    }
  }, "1L+"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: "#a1a1aa",
      fontWeight: 600
    }
  }, "Students Trained"), /*#__PURE__*/React.createElement("b", {
    style: {
      display: "block",
      marginTop: 8,
      fontFamily: "var(--font-heading)",
      fontSize: 24,
      color: "var(--cn-ink)"
    }
  }, "75K+")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: "-6% -6% -6% 8%",
      background: "var(--cn-gradient-hero)",
      borderRadius: "40px",
      opacity: .14,
      filter: "blur(6px)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      borderRadius: 32,
      overflow: "hidden",
      boxShadow: "var(--shadow-2xl)",
      border: "3px solid #fff",
      aspectRatio: "4/5"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/login-side.webp",
    alt: "Cybernaut learners",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(2,32,71,.45), transparent 55%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 20,
      bottom: 20,
      right: 20,
      background: "rgba(255,255,255,.92)",
      backdropFilter: "blur(6px)",
      borderRadius: 18,
      padding: "14px 18px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      fontWeight: 700,
      color: "var(--cn-blue-600)"
    }
  }, "Connecting Minds, Creating the Future"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 0",
      fontSize: 12,
      color: "var(--cn-gray-500)"
    }
  }, "Hands-on, mentor-led, industry-ready programs")))));
}
const COURSES = [{
  title: "Full Stack Development",
  desc: "MERN, APIs & deployment — build production apps end to end.",
  img: "../../assets/courses/full-stack.webp",
  tag: "6 months",
  icon: "code"
}, {
  title: "Data Analytics",
  desc: "Python, SQL, Power BI & storytelling with real datasets.",
  img: "../../assets/courses/data-analytics.webp",
  tag: "4 months",
  icon: "chart"
}, {
  title: "Tech Trio",
  desc: "C, C++ & DSA foundations to crack technical interviews.",
  img: "../../assets/courses/tech-trio.webp",
  tag: "3 months",
  icon: "layers"
}];
function Courses() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "#fff",
      padding: "60px 28px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 44
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 16px",
      borderRadius: 9999,
      background: "var(--cn-blue-50)",
      color: "var(--cn-blue-600)",
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: ".04em"
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: "spark",
    size: 14
  }), " OUR PROGRAMS"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: "clamp(1.8rem,3vw,2.4rem)",
      color: "var(--cn-ink)",
      margin: "16px 0 8px"
    }
  }, "Courses that build leaders"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--cn-gray-500)",
      fontSize: 16,
      margin: 0,
      fontWeight: 500
    }
  }, "Industry-aligned tracks, mentor-led, with placement support.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 26
    },
    className: "wcourses"
  }, COURSES.map(c => /*#__PURE__*/React.createElement(CourseCard, {
    key: c.title,
    c: c
  })))));
}
function CourseCard({
  c
}) {
  const [h, setH] = useW(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      borderRadius: 20,
      overflow: "hidden",
      background: "#fff",
      border: "1px solid var(--cn-border)",
      boxShadow: h ? "var(--shadow-xl)" : "var(--shadow)",
      transform: h ? "translateY(-6px)" : "none",
      transition: "all .3s var(--ease-out)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "16/10",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: c.img,
    alt: c.title,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: h ? "scale(1.06)" : "scale(1)",
      transition: "transform .4s var(--ease-out)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 12,
      left: 12,
      padding: "5px 12px",
      borderRadius: 9999,
      background: "rgba(255,255,255,.92)",
      color: "var(--cn-blue-600)",
      fontSize: 12,
      fontWeight: 700
    }
  }, c.tag)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 19,
      color: "var(--cn-ink)",
      margin: "0 0 8px"
    }
  }, c.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.6,
      color: "var(--cn-gray-500)",
      margin: "0 0 18px",
      fontWeight: 500
    }
  }, c.desc), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      color: "var(--cn-blue-500)",
      fontWeight: 700,
      fontSize: 15
    }
  }, "Explore course ", /*#__PURE__*/React.createElement(WIcon, {
    name: "arrow",
    size: 15,
    style: {
      transform: h ? "translateX(4px)" : "none",
      transition: "transform .25s"
    }
  }))));
}
function WhyBand() {
  const items = [{
    icon: "users",
    t: "1,00,000+ Learners",
    d: "A thriving community across campuses and cohorts."
  }, {
    icon: "cap",
    t: "75,000+ Trained",
    d: "Job-ready graduates placed across the industry."
  }, {
    icon: "star",
    t: "Mentor-led",
    d: "Live classes, code reviews and 1:1 guidance."
  }, {
    icon: "spark",
    t: "Build real projects",
    d: "Ship portfolio-grade work from day one."
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--cn-gradient-hero)",
      padding: "56px 28px",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 24
    },
    className: "wband"
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.t,
    style: {
      background: "rgba(255,255,255,.14)",
      border: "1px solid rgba(255,255,255,.25)",
      backdropFilter: "blur(6px)",
      borderRadius: 18,
      padding: 24,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      width: 48,
      height: 48,
      borderRadius: 14,
      background: "rgba(255,255,255,.2)",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(WIcon, {
    name: it.icon,
    size: 24
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      fontSize: 18,
      margin: "0 0 6px"
    }
  }, it.t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.6,
      color: "rgba(255,255,255,.9)"
    }
  }, it.d)))));
}
function Footer() {
  const cols = [["Programs", ["Full Stack", "Data Analytics", "Tech Trio", "UI/UX Design"]], ["Company", ["About us", "Events", "Blogs", "Careers"]], ["Support", ["Contact", "Student Login", "FAQs", "Privacy"]]];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "#0f172a",
      color: "#cbd5e1",
      padding: "54px 28px 28px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
      gap: 36
    },
    className: "wfooter"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/cybernaut-logo-dark.webp",
    alt: "Cybernaut",
    style: {
      height: 40,
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.7,
      maxWidth: 280,
      color: "#94a3b8",
      margin: 0
    }
  }, "We Create Leaders not Employees. Cybernaut EdTech \u2014 endeavour to explore.")), cols.map(([h, links]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: "var(--font-heading)",
      fontSize: 15,
      fontWeight: 700,
      color: "#fff",
      margin: "0 0 14px"
    }
  }, h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    style: {
      fontSize: 14,
      color: "#94a3b8",
      textDecoration: "none",
      cursor: "pointer"
    },
    onMouseEnter: e => e.target.style.color = "#fff",
    onMouseLeave: e => e.target.style.color = "#94a3b8"
  }, l))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "32px auto 0",
      paddingTop: 20,
      borderTop: "1px solid #1e293b",
      display: "flex",
      justifyContent: "space-between",
      fontSize: 13,
      color: "#64748b"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Cybernaut EdTech. All rights reserved."), /*#__PURE__*/React.createElement("span", null, "Made with \u26A1 for the next generation of builders")));
}
Object.assign(window, {
  Navbar,
  Hero,
  Courses,
  WhyBand,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ui.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Cybernaut Website — shared atoms + icons (marketing site recreation) */

const WIco = {
  arrow: "M5 12h12l-5-5 1.4-1.4L21 12l-7.6 7.4L12 18l5-5H5z",
  menu: "M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z",
  check: "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z",
  star: "m12 2 3 6.5 7 .6-5.3 4.6 1.6 7L12 17l-6 3.7 1.6-7L2 9l7-.5z",
  code: "M9 18 3 12l6-6 1.5 1.5L6 12l4.5 4.5zm6 0-1.5-1.5L18 12l-4.5-4.5L15 6l6 6z",
  chart: "M3 3h2v18H3zm4 8h3v10H7zm5-5h3v15h-3zm5-4h3v19h-3z",
  layers: "M12 2 2 8l10 6 10-6zm0 8.5L4.2 6 12 11.5 19.8 6zM2 16l10 6 10-6-2-1.2-8 4.8-8-4.8z",
  users: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8m0 2c-4 0-7 2-7 5v2h14v-2c0-3-3-5-7-5m8-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6m0 2c-.5 0-1 0-1.4.2 1.4 1 2.4 2.4 2.4 4.8v1h4v-2c0-2.5-2.4-4-5-4",
  spark: "M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8zM19 14l.9 2.6 2.6.9-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9z",
  cap: "M12 3 1 9l11 6 9-4.9V17h2V9zM5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.8z",
  phone: "M6.6 2h10.8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6.6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m5.4 17.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4M8 4v1h8V4z"
};
function WIcon({
  name,
  size = 18,
  style
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    style: style,
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: WIco[name] || ""
  }));
}
function WBtn({
  variant = "gradient",
  children,
  style,
  ...p
}) {
  const base = {
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    cursor: "pointer",
    border: "1px solid transparent",
    borderRadius: 9999,
    transition: "all .25s var(--ease-spring)",
    whiteSpace: "nowrap",
    padding: "13px 30px",
    fontSize: 16,
    lineHeight: 1
  };
  const v = {
    gradient: {
      background: "var(--cn-gradient-brand)",
      color: "#fff",
      boxShadow: "var(--shadow)"
    },
    dark: {
      background: "#2a2a2a",
      color: "#fff"
    },
    sky: {
      background: "#e0f2fe",
      color: "#0369a1"
    },
    outline: {
      background: "#fff",
      color: "var(--cn-ink)",
      borderColor: "var(--cn-border)"
    },
    ghost: {
      background: "transparent",
      color: "var(--cn-ink)"
    }
  };
  const [h, setH] = React.useState(false);
  const hov = h ? variant === "gradient" ? {
    transform: "translateY(-3px)",
    boxShadow: "var(--shadow-lg)"
  } : variant === "dark" ? {
    transform: "translateX(3px)"
  } : variant === "sky" ? {
    background: "var(--cn-gradient-brand)",
    color: "#fff"
  } : {} : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      ...base,
      ...v[variant],
      ...hov,
      ...style
    }
  }, p), children);
}
Object.assign(window, {
  WIcon,
  WBtn
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ui.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardDescription = __ds_scope.CardDescription;

__ds_ns.CardBody = __ds_scope.CardBody;

__ds_ns.CardFooter = __ds_scope.CardFooter;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.ProgressRing = __ds_scope.ProgressRing;

__ds_ns.SidebarLink = __ds_scope.SidebarLink;

})();
