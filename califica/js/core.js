'use strict';
/* =========================================================
   CalificaQR — núcleo: datos, cálculos, acceso
   Todo se guarda en el propio celular (localStorage).
   ========================================================= */
const APP_VERSION = '1.0.0';
// Llave pública del administrador (la misma clave maestra de AsistQR)
const ADMIN_PUB = {kty:'EC', crv:'P-256', x:'cNRSCzlm58bkhWh_sVceoD0FmkWqbmHwZIT42xiNquo', y:'4s97MZUcwfYX2LCWr3vckrdMTZi32m1DMIlC5pk0gKI', ext:true};

const LS = {
  get(k, d){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); return true; }catch(e){ toast('No se pudo guardar: memoria llena. Haz un respaldo.'); return false; } },
  del(k){ try{ localStorage.removeItem(k); }catch(e){} }
};

/* ---------- Catálogos ---------- */
const AREAS = {
  LEN:'Comunicación y Lenguajes', SOC:'Ciencias Sociales', APV:'Artes Plásticas y Visuales', NAT:'Ciencias Naturales', MAT:'Matemática',
  EFD:'Educación Física y Deportes', EMU:'Educación Musical', TEC:'Técnica Tecnológica', VER:'Valores, Espiritualidades y Religiones',
  LEX:'Lengua Extranjera', BIO:'Biología - Geografía', FIS:'Física', QUI:'Química', COS:'Cosmovisiones, Filosofía y Psicología', TTG:'Técnica Tecnológica General'
};
const AREAS_PRI = ['LEN','SOC','EFD','EMU','APV','MAT','TEC','NAT','VER'];
const AREAS_SEC = ['LEN','LEX','SOC','EFD','EMU','APV','MAT','TTG','BIO','FIS','QUI','COS','VER'];
const NIVELES = {PRI:'Primaria Comunitaria Vocacional', SEC:'Secundaria Comunitaria Productiva', INI:'Inicial en Familia Comunitaria'};
const GRADOS = ['PRIMERO','SEGUNDO','TERCERO','CUARTO','QUINTO','SEXTO'];
const TRIM = ['1er Trimestre','2do Trimestre','3er Trimestre'];
const TRIMC = ['1T','2T','3T'];
const DIMS = [
  {k:'ser', t:'Ser', d:'Lo califica el maestro'},
  {k:'saber', t:'Saber', d:'Evaluaciones'},
  {k:'hacer', t:'Hacer', d:'Trabajos y prácticas'},
  {k:'auto', t:'Autoevaluación', d:'Ser – decidir del estudiante'}
];
const COLORS = ['#C8102E','#8E1B3A','#1D4E89','#0F7B6C','#2E7D32','#E0701A','#6A3FA0','#2B2B2B'];
const QTYPES = {
  sel:{t:'Selección', d:'Rellena la opción correcta (A, B, C…)', omr:true},
  vf:{t:'Verdadero / Falso', d:'Varias afirmaciones, rellena V o F', omr:true},
  rel:{t:'Relacionar', d:'Une cada elemento con su descripción (letras)', omr:true},
  comp:{t:'Completar', d:'Oraciones con espacios en blanco ___', omr:false},
  lista:{t:'Escribir respuestas', d:'Casillas para escribir (ej.: 4 ejemplos)', omr:false},
  abi:{t:'Pregunta abierta', d:'Respuesta con tus palabras; tú das el puntaje', omr:false},
  prob:{t:'Problema con procedimiento', d:'Matemática: valora el proceso por pasos', omr:false}
};

function defaultCfg(){
  return {
    ue:'', sie:'', distrito:'', depto:'', maestro:'', director:'', turno:'', logoUE:'', color:'#1D4E89', papel:'carta',
    escala:{1:[5], 2:[3,5], 3:[2,4,5], 4:[2,3,4,5], 5:[1,2,3,4,5]},
    dims:{ser:10, saber:45, hacer:40, auto:5},
    cual:[{max:50, c:'ED', t:'En desarrollo'}, {max:68, c:'DA', t:'Desarrollo aceptable'}, {max:84, c:'DO', t:'Desarrollo óptimo'}, {max:100, c:'DP', t:'Desarrollo pleno'}],
    serDef:['Respeto','Responsabilidad'], areasExtra:{}, setup:false
  };
}
let cfg = Object.assign(defaultCfg(), LS.get('cqr_cfg', {}));
let cursos = LS.get('cqr_cursos', []);
let curId = LS.get('cqr_cur', null);
let cols = LS.get('cqr_cols', []);         // columnas de planilla
let notas = LS.get('cqr_notas', {});       // {colId:{estId:valor}}
let evals = LS.get('cqr_evals', []);       // evaluaciones con su clave
let resp = LS.get('cqr_resp', {});         // {evId:{estId:{m, ts}}}
let lic = LS.get('cqr_lic', null);
let ui = Object.assign({trim:1, area:null, dim:'saber', evArea:'', plView:'dim'}, LS.get('cqr_ui', {}));
const saveCfg = () => LS.set('cqr_cfg', cfg);
const saveCursos = () => LS.set('cqr_cursos', cursos);
const saveCols = () => LS.set('cqr_cols', cols);
const saveNotas = () => LS.set('cqr_notas', notas);
const saveEvals = () => LS.set('cqr_evals', evals);
const saveResp = () => LS.set('cqr_resp', resp);
const saveUI = () => LS.set('cqr_ui', ui);

/* ---------- Utilidades ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = () => ymd(new Date());
const fmtD = s => s ? String(s).split('-').reverse().join('/') : '';
const uid = (n = 8) => { const a = new Uint8Array(n); crypto.getRandomValues(a); return [...a].map(x => 'abcdefghijkmnpqrstuvwxyz23456789'[x % 32]).join(''); };
const titleCase = s => String(s || '').toLowerCase().replace(/(^|[\s\-(])(\S)/g, (m, a, b) => a + b.toUpperCase());
const isNum = v => typeof v === 'number' && isFinite(v);
const r0 = x => Math.round(x + 1e-9);
const r1 = x => Math.round(x * 10 + 1e-9) / 10;
const fmtN = x => isNum(x) ? String(r1(x)).replace('.', ',') : '';
const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ ]/g, ' ').replace(/\s+/g, ' ').trim();
const b64u = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const ub64u = s => { s = s.replace(/-/g, '+').replace(/_/g, '/'); while(s.length % 4) s += '='; const b = atob(s); const u = new Uint8Array(b.length); for(let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; };
const enc = new TextEncoder(), dec = new TextDecoder();
function baseURL(){ return location.origin + location.pathname.replace(/index\.html$/, ''); }
let toastT;
function toast(msg, ms = 2800){ let t = $('.toast'); if(!t){ t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); } t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, ms); }
async function copyText(txt){ try{ await navigator.clipboard.writeText(txt); toast('Copiado'); }catch(e){ const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); toast('Copiado'); }catch(_){ toast('Mantén presionado para copiar'); } ta.remove(); } }
function openWA(text){ window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank'); }
function downloadBlob(blob, name){ const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500); }
async function shareOrDownload(blob, name){
  const file = new File([blob], name, {type:blob.type});
  if(/android|iphone|ipad/i.test(navigator.userAgent) && navigator.canShare && navigator.canShare({files:[file]})){
    try{ await navigator.share({files:[file], title:name}); return; }catch(e){ if(e.name === 'AbortError') return; } }
  downloadBlob(blob, name); toast('Archivo descargado: ' + name);
}
const fileName = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w]+/g, '_').replace(/^_|_$/g, '').slice(0, 60);
function pickFile(accept, cb, capture){
  const f = $('#filePick'); f.value = ''; f.accept = accept || ''; if(capture) f.setAttribute('capture', capture); else f.removeAttribute('capture');
  f.onchange = () => { if(f.files && f.files[0]) cb(f.files[0]); }; f.click();
}
function readAsDataURL(file){ return new Promise((ok, ko) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = ko; r.readAsDataURL(file); }); }
function loadImg(src){ return new Promise(ok => { if(!src) return ok(null); const i = new Image(); i.onload = () => ok(i); i.onerror = () => ok(null); i.src = src; }); }
async function shrinkLogo(file){
  const im = await loadImg(await readAsDataURL(file)); if(!im) throw new Error('Imagen no válida');
  const m = 360, s = Math.min(1, m / Math.max(im.width, im.height)); const c = document.createElement('canvas');
  c.width = Math.round(im.width * s); c.height = Math.round(im.height * s); const x = c.getContext('2d');
  const png = /png|webp|svg|gif/.test(file.type);
  if(!png){ x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); }
  x.drawImage(im, 0, 0, c.width, c.height); return png ? c.toDataURL('image/png') : c.toDataURL('image/jpeg', .88);
}
/* Color institucional */
function mix(hex, to, a){ const h = hex.replace('#', ''); const n = parseInt(h, 16); const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255]; const t = to === 'w' ? 255 : 0; return '#' + c.map(v => Math.round(v + (t - v) * a).toString(16).padStart(2, '0')).join(''); }
function applyTheme(){
  const c = /^#[0-9a-f]{6}$/i.test(cfg.color) ? cfg.color : '#1D4E89', r = document.documentElement.style;
  r.setProperty('--pri', c); r.setProperty('--pri-dk', mix(c, 'k', .3)); r.setProperty('--pri-soft', mix(c, 'w', .89));
  const m = $('meta[name=theme-color]'); if(m) m.content = c;
}

/* ---------- Curso activo ---------- */
function curso(){ let c = cursos.find(x => x.id === curId); if(!c && cursos.length){ c = cursos[0]; curId = c.id; LS.set('cqr_cur', curId); } return c || null; }
function students(){ const c = curso(); return c ? (c.est || []).slice().sort((a, b) => a.n - b.n) : []; }
function activeStudents(){ return students().filter(s => !s.ret); }
function areaName(k){ return AREAS[k] || (cfg.areasExtra || {})[k] || k; }
function cursoCorto(c = curso()){ return c ? `${c.gradoN}° ${c.paralelo || ''}`.trim() : ''; }
function cursoLargo(c = curso()){ return c ? `${GRADOS[c.gradoN - 1] || c.gradoN + '°'} - ${c.paralelo || ''}` : ''; }
function nivelTxt(c = curso()){ return c ? (NIVELES[c.nivel] || c.nivel || '') : ''; }
function newCurso(o = {}){ return Object.assign({id:uid(6), gestion:String(new Date().getFullYear()), nivel:'PRI', gradoN:1, paralelo:'A', logoGrado:'', areas:['LEN','SOC','APV','NAT','MAT'], est:[]}, o); }
function nextN(){ const e = curso().est || []; return e.reduce((m, s) => Math.max(m, s.n), 0) + 1; }

/* ---------- Planillas: columnas y notas ---------- */
const dimMax = d => +cfg.dims[d] || 0;
function colsOf(a, t, d, cid = curId){ return cols.filter(c => c.cid === cid && c.a === a && c.t === t && c.d === d); }
function ensureCols(a, t){
  if(!a) return; let ch = false;
  if(!colsOf(a, t, 'ser').length){ (cfg.serDef || []).forEach(n => cols.push({id:uid(8), cid:curId, a, t, d:'ser', tema:n, fecha:''})); ch = true; }
  if(!colsOf(a, t, 'auto').length){ cols.push({id:uid(8), cid:curId, a, t, d:'auto', tema:'Autoevaluación', fecha:''}); ch = true; }
  if(ch) saveCols();
}
function getN(colId, eid){ const v = notas[colId] && notas[colId][eid]; return isNum(v) ? v : null; }
function setN(colId, eid, v){ if(!notas[colId]) notas[colId] = {}; if(v === null || v === '' || !isNum(v)) delete notas[colId][eid]; else notas[colId][eid] = v; }
function dimAvg(a, t, d, eid, cid = curId){
  const v = colsOf(a, t, d, cid).map(c => getN(c.id, eid)).filter(isNum);
  return v.length ? r0(v.reduce((x, y) => x + y, 0) / v.length) : null;
}
function trimRes(a, t, eid, cid = curId){
  const o = {}; DIMS.forEach(D => o[D.k] = dimAvg(a, t, D.k, eid, cid));
  const p = DIMS.map(D => o[D.k]).filter(isNum); o.total = p.length ? p.reduce((x, y) => x + y, 0) : null; o.cual = cualOf(o.total); return o;
}
function annual(a, eid, cid = curId){ const v = [1, 2, 3].map(t => trimRes(a, t, eid, cid).total).filter(isNum); return v.length ? r0(v.reduce((x, y) => x + y, 0) / v.length) : null; }
function cualOf(n){ if(!isNum(n)) return null; return (cfg.cual || []).find(c => n <= c.max) || cfg.cual[cfg.cual.length - 1]; }

/* ---------- Evaluaciones: puntaje ---------- */
function escalaPts(n, k, max){
  if(k <= 0 || n <= 0) return 0; if(k >= n) return max;
  const e = cfg.escala && cfg.escala[n]; if(e && isNum(+e[k - 1])) return r1(+e[k - 1] * max / 5);
  return r1(k / n * max);
}
function relKey(q, i){ return HOJA.relOrder(q).indexOf(i); }
function qMax(q){ return +q.pts || 5; }
function evMax(ev){ return (ev.qs || []).reduce((s, q) => s + qMax(q), 0); }
function emptyMark(q){
  switch(q.tipo){
    case 'sel': return null; case 'vf': return (q.items || []).map(() => null); case 'rel': return (q.pares || []).map(() => null);
    case 'comp': return HOJA.blanksOf(q.texto).map(() => null); case 'lista': return Array.from({length:+q.n || 0}, () => null);
    case 'abi': return null; case 'prob': return (q.crit || []).map(() => false);
    case 'tpl': return Array.from({length:q.n || 0}, () => null);
  }
}
function qScore(q, v){
  const max = qMax(q); let n = HOJA.nParts(q), k = 0;
  switch(q.tipo){
    case 'sel': k = v === q.ok ? 1 : 0; break;
    case 'vf': k = (q.items || []).filter((it, i) => v && v[i] === (it.ok === 'F' ? 1 : 0)).length; break;
    case 'rel': k = (q.pares || []).filter((p, i) => v && v[i] === relKey(q, i)).length; break;
    case 'comp': case 'lista': k = (v || []).filter(x => x === true).length; break;
    case 'tpl': n = q.n || 0; k = (q.ok || []).filter((o, i) => o >= 0 && v && v[i] === o).length; break;
    case 'abi': return {pts:isNum(v) ? Math.max(0, Math.min(max, v)) : 0, max, k:null, n:null};
    case 'prob': { const cr = q.crit || [], tot = cr.reduce((s, c) => s + (+c.p || 0), 0) || 1; const got = cr.reduce((s, c, i) => s + (v && v[i] ? +c.p || 0 : 0), 0); return {pts:r1(got / tot * max), max, k:null, n:null}; }
  }
  return {pts:escalaPts(n, k, max), max, k, n};
}
function pending(q, v){
  switch(q.tipo){
    case 'comp': case 'lista': return (v || []).filter(x => x === null).length;
    case 'abi': return isNum(v) ? 0 : 1;
    default: return 0;
  }
}
function evScore(ev, m){
  let tot = 0, pend = 0; const per = {};
  (ev.qs || []).forEach(q => { const v = m ? m[q.id] : undefined; const s = qScore(q, v === undefined ? emptyMark(q) : v); per[q.id] = s; tot += s.pts; pend += pending(q, v === undefined ? emptyMark(q) : v); });
  const max = evMax(ev); tot = r1(tot);
  const nota = max ? r0(tot / max * dimMax(ev.d || 'saber')) : 0;
  return {tot, max, nota, per, pend};
}
function evCol(ev){
  let c = cols.find(x => x.id === ev.colId);
  if(!c){ c = {id:uid(8), cid:ev.cid, a:ev.a, t:ev.t, d:ev.d || 'saber', tema:ev.titulo, fecha:ev.fecha, ev:ev.id}; cols.push(c); ev.colId = c.id; saveCols(); saveEvals(); }
  else { Object.assign(c, {cid:ev.cid, a:ev.a, t:ev.t, d:ev.d || 'saber', tema:ev.titulo, fecha:ev.fecha, ev:ev.id}); saveCols(); }
  return c;
}
function saveResult(ev, est, m){
  if(!resp[ev.id]) resp[ev.id] = {};
  resp[ev.id][est.id] = {m, ts:Date.now()};
  const sc = evScore(ev, m); const c = evCol(ev); setN(c.id, est.id, sc.nota);
  saveResp(); saveNotas(); return sc;
}
function evProgress(ev){ const r = resp[ev.id] || {}; const st = (cursos.find(c => c.id === ev.cid) || {est:[]}).est.filter(s => !s.ret); const done = st.filter(s => r[s.id]).length; return {done, tot:st.length}; }

/* ---------- Acceso (códigos) ---------- */
const LIC_DB = {url:'https://uaevjeijemfaiexhbhkx.supabase.co', key:'sb_publishable_6MDIIa-Bfyx7OEC8MJXPJw_Hvm8ESP-'};
const LIC_PLAN = 'califica', LIC_PFX = 'CQR';
const SHORT_RE = /^[A-Z]{3}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
async function licRPC(fn, args){
  let r; try{ r = await fetch(`${LIC_DB.url}/rest/v1/rpc/${fn}`, {method:'POST', headers:{'apikey':LIC_DB.key, 'Content-Type':'application/json'}, body:JSON.stringify(args)}); }
  catch(e){ const er = new Error('Sin conexión a internet.'); er.offline = true; throw er; }
  const j = await r.json().catch(() => null); if(!r.ok){ const er = new Error((j && (j.message || j.hint)) || ('Error ' + r.status)); er.offline = r.status >= 500 || r.status === 0; throw er; } return j;
}
// Los códigos se guardan en el mismo servicio de AsistQR, marcados con el plan "califica"
const LIC_APPS = ['califica', 'asistqr'];
async function licVerify(code){
  let last = null;
  for(const app of LIC_APPS){
    let r; try{ r = await licRPC('licencia_verificar', {p_codigo:code, p_app:app}); }catch(e){ if(e.offline) throw e; last = e; continue; }
    if(r && r.ok){ if(app === 'asistqr' && !String(r.plan || '').includes(LIC_PLAN)) { last = {ok:false, motivo:'otro'}; continue; } return Object.assign({app}, r); }
    if(r && (r.motivo === 'vencido' || r.motivo === 'desactivado')) return r;
    last = r;
  }
  return last && last.ok === false ? last : {ok:false, motivo:'no'};
}
function newShortCode(){ const A = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; const b = new Uint8Array(8); crypto.getRandomValues(b); const c = [...b].map(x => A[x % A.length]).join(''); return `${LIC_PFX}-${c.slice(0, 4)}-${c.slice(4)}`; }
const licMotivo = (m, v) => m === 'vencido' ? `Este código venció${v ? ' el ' + fmtD(v) : ''}. Pide la renovación al administrador.` : m === 'desactivado' ? 'Este código fue desactivado por el administrador.' : 'Código incorrecto. Revisa que esté bien escrito.';
function cleanCode(code){ code = String(code || '').trim(); const m = code.match(/#c=([^&\s]+)/); if(m) code = decodeURIComponent(m[1]); return code.replace(/\s+/g, ''); }
async function verifyCode(code){
  code = cleanCode(code);
  if(SHORT_RE.test(code.toUpperCase())){
    code = code.toUpperCase(); let r;
    try{ r = await licVerify(code); }catch(e){ throw new Error('Necesitas internet para activar tu código. Conéctate e intenta de nuevo.'); }
    if(!r || !r.ok) throw new Error(licMotivo(r && r.motivo, r && r.vence));
    return {role:'teacher', id:code, name:r.nombre || 'Maestro(a)', exp:r.vence ? r.vence.replace(/-/g, '') : '0', code, short:true, app:r.app};
  }
  const [p, s] = code.split('.'); if(!p || !s) throw new Error('El código no tiene el formato correcto.');
  let okSig = false;
  try{ const key = await crypto.subtle.importKey('jwk', ADMIN_PUB, {name:'ECDSA', namedCurve:'P-256'}, false, ['verify']);
    okSig = await crypto.subtle.verify({name:'ECDSA', hash:'SHA-256'}, key, ub64u(s), ub64u(p)); }catch(e){ okSig = false; }
  if(!okSig) throw new Error('Código inválido. Pide un código nuevo al administrador.');
  const [id, name, exp, app] = dec.decode(ub64u(p)).split('|');
  if(app && app !== 'cqr') throw new Error('Este código es de otra aplicación.');
  if(exp && exp !== '0' && exp < today().replace(/-/g, '')) throw new Error('Este código ya venció. Pide uno nuevo al administrador.');
  return {role:'teacher', id, name, exp, code};
}
async function importAdminKey(d){ return crypto.subtle.importKey('jwk', {...ADMIN_PUB, d}, {name:'ECDSA', namedCurve:'P-256'}, false, ['sign']); }
async function verifyMaster(txt){
  const d = String(txt || '').trim().replace(/^(AQR|CQR)-ADMIN-/, '').replace(/\s+/g, ''); let ok = false;
  try{ const k = await importAdminKey(d); const sig = await crypto.subtle.sign({name:'ECDSA', hash:'SHA-256'}, k, enc.encode('prueba'));
    const pub = await crypto.subtle.importKey('jwk', ADMIN_PUB, {name:'ECDSA', namedCurve:'P-256'}, false, ['verify']);
    ok = await crypto.subtle.verify({name:'ECDSA', hash:'SHA-256'}, pub, sig, enc.encode('prueba')); }catch(e){ ok = false; }
  if(!ok) throw new Error('Clave maestra incorrecta.');
  return {role:'owner', id:'owner', name:'Administrador', key:d};
}
async function makeLongCode(name, exp){
  const k = await importAdminKey(lic.key); const id = uid(6);
  const payload = `${id}|${String(name).replace(/\|/g, ' ').trim()}|${exp ? exp.replace(/-/g, '') : '0'}|cqr`;
  const sig = await crypto.subtle.sign({name:'ECDSA', hash:'SHA-256'}, k, enc.encode(payload));
  return {id, code:b64u(enc.encode(payload)) + '.' + b64u(sig)};
}
const masterStr = () => 'AQR-ADMIN-' + lic.key;
async function checkLicense(){
  if(!lic) return false;
  try{
    if(lic.role === 'owner') await verifyMaster(lic.key);
    else if(lic.short){ try{ const r = await licVerify(lic.code); if(r && !r.ok) throw new Error(licMotivo(r.motivo, r.vence)); if(r && r.ok){ lic.exp = r.vence ? r.vence.replace(/-/g, '') : '0'; lic.name = r.nombre || lic.name; LS.set('cqr_lic', lic); } }catch(e){ if(e.offline) return true; throw e; } return true; }
    else { const v = await verifyCode(lic.code); lic.exp = v.exp; }
  }catch(e){ lockout(e.message); return false; }
  try{ const r = await fetch('revocados.json', {cache:'no-store'}); if(r.ok){ const j = await r.json(); if((j.ids || []).includes(lic.id)){ lockout('Este código fue desactivado por el administrador.'); return false; } } }catch(e){}
  return true;
}
function lockout(msg){ LS.del('cqr_lic'); lic = null; route = 'welcome'; render(); setTimeout(() => toast(msg), 300); }

/* ---------- Respaldo ---------- */
function backupData(){ return {app:'CalificaQR', v:1, fecha:new Date().toISOString(), cfg, cursos, curId, cols, notas, evals, resp}; }
function restoreData(d){
  if(!d || d.app !== 'CalificaQR') throw new Error('Este archivo no es un respaldo de CalificaQR.');
  cfg = Object.assign(defaultCfg(), d.cfg || {}); cfg.setup = true; cursos = d.cursos || []; curId = d.curId || (cursos[0] && cursos[0].id) || null;
  cols = d.cols || []; notas = d.notas || {}; evals = d.evals || []; resp = d.resp || {};
  saveCfg(); saveCursos(); LS.set('cqr_cur', curId); saveCols(); saveNotas(); saveEvals(); saveResp(); applyTheme();
  if(d.imgs && window.TPL) Object.entries(d.imgs).forEach(([k, v]) => TPL.put(k, v).catch(() => {}));
}
