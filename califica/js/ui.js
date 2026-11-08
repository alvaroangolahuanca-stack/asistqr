'use strict';
/* =========================================================
   CalificaQR — pantallas
   ========================================================= */
const I = {
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
  doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
  scan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="m8 12 3 3 5-6"/></svg>',
  table:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>',
  more:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  left:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  right:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  down:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
  edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  print:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
  xls:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 12l6 6M15 12l-6 6"/></svg>',
  cam:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  hand:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11V5a1.5 1.5 0 0 1 3 0v5M12 10V4a1.5 1.5 0 0 1 3 0v6M15 10V6a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7h-.5a6 6 0 0 1-5-2.7L3 14.5a1.6 1.6 0 0 1 2.6-1.8L9 15V9a1.5 1.5 0 0 1 3 0"/></svg>',
  copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  school:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>',
  layers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/></svg>',
  sliders:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>',
  save:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
  lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
  help:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/></svg>',
  logout:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  torch:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 6l2 5v10h8V11z"/><path d="M12 14v2"/></svg>',
  img:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
  install:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 7v7M9 11l3 3 3-3M10 18h4"/></svg>'
};
const LOGO_APP = 'icons/icon-192.png';
let route = 'ini';

/* ---------- Hoja modal ---------- */
function sheet(html, mount){
  closeSheet();
  const ov = document.createElement('div'); ov.className = 'ov'; ov.id = 'ov';
  ov.innerHTML = `<div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>${html}</div>`;
  ov.addEventListener('click', e => { if(e.target === ov) closeSheet(); });
  document.body.appendChild(ov); const s = ov.querySelector('.sheet'); mount && mount(s); return s;
}
function closeSheet(){ const o = $('#ov'); if(o) o.remove(); }
function confirmSheet(title, text, okLabel, onOk, danger){
  sheet(`<h3>${esc(title)}</h3><p>${text}</p><div class="grid2"><button class="btn" id="cNo">Cancelar</button><button class="btn ${danger ? 'dark' : 'pri'}" id="cOk">${esc(okLabel)}</button></div>`, s => {
    $('#cNo', s).onclick = closeSheet; $('#cOk', s).onclick = () => { closeSheet(); onOk(); };
  });
}
function back(r){ return `<button class="iconbtn" data-back="${r}" aria-label="Volver">${I.left}</button>`; }
function bindBacks(root = document){ $$('[data-back]', root).forEach(b => b.onclick = () => go(b.dataset.back)); }

/* ---------- Estructura ---------- */
function header(){
  const c = curso();
  const lg = cfg.logoUE ? `<img src="${cfg.logoUE}" alt="">` : `<img src="${LOGO_APP}" alt="">`;
  return `<header class="top" id="topbar"><div class="logo">${lg}</div><div class="grow"><div class="t1">${esc(cfg.ue || 'CalificaQR')}</div>
  <div class="t2">${c ? esc(`${cursoCorto(c)} · ${TRIM[ui.trim - 1]} · ${c.gestion}`) : 'Configura tu curso'} ${I.down.replace('<svg', '<svg width="15" height="15"')}</div></div>
  ${c && c.logoGrado ? `<div class="gbadge"><img src="${c.logoGrado}" alt=""></div>` : ''}</header>`;
}
function navHTML(){
  const t = [['ini', 'Inicio', I.home], ['evs', 'Evaluaciones', I.doc], ['scan', 'Escanear', I.scan], ['pla', 'Planillas', I.table], ['mas', 'Más', I.more]];
  const grp = {evs:['evs', 'ev', 'ed'], pla:['pla', 'cen'], mas:['mas', 'est', 'cfg', 'cur', 'esc', 'adm', 'bk', 'ayu']};
  return `<div class="in">${t.map(([k, l, ic]) => k === 'scan' ? `<button class="scan" data-go="scan" aria-label="Escanear"><div class="ic">${ic}</div><span>${l}</span></button>`
    : `<button class="${(grp[k] || [k]).includes(route) ? 'on' : ''}" data-go="${k}">${ic}<span>${l}</span></button>`).join('')}</div>`;
}
const VIEWS = {};
function render(){
  stopScanner(); closeSheet();
  const app = $('#app'), tabs = $('#tabs'); app.classList.toggle('wide', route === 'pla' || route === 'cen');
  if(!lic){ tabs.hidden = true; app.innerHTML = vWelcome(); bindWelcome(); window.scrollTo(0, 0); return; }
  if(!cfg.setup || !curso()){ tabs.hidden = true; app.innerHTML = vWiz(); bindWiz(); return; }
  tabs.hidden = false; tabs.innerHTML = navHTML(); $$('[data-go]', tabs).forEach(b => b.onclick = () => go(b.dataset.go));
  const V = VIEWS[route] || VIEWS.ini;
  app.innerHTML = header() + `<main>${V.v()}</main>`;
  $('#topbar').onclick = switcher; bindBacks(app); V.b && V.b();
}
function go(r){ route = r; render(); window.scrollTo(0, 0); }

function switcher(){
  const c = curso();
  sheet(`<h3>Curso y trimestre</h3>
  <div class="seg" id="swT">${TRIM.map((t, i) => `<button class="${ui.trim === i + 1 ? 'on' : ''}" data-t="${i + 1}">${t}</button>`).join('')}</div>
  <div class="list">${cursos.map(x => `<div class="item" data-c="${x.id}"><div class="av">${esc(x.gradoN)}°</div><div class="nm"><b>${esc(cursoCorto(x))} · ${esc(NIVELES[x.nivel] || '')}</b><small>Gestión ${esc(x.gestion)} · ${(x.est || []).length} estudiantes</small></div>${x.id === c.id ? '<span class="pill ok">Activo</span>' : ''}</div>`).join('')}</div>
  <button class="btn block" id="swAdd">${I.plus} Agregar otro curso o gestión</button>`, s => {
    $$('[data-t]', s).forEach(b => b.onclick = () => { ui.trim = +b.dataset.t; saveUI(); closeSheet(); render(); });
    $$('[data-c]', s).forEach(b => b.onclick = () => { curId = b.dataset.c; LS.set('cqr_cur', curId); ui.area = null; saveUI(); closeSheet(); render(); });
    $('#swAdd', s).onclick = () => { closeSheet(); editCurso(null); };
  });
}

/* ---------- Bienvenida y activación ---------- */
function vWelcome(){
  return `<main style="padding-bottom:40px"><div class="hero"><img class="mark" src="${LOGO_APP}" alt=""><h1>CalificaQR</h1>
  <p>Califica evaluaciones con la cámara del celular, lleva tus planillas (Ser, Saber, Hacer y Autoevaluación) y descárgalas en Excel.</p></div>
  <div class="card stack"><b style="font:700 20px var(--display);text-transform:uppercase">Ingresa con tu código</b>
  <p class="sub">El código personal te lo entrega el administrador. Si recibiste un enlace, solo ábrelo y se activa solo.</p>
  <div class="field"><label for="acCode">Código de acceso</label><input id="acCode" placeholder="Ej.: CQR-7K2M-QX9P" autocomplete="off" autocapitalize="characters" spellcheck="false"></div>
  <button class="btn pri big block" id="acGo">${I.lock} Ingresar</button><p class="err" id="acErr"></p>
  <p class="hint">El administrador puede pegar aquí su clave maestra.</p></div>
  <button class="btn block instbtn" id="inst" hidden>${I.install} Instalar la aplicación en este celular</button>
  <div class="card soft stack"><b>¿Qué puedes hacer?</b><span class="hint">• Crear evaluaciones e imprimir hojas con QR y círculos para rellenar.<br>• Escanear y calificar en segundos, sin internet.<br>• Planillas por área y trimestre, centralizador y Excel.<br>• Tus datos se guardan solo en tu celular.</span></div></main>`;
}
function bindWelcome(){
  const go2 = async () => { const v = $('#acCode').value.trim(); $('#acErr').textContent = ''; if(!v){ $('#acErr').textContent = 'Escribe tu código.'; return; }
    $('#acGo').disabled = true; try{ await activate(v); }catch(e){ $('#acErr').textContent = e.message || 'Código inválido.'; } $('#acGo').disabled = false; };
  if(installEvt) $('#inst').hidden = false; $('#inst').onclick = () => { if(installEvt){ installEvt.prompt(); installEvt = null; $('#inst').hidden = true; } };
  $('#acGo').onclick = go2; $('#acCode').onkeydown = e => { if(e.key === 'Enter') go2(); };
}
async function activate(v){
  const l = /^(AQR|CQR)-ADMIN-/i.test(v.trim()) ? await verifyMaster(v) : await verifyCode(v);
  lic = l; LS.set('cqr_lic', lic); route = 'ini'; render(); pendingRestore();
  toast(lic.role === 'owner' ? 'Bienvenido, administrador' : `Bienvenido(a), ${lic.name}`);
}

/* ---------- Asistente inicial ---------- */
let wiz = {step:1, c:null};
function vWiz(){
  const c = wiz.c || (wiz.c = newCurso());
  const steps = `<div class="steps">${[1, 2, 3].map(i => `<i class="${i <= wiz.step ? 'on' : ''}"></i>`).join('')}</div>`;
  if(wiz.step === 1) return `<main style="padding-bottom:40px">${steps}<h2>Tu unidad educativa</h2>
    <p class="sub">Estos datos salen en las hojas de evaluación y en las planillas. Puedes cambiarlos cuando quieras.</p>
    <div class="field"><label for="wUE">Nombre de la unidad educativa</label><input id="wUE" value="${esc(cfg.ue)}" placeholder="Ej.: Unidad Educativa Simón Bolívar"></div>
    <div class="field"><label for="wMa">Maestra(o)</label><input id="wMa" value="${esc(cfg.maestro)}" placeholder="Nombre completo"></div>
    <div class="row"><div class="logoprev" id="wLogo">${cfg.logoUE ? `<img src="${cfg.logoUE}" alt="">` : I.img}</div><div class="stack" style="flex:1;gap:6px"><b>Logo de la U.E.</b><div class="row"><button class="btn sm" id="wLogoB">Elegir imagen</button>${cfg.logoUE ? '<button class="btn sm ghost" id="wLogoX">Quitar</button>' : ''}</div></div></div>
    <div class="field"><label>Color que los identifica</label>${swatches(cfg.color, 'wCol')}</div>
    <button class="btn pri big block" id="wNext">Siguiente ${I.right}</button>
    <div class="card soft stack"><span class="hint">¿Ya tienes un respaldo de CalificaQR? Cárgalo y listo.</span><button class="btn" id="wRest">${I.save} Restaurar respaldo</button></div></main>`;
  if(wiz.step === 2) return `<main style="padding-bottom:40px">${steps}<h2>Tu curso</h2>${cursoForm(c)}
    <div class="grid2"><button class="btn" id="wPrev">${I.left} Atrás</button><button class="btn pri" id="wNext">Siguiente ${I.right}</button></div></main>`;
  return `<main style="padding-bottom:40px">${steps}<h2>Lista de estudiantes</h2>
    <p class="sub">Sube tu lista desde Excel, Word o una foto, o pégala. También puedes hacerlo después.</p>
    <div class="card soft"><b>${(c.est || []).length}</b> estudiantes en ${esc(cursoCorto(c))}</div>
    <div class="grid2"><button class="btn" id="wImp">${I.users} Importar lista</button><button class="btn" id="wPaste">Pegar texto</button></div>
    <button class="btn pri big block" id="wFin">${I.check} Empezar</button><button class="btn ghost" id="wPrev">${I.left} Atrás</button></main>`;
}
function swatches(cur, id){ return `<div class="swatches" id="${id}">${COLORS.map(c => `<button type="button" class="sw ${c.toLowerCase() === String(cur).toLowerCase() ? 'on' : ''}" style="background:${c}" data-col="${c}" aria-label="Color ${c}"></button>`).join('')}<input type="color" value="${esc(cur)}" data-colp style="width:44px;height:40px;border:0;background:none;padding:0" aria-label="Otro color"></div>`; }
function bindSwatches(id, onPick){ const box = $('#' + id); if(!box) return;
  $$('[data-col]', box).forEach(b => b.onclick = () => { onPick(b.dataset.col); $$('.sw', box).forEach(x => x.classList.toggle('on', x === b)); });
  $('[data-colp]', box).oninput = e => { onPick(e.target.value); $$('.sw', box).forEach(x => x.classList.remove('on')); }; }
function bindWiz(){
  const c = wiz.c;
  if(wiz.step === 1){
    const keep = () => { cfg.ue = $('#wUE').value.trim(); cfg.maestro = $('#wMa').value.trim(); saveCfg(); };
    bindSwatches('wCol', col => { cfg.color = col; saveCfg(); applyTheme(); });
    $('#wLogoB').onclick = () => pickFile('image/*', async f => { try{ keep(); cfg.logoUE = await shrinkLogo(f); saveCfg(); render(); }catch(e){ toast(e.message); } });
    if($('#wLogoX')) $('#wLogoX').onclick = () => { keep(); cfg.logoUE = ''; saveCfg(); render(); };
    $('#wRest').onclick = () => pickFile('', restoreFile);
    $('#wNext').onclick = () => { keep(); if(!cfg.ue){ toast('Escribe el nombre de la unidad educativa'); return; } wiz.step = 2; render(); };
  } else if(wiz.step === 2){
    bindCursoForm(c);
    $('#wPrev').onclick = () => { readCursoForm(c); wiz.step = 1; render(); };
    $('#wNext').onclick = () => { readCursoForm(c); if(!c.areas.length){ toast('Elige al menos un área'); return; } wiz.step = 3; render(); };
  } else {
    const ensure = () => { if(!cursos.find(x => x.id === c.id)){ cursos.push(c); saveCursos(); } curId = c.id; LS.set('cqr_cur', curId); };
    $('#wImp').onclick = () => { ensure(); importStudents(() => render()); };
    $('#wPaste').onclick = () => { ensure(); pasteStudents(() => render()); };
    $$('#wPrev').forEach(b => b.onclick = () => { wiz.step = 2; render(); });
    $('#wFin').onclick = () => { ensure(); cfg.setup = true; saveCfg(); wiz = {step:1, c:null}; route = 'ini'; render(); toast('¡Listo! Ya puedes crear tu primera evaluación'); };
  }
}

/* ---------- Formulario de curso ---------- */
function cursoForm(c){
  const all = [...new Set([...c.areas, ...(c.nivel === 'SEC' ? AREAS_SEC : AREAS_PRI), ...Object.keys(cfg.areasExtra || {})])];
  return `<div class="grid2"><div class="field"><label for="cNiv">Nivel</label><select id="cNiv">${Object.entries(NIVELES).map(([k, v]) => `<option value="${k}" ${c.nivel === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
  <div class="field"><label for="cGes">Gestión</label><input id="cGes" inputmode="numeric" value="${esc(c.gestion)}"></div></div>
  <div class="grid2"><div class="field"><label for="cGr">Año de escolaridad</label><select id="cGr">${GRADOS.map((g, i) => `<option value="${i + 1}" ${c.gradoN === i + 1 ? 'selected' : ''}>${i + 1}° ${titleCase(g)}</option>`).join('')}</select></div>
  <div class="field"><label for="cPar">Paralelo</label><input id="cPar" value="${esc(c.paralelo)}" maxlength="3" autocapitalize="characters"></div></div>
  <div class="row"><div class="logoprev" id="cLogo">${c.logoGrado ? `<img src="${c.logoGrado}" alt="">` : I.img}</div><div class="stack" style="flex:1;gap:6px"><b>Logo del curso <span class="hint">(opcional)</span></b><div class="row"><button class="btn sm" id="cLogoB" type="button">Elegir imagen</button>${c.logoGrado ? '<button class="btn sm ghost" id="cLogoX" type="button">Quitar</button>' : ''}</div></div></div>
  <div class="stack" style="gap:6px"><span class="lbl">Áreas que enseñas (en este orden)</span>
  <div class="list" id="cAreas">${all.map(k => { const on = c.areas.includes(k); return `<div class="item" style="min-height:52px;cursor:default" data-k="${k}"><input type="checkbox" ${on ? 'checked' : ''} style="width:22px;height:22px;accent-color:var(--pri)" aria-label="${esc(areaName(k))}"><div class="nm"><b>${esc(areaName(k))}</b></div>${on ? `<button class="iconbtn sm" data-mv="-1" type="button" aria-label="Subir">${I.up}</button><button class="iconbtn sm" data-mv="1" type="button" aria-label="Bajar">${I.down}</button>` : ''}</div>`; }).join('')}</div>
  <button class="btn sm ghost" id="cAreaAdd" type="button">${I.plus} Agregar otra área</button></div>`;
}
function readCursoForm(c){
  c.nivel = $('#cNiv').value; c.gestion = $('#cGes').value.trim() || c.gestion; c.gradoN = +$('#cGr').value; c.paralelo = $('#cPar').value.trim().toUpperCase();
}
function bindCursoForm(c, redraw = render){
  const re = () => { readCursoForm(c); redraw(); };
  $('#cNiv').onchange = re;
  $('#cLogoB').onclick = () => pickFile('image/*', async f => { try{ readCursoForm(c); c.logoGrado = await shrinkLogo(f); if(cursos.includes(c)) saveCursos(); redraw(); }catch(e){ toast(e.message); } });
  if($('#cLogoX')) $('#cLogoX').onclick = () => { readCursoForm(c); c.logoGrado = ''; if(cursos.includes(c)) saveCursos(); redraw(); };
  $$('#cAreas [data-k]').forEach(row => {
    const k = row.dataset.k;
    $('input', row).onchange = e => { readCursoForm(c); if(e.target.checked){ if(!c.areas.includes(k)) c.areas.push(k); } else c.areas = c.areas.filter(x => x !== k); redraw(); };
    $$('[data-mv]', row).forEach(b => b.onclick = () => { readCursoForm(c); const i = c.areas.indexOf(k), j = i + +b.dataset.mv; if(j < 0 || j >= c.areas.length) return; [c.areas[i], c.areas[j]] = [c.areas[j], c.areas[i]]; redraw(); });
  });
  $('#cAreaAdd').onclick = () => sheet(`<h3>Nueva área</h3><div class="field"><label for="naN">Nombre del área</label><input id="naN" placeholder="Ej.: Robótica"></div><div class="field"><label for="naK">Sigla (3 letras)</label><input id="naK" maxlength="4" autocapitalize="characters" placeholder="ROB"></div><button class="btn pri block" id="naGo">Agregar</button>`, s => {
    $('#naGo', s).onclick = () => { const n = $('#naN', s).value.trim(), k = ($('#naK', s).value.trim() || n.slice(0, 3)).toUpperCase().replace(/[^A-Z0-9]/g, '');
      if(!n || !k){ toast('Completa el nombre'); return; } if(AREAS[k] && AREAS[k] !== n){ toast('Esa sigla ya existe; usa otra'); return; }
      cfg.areasExtra = cfg.areasExtra || {}; cfg.areasExtra[k] = n; saveCfg(); readCursoForm(c); if(!c.areas.includes(k)) c.areas.push(k); closeSheet(); redraw(); };
  });
}

/* ================= INICIO ================= */
VIEWS.ini = {v(){
  const c = curso(), est = activeStudents(), evs = evals.filter(e => e.cid === c.id && e.t === ui.trim);
  return `<div class="seg" id="tSeg">${TRIM.map((t, i) => `<button class="${ui.trim === i + 1 ? 'on' : ''}" data-t="${i + 1}">${t.replace('Trimestre', 'Trim.')}</button>`).join('')}</div>
  ${!est.length ? `<div class="banner warn">Aún no tienes estudiantes en ${esc(cursoCorto())}. <a href="#" id="goEst" style="color:inherit">Agrega tu lista</a>.</div>` : ''}
  <div class="actions">
    <button class="act main" data-g="scan">${I.scan}<b>Escanear</b><span>Califica con la cámara</span></button>
    <button class="act" id="newEv">${I.plus}<b>Nueva evaluación</b><span>Preguntas, clave e impresión</span></button>
    <button class="act" data-g="pla">${I.table}<b>Planillas</b><span>Ser, Saber, Hacer y Autoev.</span></button>
    <button class="act" data-g="est">${I.users}<b>Estudiantes</b><span>${est.length} en la lista</span></button>
  </div>
  <div class="row between"><h3>Evaluaciones · ${TRIM[ui.trim - 1]}</h3><button class="btn sm ghost" data-g="evs">Ver todas</button></div>
  ${evs.length ? `<div class="stack">${evs.slice().reverse().slice(0, 6).map(evCard).join('')}</div>` : `<div class="card soft empty"><b>Sin evaluaciones</b>Crea una evaluación, imprime las hojas y escanéalas.</div>`}`;
}, b(){
  $$('#tSeg [data-t]').forEach(b => b.onclick = () => { ui.trim = +b.dataset.t; saveUI(); render(); });
  $$('[data-g]').forEach(b => b.onclick = () => go(b.dataset.g));
  if($('#goEst')) $('#goEst').onclick = e => { e.preventDefault(); go('est'); };
  $('#newEv').onclick = newEval; bindEvCards();
}};
function evCard(e){
  const p = evProgress(e), pct = p.tot ? Math.round(p.done / p.tot * 100) : 0;
  return `<div class="card stack" data-ev="${e.id}" style="cursor:pointer;gap:8px"><div class="row between" style="flex-wrap:nowrap"><div style="min-width:0"><b style="display:block;font-weight:700;line-height:1.2">${esc(e.titulo || 'Sin título')}</b><span class="hint">${esc(areaName(e.a))} · ${fmtD(e.fecha)} · ${(e.qs || []).length} preguntas</span></div><span class="pill ${p.done && p.done === p.tot ? 'ok' : 'pri'}">${p.done}/${p.tot}</span></div><div class="prog"><i style="width:${pct}%"></i></div></div>`;
}
function bindEvCards(){ $$('[data-ev]').forEach(b => b.onclick = () => { ui.ev = b.dataset.ev; saveUI(); go('ev'); }); }

/* ================= EVALUACIONES ================= */
VIEWS.evs = {v(){
  const c = curso(); const ar = c.areas;
  const list = evals.filter(e => e.cid === c.id && e.t === ui.trim && (!ui.evArea || e.a === ui.evArea));
  return `<div class="row between"><h2>Evaluaciones</h2><button class="btn pri sm" id="newEv">${I.plus} Nueva</button></div>
  <div class="seg" id="tSeg">${TRIM.map((t, i) => `<button class="${ui.trim === i + 1 ? 'on' : ''}" data-t="${i + 1}">${TRIMC[i]}</button>`).join('')}</div>
  <div class="chips"><button class="chip ${!ui.evArea ? 'on' : ''}" data-a="">Todas</button>${ar.map(a => `<button class="chip ${ui.evArea === a ? 'on' : ''}" data-a="${a}">${esc(areaName(a))}</button>`).join('')}</div>
  ${list.length ? `<div class="stack">${list.slice().reverse().map(evCard).join('')}</div>` : `<div class="card soft empty"><b>Nada por aquí</b>Toca “Nueva” para crear una evaluación.</div>`}`;
}, b(){
  $('#newEv').onclick = newEval; bindEvCards();
  $$('#tSeg [data-t]').forEach(b => b.onclick = () => { ui.trim = +b.dataset.t; saveUI(); render(); });
  $$('[data-a]').forEach(b => b.onclick = () => { ui.evArea = b.dataset.a; saveUI(); render(); });
}};
function newEval(){
  const c = curso(); const a = ui.evArea && c.areas.includes(ui.evArea) ? ui.evArea : (ui.area && c.areas.includes(ui.area) ? ui.area : c.areas[0]);
  const ev = {id:uid(6), cid:c.id, a, t:ui.trim, d:'saber', titulo:'', fecha:today(), instr:'', qs:[], lays:[], ver:0};
  evals.push(ev); saveEvals(); ui.ev = ev.id; saveUI(); go('ed');
}
const curEv = () => evals.find(e => e.id === ui.ev);

VIEWS.ev = {v(){
  const ev = curEv(); if(!ev) return `${back('evs')}<div class="empty"><b>No encontrada</b></div>`;
  const R = resp[ev.id] || {}, st = students(), p = evProgress(ev);
  const ns = st.filter(s => R[s.id]).map(s => evScore(ev, R[s.id].m).nota); const avg = ns.length ? r1(ns.reduce((a, b) => a + b, 0) / ns.length) : null;
  return `<div class="row" style="flex-wrap:nowrap">${back('evs')}<div style="min-width:0"><h2 style="font-size:23px">${esc(ev.titulo || 'Sin título')}</h2><span class="hint">${esc(areaName(ev.a))} · ${TRIM[ev.t - 1]} · ${fmtD(ev.fecha)}</span></div></div>
  <div class="row"><span class="pill pri">${DIMS.find(d => d.k === (ev.d || 'saber')).t} · sobre ${dimMax(ev.d || 'saber')}</span><span class="pill">${(ev.qs || []).length} preguntas · ${evMax(ev)} pts</span></div>
  <div class="stat3"><div><b>${p.done}/${p.tot}</b><span>Calificados</span></div><div><b>${avg !== null ? fmtN(avg) : '–'}</b><span>Promedio</span></div><div><b>${ns.length ? Math.max(...ns) : '–'}</b><span>Nota más alta</span></div></div>
  <div class="grid2"><button class="btn pri" id="evPrint">${I.print} Imprimir hojas</button><button class="btn pri" id="evScan">${I.scan} Escanear</button>
  <button class="btn" id="evEdit">${I.edit} Preguntas y clave</button><button class="btn" id="evXls">${I.xls} Excel resultados</button></div>
  <div class="row between"><h3>Estudiantes</h3><span class="hint">Toca uno para calificar a mano</span></div>
  ${st.length ? `<div class="list">${st.map(s => { const r = R[s.id]; const sc = r ? evScore(ev, r.m) : null;
    return `<div class="item ${s.ret ? 'est-ret' : ''}" data-st="${s.id}"><div class="av num">${s.n}</div><div class="nm"><b>${esc(s.nombre)}</b><small>${r ? `${fmtN(sc.tot)} de ${sc.max} pts${sc.pend ? ` · <span style="color:var(--warn)">${sc.pend} sin revisar</span>` : ''}` : 'Sin calificar'}</small></div>${r ? `<span class="pill ${sc.nota >= dimMax(ev.d || 'saber') * .51 ? 'ok' : 'bad'}" style="font-size:15px">${sc.nota}</span>` : I.right.replace('<svg', '<svg width="18" height="18"')}</div>`; }).join('')}</div>` : '<div class="card soft empty"><b>Sin estudiantes</b>Agrega tu lista en Más → Estudiantes.</div>'}
  <div class="grid2"><button class="btn ghost" id="evDup">${I.copy} Duplicar</button><button class="btn ghost" id="evDel" style="color:var(--bad)">${I.trash} Eliminar</button></div>`;
}, b(){
  const ev = curEv(); if(!ev) return;
  $('#evEdit').onclick = () => go('ed');
  $('#evPrint').onclick = () => printSheet(ev);
  $('#evScan').onclick = () => go('scan');
  $('#evXls').onclick = () => withLib('XLSX', () => XL.exportEval(ev));
  $$('[data-st]').forEach(b => b.onclick = () => openReview(ev, students().find(s => s.id === b.dataset.st), null));
  $('#evDup').onclick = () => { const n = JSON.parse(JSON.stringify(ev)); n.id = uid(6); n.titulo = (ev.titulo || '') + ' (copia)'; n.colId = null; n.lays = []; n.ver = 0; n.qs.forEach(q => q.id = uid(5)); n.qs.forEach((q, i) => { if(q.tipo === 'rel') q.orden = HOJA.relOrder(ev.qs[i]); });
    evals.push(n); saveEvals(); ui.ev = n.id; saveUI(); go('ed'); toast('Evaluación duplicada'); };
  $('#evDel').onclick = () => confirmSheet('Eliminar evaluación', `Se borrarán la evaluación, sus resultados y su columna en la planilla de ${esc(areaName(ev.a))}.`, 'Eliminar', () => {
    evals = evals.filter(e => e.id !== ev.id); delete resp[ev.id]; if(ev.colId){ cols = cols.filter(c => c.id !== ev.colId); delete notas[ev.colId]; }
    saveEvals(); saveResp(); saveCols(); saveNotas(); go('evs'); toast('Evaluación eliminada'); }, true);
}};
function withLib(name, fn){ if(window[name] || (name === 'jsPDF' && window.jspdf)) return fn(); toast('Cargando…'); let n = 0; const t = setInterval(() => { if(window[name] || (name === 'jsPDF' && window.jspdf)){ clearInterval(t); fn(); } else if(++n > 50){ clearInterval(t); toast('No se pudo cargar. Revisa tu conexión y vuelve a abrir la app.'); } }, 100); }

/* ---------- Editor ---------- */
VIEWS.ed = {v(){
  const ev = curEv(); if(!ev) return back('evs');
  const c = curso(), has = Object.keys(resp[ev.id] || {}).length;
  return `<div class="row" style="flex-wrap:nowrap">${back('ev')}<h2>${ev.qs.length || ev.titulo ? 'Editar evaluación' : 'Nueva evaluación'}</h2></div>
  ${has ? `<div class="banner warn">Ya hay ${has} estudiantes calificados. Si cambias la clave, sus notas se recalculan solas. Si cambias el texto de las preguntas, vuelve a imprimir las hojas.</div>` : ''}
  <div class="field"><label for="eT">Título o tema</label><input id="eT" value="${esc(ev.titulo)}" placeholder="Ej.: Biodiversidad y especies en extinción"></div>
  <div class="grid2"><div class="field"><label for="eA">Área</label><select id="eA">${c.areas.map(a => `<option value="${a}" ${ev.a === a ? 'selected' : ''}>${esc(areaName(a))}</option>`).join('')}</select></div>
  <div class="field"><label for="eF">Fecha</label><input id="eF" type="date" value="${esc(ev.fecha)}"></div></div>
  <div class="grid2"><div class="field"><label for="eTr">Trimestre</label><select id="eTr">${TRIM.map((t, i) => `<option value="${i + 1}" ${ev.t === i + 1 ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
  <div class="field"><label for="eD">Va a la dimensión</label><select id="eD">${['saber', 'hacer'].map(k => `<option value="${k}" ${(ev.d || 'saber') === k ? 'selected' : ''}>${k === 'saber' ? 'Saber' : 'Hacer'} (sobre ${dimMax(k)})</option>`).join('')}</select></div></div>
  <details><summary class="hint" style="cursor:pointer;font-weight:700">Instrucciones para el estudiante (opcional)</summary><div class="field" style="margin-top:8px"><textarea id="eI" placeholder="Lee con atención. En las preguntas con círculos, rellena por completo el círculo de tu respuesta.">${esc(ev.instr || '')}</textarea></div></details>
  <div class="row between"><h3>Preguntas</h3><span class="pill pri">Total: ${evMax(ev)} pts → ${dimMax(ev.d || 'saber')}</span></div>
  ${ev.qs.length ? `<div class="stack">${ev.qs.map((q, i) => `<div class="qcard"><div class="qn">${i + 1}</div><div class="nm" data-qe="${i}" style="cursor:pointer"><b>${esc(q.txt || '(sin enunciado)')}</b><small>${QTYPES[q.tipo].t} · ${qSummary(q)} · ${qMax(q)} pts</small></div>
    <div class="qtools"><button class="iconbtn sm" data-qu="${i}" aria-label="Subir">${I.up}</button><button class="iconbtn sm" data-qd="${i}" aria-label="Bajar">${I.down}</button></div></div>`).join('')}</div>`
    : `<div class="card soft empty"><b>Agrega tu primera pregunta</b>Las de selección, V/F y relacionar se califican solas con la cámara.</div>`}
  <button class="btn pri big block" id="qAdd">${I.plus} Agregar pregunta</button>
  <button class="btn okb block" id="edOk">${I.check} Listo</button>`;
}, b(){
  const ev = curEv(); if(!ev) return;
  const keep = () => { ev.titulo = $('#eT').value.trim(); ev.a = $('#eA').value; ev.fecha = $('#eF').value; ev.t = +$('#eTr').value; ev.d = $('#eD').value; ev.instr = $('#eI').value.trim(); saveEvals(); if(ev.colId || Object.keys(resp[ev.id] || {}).length) evCol(ev); };
  ['#eT', '#eA', '#eF', '#eTr', '#eD', '#eI'].forEach(s => $(s).onchange = () => { keep(); if(s === '#eD') { recalcEval(ev); render(); } });
  $('#qAdd').onclick = () => { keep(); pickQType(t => editQ(ev, null, t)); };
  $$('[data-qe]').forEach(b => b.onclick = () => { keep(); editQ(ev, +b.dataset.qe); });
  const mv = (i, d) => { keep(); const j = i + d; if(j < 0 || j >= ev.qs.length) return; [ev.qs[i], ev.qs[j]] = [ev.qs[j], ev.qs[i]]; saveEvals(); render(); };
  $$('[data-qu]').forEach(b => b.onclick = () => mv(+b.dataset.qu, -1)); $$('[data-qd]').forEach(b => b.onclick = () => mv(+b.dataset.qd, 1));
  $('#edOk').onclick = () => { keep(); if(!ev.titulo){ toast('Escribe el título de la evaluación'); $('#eT').focus(); return; } evCol(ev); recalcEval(ev); go('ev'); };
}};
function qSummary(q){
  switch(q.tipo){
    case 'sel': return `${(q.ops || []).length} opciones · correcta ${HOJA.LET[q.ok || 0].toUpperCase()}`;
    case 'vf': return `${(q.items || []).length} afirmaciones`;
    case 'rel': return `${(q.pares || []).length} pares`;
    case 'comp': return `${HOJA.blanksOf(q.texto).length} espacios`;
    case 'lista': return `${q.n} casillas`;
    case 'abi': return `${q.lineas || 3} líneas`;
    case 'prob': return `${(q.crit || []).length} criterios`;
  }
}
function recalcEval(ev){
  const R = resp[ev.id] || {}; const c = evCol(ev);
  Object.entries(R).forEach(([sid, r]) => setN(c.id, sid, evScore(ev, r.m).nota)); saveNotas();
}
function pickQType(cb){
  sheet(`<h3>Tipo de pregunta</h3><div class="typegrid">${Object.entries(QTYPES).map(([k, t]) => `<button data-ty="${k}"><b>${t.t}</b><span>${t.d}</span>${t.omr ? '<span class="pill ok" style="align-self:flex-start;margin-top:2px">Automática</span>' : ''}</button>`).join('')}</div>`, s => {
    $$('[data-ty]', s).forEach(b => b.onclick = () => { closeSheet(); cb(b.dataset.ty); });
  });
}
const QDEF = {
  sel:() => ({txt:'', ops:['', '', ''], ok:0}),
  vf:() => ({txt:'Rellena V si es verdadero o F si es falso.', items:[{t:'', ok:'V'}, {t:'', ok:'F'}, {t:'', ok:'V'}, {t:'', ok:'F'}]}),
  rel:() => ({txt:'Relaciona cada elemento con su descripción.', pares:[{i:'', d:''}, {i:'', d:''}, {i:'', d:''}]}),
  comp:() => ({txt:'Completa.', texto:'', resp:[]}),
  lista:() => ({txt:'', n:4, resp:[]}),
  abi:() => ({txt:'', lineas:3, resp:''}),
  prob:() => ({txt:'', alto:55, resp:'', crit:[{t:'Planteamiento / datos', p:2}, {t:'Operaciones (procedimiento)', p:2}, {t:'Respuesta correcta', p:1}]})
};
function editQ(ev, idx, tipo){
  const isNew = idx === null; const q = isNew ? Object.assign({id:uid(5), tipo, pts:5}, QDEF[tipo]()) : JSON.parse(JSON.stringify(ev.qs[idx]));
  const draw = () => {
    let body = '';
    const ptsSel = `<div class="field"><label for="qP">Puntaje de la pregunta</label><select id="qP">${[1, 2, 3, 4, 5, 6, 8, 10].map(n => `<option ${qMax(q) === n ? 'selected' : ''}>${n}</option>`).join('')}</select></div>`;
    const txt = `<div class="field"><label for="qT">Enunciado</label><textarea id="qT" style="min-height:64px">${esc(q.txt)}</textarea></div>`;
    switch(q.tipo){
      case 'sel': body = `<span class="lbl">Opciones · toca el círculo de la correcta</span>${q.ops.map((o, i) => `<div class="optrow"><button class="radio ${q.ok === i ? 'on' : ''}" data-ok="${i}">${HOJA.LET[i].toUpperCase()}</button><input type="text" data-op="${i}" value="${esc(o)}" placeholder="Opción ${HOJA.LET[i].toUpperCase()}"><button class="iconbtn sm" data-rm="${i}" aria-label="Quitar">${I.x}</button></div>`).join('')}
        ${q.ops.length < 5 ? `<button class="btn sm ghost" id="qAddO">${I.plus} Opción</button>` : ''}`; break;
      case 'vf': body = `<span class="lbl">Afirmaciones · marca si es V o F</span>${q.items.map((it, i) => `<div class="optrow"><div class="vfb"><button class="${it.ok === 'V' ? 'on' : ''}" data-v="${i}">V</button><button class="${it.ok === 'F' ? 'on' : ''}" data-f="${i}">F</button></div><input type="text" data-it="${i}" value="${esc(it.t)}" placeholder="Afirmación ${i + 1}"><button class="iconbtn sm" data-rm="${i}" aria-label="Quitar">${I.x}</button></div>`).join('')}
        ${q.items.length < 8 ? `<button class="btn sm ghost" id="qAddO">${I.plus} Afirmación</button>` : ''}`; break;
      case 'rel': body = `<span class="lbl">Escribe cada par correcto (la app mezcla las descripciones al imprimir)</span>${q.pares.map((p, i) => `<div class="card soft stack" style="padding:10px;gap:6px"><div class="optrow"><b style="width:22px">${i + 1}.</b><input type="text" data-pi="${i}" value="${esc(p.i)}" placeholder="Elemento (ej.: Contaminación)"><button class="iconbtn sm" data-rm="${i}" aria-label="Quitar">${I.x}</button></div><div class="optrow"><span style="width:22px">→</span><input type="text" data-pd="${i}" value="${esc(p.d)}" placeholder="Su descripción correcta"></div></div>`).join('')}
        ${q.pares.length < 6 ? `<button class="btn sm ghost" id="qAddO">${I.plus} Par</button>` : ''}`; break;
      case 'comp': { const bl = HOJA.blanksOf(q.texto).length;
        body = `<div class="field"><label for="qX">Texto · escribe ___ (tres guiones bajos) donde va cada espacio</label><textarea id="qX" placeholder="La biodiversidad incluye ___ , ___ y procesos ecológicos.">${esc(q.texto)}</textarea></div>
        <button class="btn sm ghost" id="qBl" type="button">Insertar espacio ___</button>
        <span class="lbl">Respuestas (${bl}) · separa con / si aceptas varias</span>${Array.from({length:bl}, (_, i) => `<div class="optrow"><b style="width:22px">${i + 1}.</b><input type="text" data-rs="${i}" value="${esc((q.resp || [])[i] || '')}" placeholder="Respuesta del espacio ${i + 1}"></div>`).join('') || '<span class="hint">Aún no hay espacios en el texto.</span>'}`; break; }
      case 'lista': body = `<div class="field"><label for="qN">Número de casillas</label><select id="qN">${[1, 2, 3, 4, 5, 6].map(n => `<option ${+q.n === n ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
        <div class="field"><label for="qR">Respuestas aceptadas · una por línea (en cualquier orden)</label><textarea id="qR">${esc((q.resp || []).join('\n'))}</textarea></div>`; break;
      case 'abi': body = `<div class="field"><label for="qL">Líneas para responder</label><select id="qL">${[1, 2, 3, 4, 5, 6, 8].map(n => `<option ${+q.lineas === n ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
        <div class="field"><label for="qR">Respuesta esperada (guía para ti)</label><textarea id="qR">${esc(q.resp || '')}</textarea></div>`; break;
      case 'prob': body = `<div class="field"><label for="qA">Espacio para el procedimiento</label><select id="qA">${[[35, 'Pequeño'], [55, 'Mediano'], [80, 'Grande'], [110, 'Muy grande']].map(([v, t]) => `<option value="${v}" ${+q.alto === v ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
        <div class="field"><label for="qR">Respuesta correcta</label><input id="qR" value="${esc(q.resp || '')}"></div>
        <span class="lbl">Criterios del proceso (puntos de cada paso)</span>${q.crit.map((c, i) => `<div class="optrow"><input type="text" data-ct="${i}" value="${esc(c.t)}"><select data-cp="${i}" style="border:1.5px solid var(--line);border-radius:10px;padding:8px">${[0.5, 1, 1.5, 2, 2.5, 3, 4, 5].map(n => `<option ${+c.p === n ? 'selected' : ''}>${n}</option>`).join('')}</select><button class="iconbtn sm" data-rm="${i}" aria-label="Quitar">${I.x}</button></div>`).join('')}
        ${q.crit.length < 6 ? `<button class="btn sm ghost" id="qAddO">${I.plus} Criterio</button>` : ''}<span class="hint">Suma de criterios: ${q.crit.reduce((s, c) => s + +c.p, 0)} → se ajusta a ${qMax(q)} pts.</span>`; break;
    }
    return `<div class="row between"><h3>${QTYPES[q.tipo].t}</h3>${!isNew ? `<button class="btn sm ghost" id="qDel" style="color:var(--bad)">${I.trash} Eliminar</button>` : ''}</div>${txt}${body}${ptsSel}
      <div class="hint">${HOJA.nParts(q) > 1 ? `Puntaje por aciertos: ${Array.from({length:HOJA.nParts(q)}, (_, k) => `${k + 1}→${fmtN(escalaPts(HOJA.nParts(q), k + 1, qMax(q)))}`).join(' · ')}` : ''}</div>
      <div class="grid2"><button class="btn" id="qNo">Cancelar</button><button class="btn pri" id="qOk">${I.check} Guardar</button></div>`;
  };
  const read = s => {
    q.txt = $('#qT', s).value.trim(); q.pts = +$('#qP', s).value;
    $$('[data-op]', s).forEach(i => q.ops[+i.dataset.op] = i.value); $$('[data-it]', s).forEach(i => q.items[+i.dataset.it].t = i.value);
    $$('[data-pi]', s).forEach(i => q.pares[+i.dataset.pi].i = i.value); $$('[data-pd]', s).forEach(i => q.pares[+i.dataset.pd].d = i.value);
    if($('#qX', s)) q.texto = $('#qX', s).value; if(q.tipo === 'comp'){ const r = q.resp || []; $$('[data-rs]', s).forEach(i => r[+i.dataset.rs] = i.value.trim()); q.resp = r.slice(0, HOJA.blanksOf(q.texto).length); }
    if($('#qN', s)) q.n = +$('#qN', s).value; if($('#qL', s)) q.lineas = +$('#qL', s).value; if($('#qA', s)) q.alto = +$('#qA', s).value;
    if($('#qR', s)) q.resp = q.tipo === 'lista' ? $('#qR', s).value.split('\n').map(x => x.trim()).filter(Boolean) : $('#qR', s).value.trim();
    $$('[data-ct]', s).forEach(i => q.crit[+i.dataset.ct].t = i.value); $$('[data-cp]', s).forEach(i => q.crit[+i.dataset.cp].p = +i.value);
  };
  const mount = s => {
    const re = () => { read(s); const sc = s.scrollTop; s.innerHTML = '<div class="grab"></div>' + draw(); mount(s); s.scrollTop = sc; };
    $('#qNo', s).onclick = closeSheet;
    $$('[data-ok]', s).forEach(b => b.onclick = () => { read(s); q.ok = +b.dataset.ok; re(); });
    $$('[data-v]', s).forEach(b => b.onclick = () => { read(s); q.items[+b.dataset.v].ok = 'V'; re(); });
    $$('[data-f]', s).forEach(b => b.onclick = () => { read(s); q.items[+b.dataset.f].ok = 'F'; re(); });
    $$('[data-rm]', s).forEach(b => b.onclick = () => { read(s); const i = +b.dataset.rm;
      if(q.tipo === 'sel'){ if(q.ops.length <= 2) return toast('Mínimo 2 opciones'); q.ops.splice(i, 1); if(q.ok >= q.ops.length) q.ok = 0; }
      if(q.tipo === 'vf'){ if(q.items.length <= 1) return; q.items.splice(i, 1); }
      if(q.tipo === 'rel'){ if(q.pares.length <= 2) return toast('Mínimo 2 pares'); q.pares.splice(i, 1); delete q.orden; }
      if(q.tipo === 'prob'){ if(q.crit.length <= 1) return; q.crit.splice(i, 1); } re(); });
    if($('#qAddO', s)) $('#qAddO', s).onclick = () => { read(s); if(q.tipo === 'sel') q.ops.push(''); if(q.tipo === 'vf') q.items.push({t:'', ok:'V'}); if(q.tipo === 'rel'){ q.pares.push({i:'', d:''}); delete q.orden; } if(q.tipo === 'prob') q.crit.push({t:'', p:1}); re(); };
    if($('#qX', s)){ $('#qX', s).onchange = re; }
    if($('#qBl', s)) $('#qBl', s).onclick = () => { const t = $('#qX', s); const p = t.selectionStart ?? t.value.length; t.value = t.value.slice(0, p) + ' ___ ' + t.value.slice(p); re(); };
    ['#qP', '#qN', '#qA'].forEach(id => { if($(id, s)) $(id, s).onchange = re; });
    if($('#qDel', s)) $('#qDel', s).onclick = () => { closeSheet(); confirmSheet('Eliminar pregunta', 'Se quitará esta pregunta de la evaluación.', 'Eliminar', () => { ev.qs.splice(idx, 1); saveEvals(); recalcEval(ev); render(); }, true); };
    $('#qOk', s).onclick = () => { read(s);
      const bad = validQ(q); if(bad){ toast(bad); return; }
      if(q.tipo === 'rel' && !q.orden) q.orden = HOJA.relOrder(q);
      if(isNew) ev.qs.push(q); else ev.qs[idx] = q; saveEvals(); recalcEval(ev); closeSheet(); render(); };
  };
  sheet(draw(), mount);
}
function validQ(q){
  if(!q.txt) return 'Escribe el enunciado';
  if(q.tipo === 'sel' && q.ops.some(o => !o.trim())) return 'Completa todas las opciones';
  if(q.tipo === 'vf' && q.items.some(o => !o.t.trim())) return 'Completa todas las afirmaciones';
  if(q.tipo === 'rel' && q.pares.some(p => !p.i.trim() || !p.d.trim())) return 'Completa todos los pares';
  if(q.tipo === 'comp' && !HOJA.blanksOf(q.texto).length) return 'Escribe ___ donde van los espacios';
  return '';
}

/* ---------- Imprimir hojas ---------- */
function printSheet(ev){
  if(!ev.qs.length){ toast('Primero agrega preguntas'); return; }
  const st = activeStudents();
  sheet(`<h3>Imprimir hojas</h3>
  <div class="seg" id="pMode"><button class="on" data-m="nombre">Una por estudiante</button><button data-m="copia">Para fotocopiar</button></div>
  <p class="hint" id="pHint">Cada hoja sale con el nombre y número de lista del estudiante (${st.length} estudiantes). No hay que escribir el nombre.</p>
  <div class="field"><label for="pPap">Papel</label><select id="pPap"><option value="carta" ${cfg.papel === 'carta' ? 'selected' : ''}>Carta</option><option value="oficio" ${cfg.papel === 'oficio' ? 'selected' : ''}>Oficio</option></select></div>
  <button class="btn pri big block" id="pGo">${I.print} Crear PDF</button>
  <p class="hint">Imprime en tamaño real. Las 4 marcas negras de las esquinas y el código QR no deben cortarse.</p>`, s => {
    let mode = 'nombre';
    $$('[data-m]', s).forEach(b => b.onclick = () => { mode = b.dataset.m; $$('[data-m]', s).forEach(x => x.classList.toggle('on', x === b));
      $('#pHint', s).textContent = mode === 'nombre' ? `Cada hoja sale con el nombre y número de lista del estudiante (${st.length} estudiantes). No hay que escribir el nombre.` : 'Una sola hoja para sacar fotocopias. El estudiante escribe su nombre y rellena su número de lista en círculos.'; });
    $('#pGo', s).onclick = () => withLib('jsPDF', async () => {
      if(mode === 'nombre' && !st.length){ toast('No hay estudiantes en la lista'); return; }
      cfg.papel = $('#pPap', s).value; saveCfg(); $('#pGo', s).disabled = true; $('#pGo', s).textContent = 'Preparando…';
      try{ await buildPDF(ev, mode); closeSheet(); }catch(e){ console.error(e); toast('No se pudo crear el PDF: ' + e.message); $('#pGo', s).disabled = false; }
    });
  });
}
async function logoInfo(src){ if(!src) return null; const im = await loadImg(src); if(!im) return null; return {data:src, fmt:/^data:image\/png/.test(src) ? 'PNG' : 'JPEG', w:im.width, h:im.height}; }
function hojaCtx(ev, people){
  const c = cursos.find(x => x.id === ev.cid) || curso();
  return {ue:cfg.ue, area:areaName(ev.a), curso:`${cursoCorto(c)} - ${(NIVELES[c.nivel] || '').split(' ')[0]}`, trim:TRIM[ev.t - 1], gestion:c.gestion, color:cfg.color, papel:cfg.papel || 'carta',
    total:evMax(ev), numMax:(c.est || []).reduce((m, s) => Math.max(m, s.n), 0), students:people};
}
async function buildPDF(ev, mode){
  const c = cursos.find(x => x.id === ev.cid) || curso();
  const people = mode === 'nombre' ? (c.est || []).filter(s => !s.ret).sort((a, b) => a.n - b.n).map(s => ({n:s.n, nombre:s.nombre})) : null;
  const ctx = hojaCtx(ev, people); ctx.logoUE = await logoInfo(cfg.logoUE); ctx.logoGrado = await logoInfo(c.logoGrado);
  // 1) maqueta de prueba para saber si cambió el diseño
  const probe = HOJA.build(ev, Object.assign({}, ctx, {students:people ? people.slice(0, 1) : null})).layout;
  const key = JSON.stringify(probe.pages) + JSON.stringify(probe.num) + probe.W + 'x' + probe.H;
  ev.lays = ev.lays || [];
  let L = ev.lays.find(l => l.mode === mode && l.key === key);
  if(!L){ ev.ver = (ev.lays.reduce((m, l) => Math.max(m, l.ver), 0) || 0) + 1; L = {ver:ev.ver, mode, key, layout:probe}; ev.lays.push(L); ev.lays = ev.lays.slice(-8); }
  ev.ver = L.ver; saveEvals();
  const {doc} = HOJA.build(ev, ctx);
  const blob = doc.output('blob');
  await shareOrDownload(blob, `${fileName(ev.titulo || 'Evaluacion')}_${cursoCorto(c).replace(/\W+/g, '')}${mode === 'copia' ? '_fotocopia' : ''}.pdf`);
  evCol(ev);
}

/* ================= ESCÁNER ================= */
const SC = {stream:null, track:null, timer:null, busy:false, prev:null, paused:false, torch:false, can:null};
VIEWS.scan = {v(){
  const any = evals.some(e => (e.lays || []).length);
  return `<div class="row between"><h2>Escanear</h2><button class="btn sm ghost" id="scHelp">${I.help} Consejos</button></div>
  ${!any ? `<div class="banner warn">Primero crea una evaluación e imprime sus hojas: el escáner reconoce las hojas por su código QR.</div>` : ''}
  <div class="scanbox" id="sbox"><video id="vid" playsinline muted></video><div class="guide"><i></i><i></i><i></i><i></i></div>
    <div class="tb"><button id="scTorch" hidden aria-label="Linterna">${I.torch}</button></div>
    <div class="msg" id="smsg">Iniciando cámara…</div></div>
  <p class="hint" style="text-align:center;margin-top:-6px">Coloca la hoja sobre la mesa, con buena luz, y que se vean los 4 cuadros negros.</p>
  <div class="grid2"><button class="btn" id="scPhoto">${I.cam} Tomar foto</button><button class="btn" id="scHand">${I.hand} Sin cámara</button></div>`;
}, b(){
  $('#scHelp').onclick = scanTips;
  $('#scPhoto').onclick = () => pickFile('image/*', scanPhoto, 'environment');
  $('#scHand').onclick = () => manualPick();
  startScanner();
}};
function scanTips(){ sheet(`<h3>Para escanear rápido</h3><div class="stack hint" style="font-size:15px;color:var(--ink)">
  <p>1. Pon la hoja sobre una superficie plana y oscura (mesa o pupitre).</p><p>2. Que se vean <b>los 4 cuadros negros</b> de las esquinas y el código QR.</p>
  <p>3. Mantén el celular quieto 1 segundo: suena un “bip” y aparece la revisión.</p><p>4. Revisa lo escrito (completar, respuestas, preguntas abiertas) con un toque y presiona <b>Guardar y seguir</b>.</p>
  <p>5. Si hay poca luz, usa la linterna. Si tu cámara no enfoca, usa <b>Tomar foto</b>.</p></div><button class="btn pri block" id="tOk">Entendido</button>`, s => $('#tOk', s).onclick = closeSheet); }
function scanMsg(t, ok){ const m = $('#smsg'); if(m){ m.textContent = t; m.classList.toggle('go', !!ok); } }
async function startScanner(){
  const v = $('#vid'); if(!v) return;
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){ scanMsg('Este navegador no permite usar la cámara. Usa “Tomar foto”.'); return; }
  try{
    SC.stream = await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}, width:{ideal:1920}, height:{ideal:1080}}, audio:false});
    if(route !== 'scan'){ stopScanner(); return; }
    v.srcObject = SC.stream; await v.play(); SC.track = SC.stream.getVideoTracks()[0];
    try{ const cap = SC.track.getCapabilities ? SC.track.getCapabilities() : {}; if(cap.torch){ const tb = $('#scTorch'); tb.hidden = false; tb.onclick = async () => { SC.torch = !SC.torch; try{ await SC.track.applyConstraints({advanced:[{torch:SC.torch}]}); tb.classList.toggle('on', SC.torch); }catch(e){} }; }
      if(cap.focusMode && cap.focusMode.includes('continuous')) SC.track.applyConstraints({advanced:[{focusMode:'continuous'}]}).catch(() => {}); }catch(e){}
    SC.prev = null; SC.paused = false; scanMsg('Apunta a la hoja de evaluación'); loopScan();
  }catch(e){ scanMsg(e.name === 'NotAllowedError' ? 'Permiso de cámara denegado. Actívalo en Chrome (candado junto a la dirección) o usa “Tomar foto”.' : 'No se pudo abrir la cámara. Usa “Tomar foto”.'); }
}
function stopScanner(){ clearTimeout(SC.timer); SC.timer = null; if(SC.stream){ SC.stream.getTracks().forEach(t => t.stop()); SC.stream = null; SC.track = null; } SC.torch = false; }
function loopScan(){ clearTimeout(SC.timer); SC.timer = setTimeout(tickScan, 120); }
function lookupLayout(info){
  const ev = evals.find(e => e.id === info.ev); if(!ev) return {error:'Esta hoja es de una evaluación que no está en este celular.'};
  const mode = info.num ? 'nombre' : 'copia';
  const L = (ev.lays || []).find(l => l.ver === info.ver && l.mode === mode) || (ev.lays || []).find(l => l.ver === info.ver);
  if(!L) return {error:'Esta hoja es de una versión anterior de la evaluación. Vuelve a imprimirla.'};
  return {layout:L.layout, ev};
}
const WHY = {qr:'Busca el código QR de la hoja…', marcas:'Acerca o aleja: deben verse los 4 cuadros negros', ajeno:'Ese código QR no es de CalificaQR'};
function tickScan(){
  const v = $('#vid'); if(!v || !SC.stream || route !== 'scan') return;
  if(SC.paused || !v.videoWidth){ loopScan(); return; }
  const can = SC.can || (SC.can = document.createElement('canvas'));
  can.width = v.videoWidth; can.height = v.videoHeight; can.getContext('2d', {willReadFrequently:true}).drawImage(v, 0, 0);
  let r; try{ r = OMR.analyze(can, lookupLayout); }catch(e){ console.error(e); r = {ok:false, why:'qr'}; }
  if(!r.ok){ scanMsg(r.why === 'eval' ? r.msg : WHY[r.why] || 'Buscando…'); SC.prev = null; loopScan(); return; }
  const sig = JSON.stringify([r.info, r.num, Object.entries(r.ans).map(([q, o]) => [q, Object.values(o).map(x => x.sel)])]);
  if(SC.prev !== sig){ SC.prev = sig; scanMsg('Leyendo… mantén quieto', true); loopScan(); return; }
  SC.prev = null; SC.paused = true; beep(true); handleScan(r, can);
}
async function scanPhoto(file){
  toast('Leyendo la foto…');
  const im = await loadImg(await readAsDataURL(file)); if(!im){ toast('No se pudo abrir la imagen'); return; }
  const m = 2400, s = Math.min(1, m / Math.max(im.width, im.height)), can = document.createElement('canvas');
  can.width = Math.round(im.width * s); can.height = Math.round(im.height * s); can.getContext('2d', {willReadFrequently:true}).drawImage(im, 0, 0, can.width, can.height);
  let r; try{ r = OMR.analyze(can, lookupLayout, {full:true}); }catch(e){ r = {ok:false, why:'qr'}; }
  if(!r.ok){ toast(r.why === 'eval' ? r.msg : r.why === 'marcas' ? 'No se ven los 4 cuadros negros. Toma la foto con toda la hoja.' : 'No se encontró el código QR en la foto.', 4000); return; }
  SC.paused = true; handleScan(r, can);
}
function handleScan(r, can){
  const ev = evals.find(e => e.id === r.info.ev), c = cursos.find(x => x.id === ev.cid);
  const L = lookupLayout(r.info).layout;
  if(!L.pages[r.info.pg] || !L.pages[r.info.pg].b.length){ toast(`La página ${r.info.pg + 1} no tiene círculos: no hace falta escanearla.`); setTimeout(() => { SC.paused = false; loopScan(); }, 1500); return; }
  const est = (c.est || []).find(s => s.n === r.num) || null;
  // vista previa con los círculos leídos
  const sc = Math.min(1, 900 / Math.max(can.width, can.height)), snap = document.createElement('canvas');
  snap.width = Math.round(can.width * sc); snap.height = Math.round(can.height * sc); const x = snap.getContext('2d'); x.drawImage(can, 0, 0, snap.width, snap.height);
  r.marks.forEach(m => { x.beginPath(); x.arc(m.c[0] * sc, m.c[1] * sc, m.r * sc * 1.25, 0, Math.PI * 2); x.lineWidth = Math.max(2, 3 * sc * 2); x.strokeStyle = m.dbl ? '#E08A00' : m.on ? '#16A34A' : 'rgba(30,120,255,.35)'; x.stroke(); });
  const prev = est && resp[ev.id] && resp[ev.id][est.id] ? JSON.parse(JSON.stringify(resp[ev.id][est.id].m)) : {};
  const m = Object.assign({}, prev);
  ev.qs.forEach(q => { const a = r.ans[q.id]; if(!a) return;
    if(q.tipo === 'sel') m[q.id] = a[0] ? a[0].sel : null;
    if(q.tipo === 'vf' || q.tipo === 'rel'){ const arr = Array.isArray(m[q.id]) ? m[q.id].slice() : emptyMark(q); Object.entries(a).forEach(([i, o]) => arr[+i] = o.sel); m[q.id] = arr; } });
  openReview(ev, est, {snap:snap.toDataURL('image/jpeg', .8), page:r.info.pg, low:r.lowConf, m, fromScan:true});
}
let audioCtx;
function beep(ok){ try{ audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); const o = audioCtx.createOscillator(), g = audioCtx.createGain(); o.frequency.value = ok ? 1046 : 220; g.gain.value = .12; o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime + .13); }catch(e){} try{ navigator.vibrate && navigator.vibrate(ok ? 70 : [60, 60, 60]); }catch(e){} }
function manualPick(){
  const c = curso(), list = evals.filter(e => e.cid === c.id && e.t === ui.trim);
  if(!list.length){ toast('No hay evaluaciones en este trimestre'); return; }
  sheet(`<h3>Calificar sin cámara</h3><p class="hint">Elige la evaluación y luego el estudiante.</p><div class="list">${list.slice().reverse().map(e => `<div class="item" data-me="${e.id}"><div class="nm"><b>${esc(e.titulo)}</b><small>${esc(areaName(e.a))} · ${fmtD(e.fecha)}</small></div>${I.right.replace('<svg', '<svg width="18" height="18"')}</div>`).join('')}</div>`, s => {
    $$('[data-me]', s).forEach(b => b.onclick = () => { closeSheet(); ui.ev = b.dataset.me; saveUI(); go('ev'); });
  });
}

/* ================= REVISIÓN Y CALIFICACIÓN ================= */
function openReview(ev, est, scan){
  stopKeys();
  const R = resp[ev.id] || {};
  let m = scan ? scan.m : (est && R[est.id] ? JSON.parse(JSON.stringify(R[est.id].m)) : {});
  ev.qs.forEach(q => { if(m[q.id] === undefined) m[q.id] = emptyMark(q); });
  const wrap = document.createElement('div'); wrap.className = 'rev'; wrap.id = 'rev'; document.body.appendChild(wrap);
  let zoom = false;
  const close = resume => { wrap.remove(); if(resume && route === 'scan'){ SC.paused = false; loopScan(); } else if(route !== 'scan') render(); };
  const draw = () => {
    const sc = evScore(ev, m), already = est && R[est.id];
    wrap.innerHTML = `<div class="wrap"><div class="head"><div class="nb num">${est ? est.n : '?'}</div><div style="flex:1;min-width:0" id="rvWho"><b>${est ? esc(est.nombre) : 'Elige al estudiante'}</b><small>${esc(ev.titulo)}${scan ? ` · página ${scan.page + 1}` : ''} · toca para cambiar</small></div><button class="iconbtn" id="rvX" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.5)" aria-label="Cerrar">${I.x}</button></div>
    <div class="body">
      ${scan && already ? `<div class="banner warn">Este estudiante ya estaba calificado (${evScore(ev, R[est.id].m).nota}). Se reemplazan solo las respuestas leídas por la cámara.</div>` : ''}
      ${scan && scan.low ? `<div class="banner warn">Hay ${scan.low} respuesta(s) dudosa(s). Revisa las marcadas en naranja.</div>` : ''}
      ${scan ? `<img class="snap ${zoom ? 'zoom' : ''}" id="rvSnap" src="${scan.snap}" alt="Hoja escaneada" style="${zoom ? '' : 'max-height:220px;object-fit:cover;object-position:top'}">` : ''}
      ${ev.qs.map((q, i) => revQ(q, i, m[q.id], sc.per[q.id])).join('')}
    </div>
    <div class="foot"><div class="in"><div class="tot"><b>${sc.nota}</b><span>Nota / ${dimMax(ev.d || 'saber')}</span></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:6px"><span class="hint" style="text-align:center">${fmtN(sc.tot)} de ${sc.max} puntos${sc.pend ? ` · <b style="color:var(--warn)">${sc.pend} sin revisar</b>` : ''}</span>
      <button class="btn pri block" id="rvSave">${I.check} ${route === 'scan' ? 'Guardar y seguir' : 'Guardar'}</button></div></div></div></div>`;
    $('#rvX', wrap).onclick = () => close(true);
    $('#rvWho', wrap).onclick = () => pickStudent(ev, s => { est = s; draw(); });
    if($('#rvSnap', wrap)) $('#rvSnap', wrap).onclick = () => { zoom = !zoom; draw(); };
    $$('[data-o]', wrap).forEach(b => b.onclick = () => { const [qid, i, o] = b.dataset.o.split('|'); const q = ev.qs.find(x => x.id === qid);
      if(q.tipo === 'sel'){ m[qid] = m[qid] === +o ? null : +o; } else { const a = m[qid].slice(); a[+i] = a[+i] === +o ? null : +o; m[qid] = a; } draw(); });
    $$('[data-y]', wrap).forEach(b => b.onclick = () => { const [qid, i, v] = b.dataset.y.split('|'); const a = m[qid].slice(); const val = v === '1'; a[+i] = a[+i] === val ? null : val; m[qid] = a; draw(); });
    $$('[data-all]', wrap).forEach(b => b.onclick = () => { const q = ev.qs.find(x => x.id === b.dataset.all);
      if(q.tipo === 'abi') m[q.id] = qMax(q); else if(q.tipo === 'prob') m[q.id] = q.crit.map(() => true); else m[q.id] = m[q.id].map(() => true); draw(); });
    $$('[data-none]', wrap).forEach(b => b.onclick = () => { const q = ev.qs.find(x => x.id === b.dataset.none);
      if(q.tipo === 'abi') m[q.id] = 0; else if(q.tipo === 'prob') m[q.id] = q.crit.map(() => false); else m[q.id] = m[q.id].map(() => false); draw(); });
    $$('[data-ab]', wrap).forEach(b => b.onclick = () => { const [qid, v] = b.dataset.ab.split('|'); m[qid] = +v; draw(); });
    $$('[data-cr]', wrap).forEach(b => b.onclick = () => { const [qid, i] = b.dataset.cr.split('|'); const a = m[qid].slice(); a[+i] = !a[+i]; m[qid] = a; draw(); });
    $('#rvSave', wrap).onclick = () => {
      if(!est){ pickStudent(ev, s => { est = s; draw(); }); return; }
      const doSave = () => { const r = saveResult(ev, est, m); toast(`${est.n}. ${titleCase(est.nombre).split(' ').slice(0, 3).join(' ')}: nota ${r.nota}`); close(true); };
      if(sc.pend){ confirmSheet('Faltan revisar respuestas', `Hay ${sc.pend} respuesta(s) escritas sin marcar. Se contarán como incorrectas. Puedes completarlas luego.`, 'Guardar así', doSave); } else doSave();
    };
  };
  draw();
}
function stopKeys(){ const r = $('#rev'); if(r) r.remove(); }
function pickStudent(ev, cb){
  const c = cursos.find(x => x.id === ev.cid), R = resp[ev.id] || {};
  sheet(`<h3>¿De quién es la hoja?</h3><div class="list">${(c.est || []).filter(s => !s.ret).sort((a, b) => a.n - b.n).map(s => `<div class="item" data-ps="${s.id}" style="min-height:50px"><div class="av num">${s.n}</div><div class="nm"><b>${esc(s.nombre)}</b></div>${R[s.id] ? '<span class="pill ok">Calificado</span>' : ''}</div>`).join('')}</div>`, s => {
    $$('[data-ps]', s).forEach(b => b.onclick = () => { closeSheet(); cb(c.est.find(x => x.id === b.dataset.ps)); });
  });
  const o = $('#ov'); if(o) o.style.zIndex = 70;
}
function revQ(q, i, v, s){
  const cls = s.pts >= s.max ? 'full' : s.pts <= 0 ? 'zero' : '';
  const head = `<div class="h"><div class="qn">${i + 1}</div><div class="t">${esc(q.txt)}</div><div class="pts ${cls}">${fmtN(s.pts)}/${s.max}</div></div>`;
  const L = HOJA.LET;
  const opts = (qid, idx, n, sel, key, labels) => `<div class="opts">${Array.from({length:n}, (_, o) => `<button class="o ${o === key ? 'key' : ''} ${sel === o ? 'on' : ''} ${sel === -2 ? 'dbl' : ''}" data-o="${qid}|${idx}|${o}">${labels[o]}</button>`).join('')}</div>`;
  const flag = sel => sel === -2 ? '<span class="flag">Marcó dos opciones</span>' : sel === null ? '<span class="flag" style="color:var(--muted)">En blanco</span>' : '';
  const yn = (qid, idx, val) => `<div class="yn"><button class="y ${val === true ? 'on' : ''}" data-y="${qid}|${idx}|1" aria-label="Correcta">${I.check}</button><button class="n ${val === false ? 'on' : ''}" data-y="${qid}|${idx}|0" aria-label="Incorrecta">${I.x}</button></div>`;
  const quick = `<div class="row" style="gap:6px"><button class="btn sm ghost" data-all="${q.id}">${I.check} Todo bien</button><button class="btn sm ghost" data-none="${q.id}">${I.x} Todo mal</button></div>`;
  let b = '';
  switch(q.tipo){
    case 'sel': b = `<div class="ri"><div class="tx">${flag(v)}<small>Correcta: ${L[q.ok].toUpperCase()}) ${esc(q.ops[q.ok])}</small></div>${opts(q.id, 0, q.ops.length, v, q.ok, q.ops.map((_, o) => L[o].toUpperCase()))}</div>`; break;
    case 'vf': b = q.items.map((it, k) => `<div class="ri"><div class="tx">${k + 1}. ${esc(it.t)} ${flag(v[k])}</div>${opts(q.id, k, 2, v[k], it.ok === 'F' ? 1 : 0, ['V', 'F'])}</div>`).join(''); break;
    case 'rel': { const ord = HOJA.relOrder(q); b = q.pares.map((p, k) => `<div class="ri"><div class="tx">${k + 1}. ${esc(p.i)} ${flag(v[k])}<small>${L[ord.indexOf(k)]}) ${esc(p.d)}</small></div>${opts(q.id, k, q.pares.length, v[k], ord.indexOf(k), q.pares.map((_, o) => L[o]))}</div>`).join(''); break; }
    case 'comp': b = (q.resp || []).map((r, k) => `<div class="ri"><div class="tx">Espacio ${k + 1}<small>Clave: <b>${esc(r)}</b></small></div>${yn(q.id, k, v[k])}</div>`).join('') + quick; break;
    case 'lista': b = `<span class="hint">Aceptadas: <b>${esc((q.resp || []).join(' · ') || '—')}</b></span>` + Array.from({length:+q.n}, (_, k) => `<div class="ri"><div class="tx">Casilla ${L[k]})</div>${yn(q.id, k, v[k])}</div>`).join('') + quick; break;
    case 'abi': b = `${q.resp ? `<span class="hint">Esperado: ${esc(q.resp)}</span>` : ''}<div class="opts">${Array.from({length:qMax(q) + 1}, (_, k) => `<button class="o ${v === k ? 'on key' : ''}" data-ab="${q.id}|${k}">${k}</button>`).join('')}</div>`; break;
    case 'prob': b = `${q.resp ? `<span class="hint">Respuesta: <b>${esc(q.resp)}</b></span>` : ''}` + q.crit.map((c, k) => `<div class="ri"><div class="tx">${esc(c.t)}<small>${fmtN(c.p)} pts</small></div><div class="yn"><button class="y ${v[k] ? 'on' : ''}" data-cr="${q.id}|${k}" aria-label="Logrado">${I.check}</button></div></div>`).join('') + quick; break;
  }
  return `<div class="rq">${head}${b}</div>`;
}

/* ================= PLANILLAS ================= */
VIEWS.pla = {v(){
  const c = curso(); if(!ui.area || !c.areas.includes(ui.area)) ui.area = c.areas[0];
  const a = ui.area, t = ui.trim; ensureCols(a, t);
  const est = students(), dim = ui.dim;
  const tabs = [...DIMS.map(d => [d.k, d.k === 'auto' ? 'Autoev.' : d.t]), ['res', 'Resumen']];
  let table = '';
  if(dim === 'res'){
    table = `<table class="pl"><thead><tr><th class="n">Estudiante</th>${DIMS.map(d => `<th>${d.k === 'auto' ? 'Auto' : d.t}<small style="display:block;color:var(--muted)">/${dimMax(d.k)}</small></th>`).join('')}<th>Total</th><th>Val.</th></tr></thead><tbody>
    ${est.map(s => { const r = trimRes(a, t, s.id); return `<tr class="${s.ret ? 'est-ret' : ''}"><td class="n">${s.n}. ${esc(s.nombre)}</td>${DIMS.map(d => `<td>${r[d.k] ?? ''}</td>`).join('')}<td class="tt">${r.total ?? ''}</td><td>${r.cual ? `<span class="cq ${r.cual.c}">${r.cual.c}</span>` : ''}</td></tr>`; }).join('')}</tbody></table>`;
  } else {
    const cs = colsOf(a, t, dim), mx = dimMax(dim);
    table = `<table class="pl"><thead><tr><th class="n">Estudiante</th>${cs.map(c2 => `<th class="c ${c2.ev ? 'ev' : ''}" data-col="${c2.id}">${esc(c2.tema || 'Sin tema')}<small>${c2.fecha ? fmtD(c2.fecha).slice(0, 5) : 'editar'}</small></th>`).join('')}${dim !== 'auto' ? '<th>Prom.</th>' : ''}</tr></thead><tbody>
    ${est.map((s, ri) => `<tr class="${s.ret ? 'est-ret' : ''}"><td class="n">${s.n}. ${esc(s.nombre)}</td>${cs.map((c2, ci) => `<td><input inputmode="decimal" data-cell="${c2.id}|${s.id}" data-r="${ri}" data-c="${ci}" value="${getN(c2.id, s.id) ?? ''}" aria-label="${esc(s.nombre)} ${esc(c2.tema)}"></td>`).join('')}${dim !== 'auto' ? `<td class="pr" data-pr="${s.id}">${dimAvg(a, t, dim, s.id) ?? ''}</td>` : ''}</tr>`).join('')}</tbody></table>`;
  }
  return `<div class="row between"><h2>Planillas</h2><div class="row" style="gap:6px"><button class="btn sm ghost" data-g="cen">Centralizador</button><button class="btn sm pri" id="plX">${I.xls} Excel</button></div></div>
  <div class="chips">${c.areas.map(k => `<button class="chip ${a === k ? 'on' : ''}" data-a="${k}">${esc(areaName(k))}</button>`).join('')}</div>
  <div class="seg" id="tSeg">${TRIM.map((x, i) => `<button class="${t === i + 1 ? 'on' : ''}" data-t="${i + 1}">${TRIMC[i]}</button>`).join('')}</div>
  <div class="seg" id="dSeg">${tabs.map(([k, l]) => `<button class="${dim === k ? 'on' : ''}" data-d="${k}">${l}</button>`).join('')}</div>
  ${dim !== 'res' ? `<div class="row between"><span class="hint">${esc(DIMS.find(d => d.k === dim).d)} · cada nota sobre <b>${dimMax(dim)}</b>${dim === 'saber' ? ' · las evaluaciones escaneadas llegan solas' : ''}</span>${dim !== 'auto' ? `<button class="btn sm" id="plAdd">${I.plus} Columna</button>` : ''}</div>` : `<span class="hint">Nota trimestral = Ser + Saber + Hacer + Autoevaluación (sobre 100).</span>`}
  ${est.length ? `<div class="tablewrap">${table}</div>` : '<div class="card soft empty"><b>Sin estudiantes</b>Agrega tu lista en Más → Estudiantes.</div>'}`;
}, b(){
  $$('[data-g]').forEach(b => b.onclick = () => go(b.dataset.g));
  $$('[data-a]').forEach(b => b.onclick = () => { ui.area = b.dataset.a; saveUI(); render(); });
  $$('#tSeg [data-t]').forEach(b => b.onclick = () => { ui.trim = +b.dataset.t; saveUI(); render(); });
  $$('#dSeg [data-d]').forEach(b => b.onclick = () => { ui.dim = b.dataset.d; saveUI(); render(); });
  $('#plX').onclick = () => withLib('XLSX', () => sheet(`<h3>Descargar Excel</h3>
    <button class="btn pri block" id="x1">${I.xls} ${esc(areaName(ui.area))} · ${TRIMC[ui.trim - 1]}</button>
    <button class="btn block" id="x2">${I.xls} Todas las áreas · ${TRIMC[ui.trim - 1]} + centralizador</button>
    <button class="btn block" id="x3">${I.xls} Toda la gestión (todas las áreas y trimestres)</button>`, s => {
      $('#x1', s).onclick = () => { closeSheet(); XL.exportArea(ui.area, ui.trim); };
      $('#x2', s).onclick = () => { closeSheet(); XL.exportAll(ui.trim); };
      $('#x3', s).onclick = () => { closeSheet(); XL.exportAll(null); }; }));
  if($('#plAdd')) $('#plAdd').onclick = () => editCol(null);
  $$('[data-col]').forEach(b => b.onclick = () => editCol(cols.find(c => c.id === b.dataset.col)));
  const mx = dimMax(ui.dim);
  $$('[data-cell]').forEach(inp => {
    inp.onchange = () => { const [cid, sid] = inp.dataset.cell.split('|'); const raw = inp.value.trim().replace(',', '.');
      if(raw === ''){ setN(cid, sid, null); inp.classList.remove('bad'); }
      else { const n = +raw; if(!isFinite(n) || n < 0 || n > mx){ inp.classList.add('bad'); toast(`La nota debe estar entre 0 y ${mx}`); return; } inp.classList.remove('bad'); setN(cid, sid, n); }
      saveNotas(); const pr = $(`[data-pr="${sid}"]`); if(pr) pr.textContent = dimAvg(ui.area, ui.trim, ui.dim, sid) ?? ''; };
    inp.onkeydown = e => { if(e.key === 'Enter'){ e.preventDefault(); const n = $(`[data-r="${+inp.dataset.r + 1}"][data-c="${inp.dataset.c}"]`); inp.dispatchEvent(new Event('change')); if(n){ n.focus(); n.select(); } else inp.blur(); } };
    inp.onfocus = () => inp.select();
  });
}};
function editCol(c){
  const isNew = !c; const a = ui.area, t = ui.trim, d = isNew ? ui.dim : c.d;
  sheet(`<h3>${isNew ? 'Nueva columna' : 'Columna'} · ${DIMS.find(x => x.k === d).t}</h3>
  ${c && c.ev ? '<div class="banner">Esta columna viene de una evaluación: sus notas se actualizan al escanear.</div>' : ''}
  <div class="field"><label for="cT">Tema o indicador</label><input id="cT" value="${esc(c ? c.tema : '')}" placeholder="${d === 'hacer' ? 'Ej.: Maqueta del ciclo del agua' : d === 'ser' ? 'Ej.: Puntualidad' : 'Ej.: Prueba escrita'}"></div>
  <div class="field"><label for="cF">Fecha</label><input id="cF" type="date" value="${esc(c ? c.fecha : today())}"></div>
  <div class="grid2">${!isNew ? `<button class="btn" id="cDel" style="color:var(--bad)">${I.trash} Eliminar</button>` : '<button class="btn" id="cNo">Cancelar</button>'}<button class="btn pri" id="cOk">Guardar</button></div>`, s => {
    if($('#cNo', s)) $('#cNo', s).onclick = closeSheet;
    $('#cOk', s).onclick = () => { const tema = $('#cT', s).value.trim(); if(!tema){ toast('Escribe el tema'); return; }
      if(isNew) cols.push({id:uid(8), cid:curId, a, t, d, tema, fecha:$('#cF', s).value}); else { c.tema = tema; c.fecha = $('#cF', s).value; const ev = c.ev && evals.find(e => e.id === c.ev); if(ev){ ev.titulo = tema; ev.fecha = c.fecha; saveEvals(); } }
      saveCols(); closeSheet(); render(); };
    if($('#cDel', s)) $('#cDel', s).onclick = () => { closeSheet(); confirmSheet('Eliminar columna', `Se borrarán las notas de “${esc(c.tema)}”.${c.ev ? ' La evaluación se conserva.' : ''}`, 'Eliminar', () => { cols = cols.filter(x => x.id !== c.id); delete notas[c.id]; const ev = c.ev && evals.find(e => e.id === c.ev); if(ev) ev.colId = null; saveCols(); saveNotas(); saveEvals(); render(); }, true); };
  });
}
VIEWS.cen = {v(){
  const c = curso(), est = students(); const mode = ui.cenT || 0;
  const val = (a, s) => mode ? trimRes(a, mode, s.id).total : annual(a, s.id);
  return `<div class="row" style="flex-wrap:nowrap">${back('pla')}<h2>Centralizador</h2></div>
  <div class="seg" id="cSeg">${['Anual', ...TRIMC].map((x, i) => `<button class="${mode === i ? 'on' : ''}" data-m="${i}">${x}</button>`).join('')}</div>
  <div class="tablewrap"><table class="pl"><thead><tr><th class="n">Estudiante</th>${c.areas.map(a => `<th title="${esc(areaName(a))}">${a}</th>`).join('')}<th>Prom.</th></tr></thead><tbody>
  ${est.map(s => { const v = c.areas.map(a => val(a, s)); const ok = v.filter(isNum); const p = ok.length ? r0(ok.reduce((x, y) => x + y, 0) / ok.length) : null; const cq = cualOf(p);
    return `<tr class="${s.ret ? 'est-ret' : ''}"><td class="n">${s.n}. ${esc(s.nombre)}</td>${v.map(x => `<td${isNum(x) && x <= 50 ? ' style="color:var(--bad);font-weight:700"' : ''}>${x ?? ''}</td>`).join('')}<td class="tt">${p ?? ''}${cq ? ` <span class="cq ${cq.c}">${cq.c}</span>` : ''}</td></tr>`; }).join('')}</tbody></table></div>
  <div class="hint">${c.areas.map(a => `<b>${a}</b> ${esc(areaName(a))}`).join(' · ')}</div>
  <button class="btn pri block" id="cenX">${I.xls} Descargar centralizador en Excel</button>`;
}, b(){
  $$('#cSeg [data-m]').forEach(b => b.onclick = () => { ui.cenT = +b.dataset.m; saveUI(); render(); });
  $('#cenX').onclick = () => withLib('XLSX', () => XL.exportCentral());
}};

/* ================= MÁS ================= */
VIEWS.mas = {v(){
  const it = (r, ic, t, s) => `<div class="item" data-g="${r}"><div class="av">${ic}</div><div class="nm"><b>${t}</b><small>${s}</small></div>${I.right.replace('<svg', '<svg width="18" height="18"')}</div>`;
  return `<h2>Más</h2><div class="list">
  ${it('est', I.users, 'Estudiantes', `${students().length} en ${esc(cursoCorto())} · importar lista`)}
  ${it('cfg', I.school, 'Unidad educativa y apariencia', 'Nombre, logo, color, maestro')}
  ${it('cur', I.layers, 'Cursos y áreas', 'Grado, paralelo, gestión, áreas')}
  ${it('esc', I.sliders, 'Puntajes y dimensiones', 'Escala por aciertos, Ser/Saber/Hacer, valoración')}
  ${it('bk', I.save, 'Respaldo', 'Guarda o recupera todos tus datos')}
  ${lic.role === 'owner' ? it('adm', I.lock, 'Administrador', 'Códigos de acceso para colegas') : ''}
  ${it('ayu', I.help, 'Ayuda', 'Cómo imprimir, escanear y calificar')}
  </div>
  <button class="btn block instbtn" id="inst" hidden>${I.install} Instalar la aplicación</button>
  <button class="btn ghost block" id="logout">${I.logout} Cerrar sesión</button>
  <div class="card soft"><span class="hint">Sesión: <b>${esc(lic.role === 'owner' ? 'Administrador' : lic.name)}</b>${lic.exp && lic.exp !== '0' ? ` · código válido hasta ${lic.exp.slice(6)}/${lic.exp.slice(4, 6)}/${lic.exp.slice(0, 4)}` : ''} · versión ${APP_VERSION}</span></div>`;
}, b(){
  $$('[data-g]').forEach(b => b.onclick = () => go(b.dataset.g));
  if(installEvt) $('#inst').hidden = false; $('#inst').onclick = () => { if(installEvt){ installEvt.prompt(); installEvt = null; $('#inst').hidden = true; } };
  $('#logout').onclick = () => confirmSheet('Cerrar sesión', 'Tus datos se quedan guardados en este celular. Para volver a entrar necesitarás tu código.', 'Cerrar sesión', () => { LS.del('cqr_lic'); lic = null; route = 'ini'; render(); });
}};
let installEvt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; const b = $('#inst'); if(b) b.hidden = false; });

/* ---------- Estudiantes ---------- */
VIEWS.est = {v(){
  const st = students();
  return `<div class="row" style="flex-wrap:nowrap">${back('mas')}<h2>Estudiantes · ${esc(cursoCorto())}</h2></div>
  <div class="grid2"><button class="btn pri" id="eImp">${I.users} Importar lista</button><button class="btn" id="eAdd">${I.plus} Agregar</button></div>
  ${st.length ? `<div class="list">${st.map(s => `<div class="item ${s.ret ? 'est-ret' : ''}" data-e="${s.id}"><div class="av num">${s.n}</div><div class="nm"><b>${esc(s.nombre)}</b><small>${[s.gen === 'F' ? 'Mujer' : s.gen === 'M' ? 'Varón' : '', s.rude ? 'RUDE ' + s.rude : '', s.ret ? 'Retirado(a)' : ''].filter(Boolean).join(' · ') || '&nbsp;'}</small></div>${I.edit.replace('<svg', '<svg width="18" height="18"')}</div>`).join('')}</div>
  <div class="grid2"><button class="btn ghost" id="eSort">Ordenar A–Z y numerar</button><button class="btn ghost" id="ePaste">Pegar lista</button></div>`
  : `<div class="card soft empty"><b>Lista vacía</b>Importa desde Excel, Word o una foto, o pégala como texto.</div><button class="btn block" id="ePaste">Pegar lista</button>`}
  <p class="hint">El número de lista es el que sale en las hojas impresas. Si agregas un estudiante, recibe el siguiente número para no cambiar los demás.</p>`;
}, b(){
  $('#eImp').onclick = () => importStudents(() => render());
  $('#ePaste').onclick = () => pasteStudents(() => render());
  $('#eAdd').onclick = () => editStudent(null);
  $$('[data-e]').forEach(b => b.onclick = () => editStudent(curso().est.find(s => s.id === b.dataset.e)));
  if($('#eSort')) $('#eSort').onclick = () => confirmSheet('Ordenar y numerar', 'Se ordenará alfabéticamente y se renumerará la lista. <b>Las hojas ya impresas con nombre dejarán de coincidir</b>; vuelve a imprimirlas.', 'Ordenar', () => {
    const c = curso(); c.est.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')); c.est.forEach((s, i) => s.n = i + 1); saveCursos(); render(); });
}};
function editStudent(s){
  const isNew = !s;
  sheet(`<h3>${isNew ? 'Nuevo estudiante' : 'Editar estudiante'}</h3>
  <div class="field"><label for="sN">Apellidos y nombres</label><input id="sN" value="${esc(s ? s.nombre : '')}" autocapitalize="characters"></div>
  <div class="grid3"><div class="field"><label for="sNum">Nº lista</label><input id="sNum" inputmode="numeric" value="${s ? s.n : nextN()}"></div>
  <div class="field"><label for="sG">Género</label><select id="sG"><option value="">–</option><option value="F" ${s && s.gen === 'F' ? 'selected' : ''}>Mujer</option><option value="M" ${s && s.gen === 'M' ? 'selected' : ''}>Varón</option></select></div>
  <div class="field"><label for="sR">RUDE</label><input id="sR" inputmode="numeric" value="${esc(s ? s.rude || '' : '')}"></div></div>
  ${!isNew ? `<label class="row" style="gap:8px;font-weight:600"><input type="checkbox" id="sRet" ${s.ret ? 'checked' : ''} style="width:20px;height:20px;accent-color:var(--pri)"> Retirado(a)</label>` : ''}
  <div class="grid2">${!isNew ? `<button class="btn" id="sDel" style="color:var(--bad)">${I.trash} Eliminar</button>` : '<button class="btn" id="sNo">Cancelar</button>'}<button class="btn pri" id="sOk">Guardar</button></div>`, sh => {
    if($('#sNo', sh)) $('#sNo', sh).onclick = closeSheet;
    $('#sOk', sh).onclick = () => { const nm = $('#sN', sh).value.trim().toUpperCase().replace(/\s+/g, ' '); const n = parseInt($('#sNum', sh).value, 10);
      if(!nm){ toast('Escribe el nombre'); return; } if(!(n > 0)){ toast('Número de lista no válido'); return; }
      const c = curso(); if(c.est.some(x => x.n === n && x !== s)){ toast(`El número ${n} ya lo tiene otro estudiante`); return; }
      if(isNew) c.est.push({id:uid(6), n, nombre:nm, gen:$('#sG', sh).value, rude:$('#sR', sh).value.trim()});
      else Object.assign(s, {n, nombre:nm, gen:$('#sG', sh).value, rude:$('#sR', sh).value.trim(), ret:$('#sRet', sh).checked});
      saveCursos(); closeSheet(); render(); };
    if($('#sDel', sh)) $('#sDel', sh).onclick = () => { closeSheet(); confirmSheet('Eliminar estudiante', `Se quitará a ${esc(s.nombre)} y sus notas de este curso. Si se retiró, mejor márcalo como “Retirado(a)”.`, 'Eliminar', () => { const c = curso(); c.est = c.est.filter(x => x !== s); saveCursos(); render(); }, true); };
  });
}
function importStudents(done){
  sheet(`<h3>Importar lista</h3><p class="hint">Elige un archivo <b>Excel</b> (.xlsx, .xlsm, .xls), <b>Word</b> (.docx), o una <b>foto</b> de la lista impresa.</p>
  <div class="drop" id="iDrop">${I.users}<br><b>Elegir archivo</b></div><p class="hint">Las fotos se leen con un lector de texto que necesita internet la primera vez.</p><div id="iOut"></div>`, s => {
    $('#iDrop', s).onclick = () => pickFile('.xlsx,.xlsm,.xls,.ods,.csv,.docx,.txt,image/*', async f => {
      $('#iOut', s).innerHTML = '<p class="hint">Leyendo archivo…</p>';
      try{ await new Promise(ok => withLib('XLSX', ok)); const r = await XL.parseFile(f, p => { const o = $('#iOut', s); if(o) o.innerHTML = `<p class="hint">Leyendo la foto… ${p}%</p>`; });
        if(r.kind === 'excel'){ if(!r.cands.length) throw new Error('No se encontraron nombres en el archivo.'); closeSheet(); reviewImport(r.cands[0].list, done, r.cands); }
        else { if(!r.list.length) throw new Error('No se encontraron nombres. Prueba pegando la lista como texto.'); closeSheet(); reviewImport(r.list, done); }
      }catch(e){ const o = $('#iOut', s); if(o) o.innerHTML = `<p class="err">${esc(e.message)}</p>`; }
    });
  });
}
function pasteStudents(done){
  sheet(`<h3>Pegar lista</h3><div class="field"><label for="pT">Un estudiante por línea</label><textarea id="pT" style="min-height:200px" placeholder="1. ANGUELA QUISPE ABIGAIL&#10;2. BALTAZAR FERNANDEZ ISAMAR NICOL"></textarea></div><button class="btn pri block" id="pGo">Continuar</button>`, s => {
    $('#pGo', s).onclick = () => { const l = XL.fromLines($('#pT', s).value.split('\n')); if(!l.length){ toast('No se encontraron nombres'); return; } closeSheet(); reviewImport(l, done); };
  });
}
function reviewImport(list, done, cands){
  let L = list.map(x => Object.assign({ok:true}, x)); const c = curso();
  const draw = () => `<h3>Revisa la lista (${L.filter(x => x.ok).length})</h3>
  ${cands && cands.length > 1 ? `<div class="field"><label for="rvS">Hoja del archivo</label><select id="rvS">${cands.map((k, i) => `<option value="${i}">${esc(k.sheet)} · columna ${k.col} (${k.list.length} nombres)</option>`).join('')}</select></div>` : ''}
  <div style="max-height:46vh;overflow:auto">${L.map((x, i) => `<div class="improw"><input type="checkbox" data-k="${i}" ${x.ok ? 'checked' : ''} style="width:20px;height:20px;accent-color:var(--pri)"><span class="num" style="width:22px;color:var(--muted)">${i + 1}</span><input type="text" data-nm="${i}" value="${esc(x.nombre)}"><select data-g="${i}"><option value="">–</option><option ${x.gen === 'F' ? 'selected' : ''}>F</option><option ${x.gen === 'M' ? 'selected' : ''}>M</option></select></div>`).join('')}</div>
  ${c.est.length ? `<div class="grid2"><button class="btn" id="rvAdd">Agregar al final</button><button class="btn pri" id="rvRep">Reemplazar lista</button></div>` : `<button class="btn pri big block" id="rvRep">${I.check} Guardar lista</button>`}`;
  const mount = s => {
    $$('[data-k]', s).forEach(b => b.onchange = () => { L[+b.dataset.k].ok = b.checked; $('h3', s).textContent = `Revisa la lista (${L.filter(x => x.ok).length})`; });
    $$('[data-nm]', s).forEach(b => b.onchange = () => L[+b.dataset.nm].nombre = b.value.trim().toUpperCase());
    $$('[data-g]', s).forEach(b => b.onchange = () => L[+b.dataset.g].gen = b.value);
    if($('#rvS', s)){ $('#rvS', s).onchange = e => { L = cands[+e.target.value].list.map(x => Object.assign({ok:true}, x)); s.innerHTML = '<div class="grab"></div>' + draw(); mount(s); $('#rvS', s).value = e.target.value; }; }
    const fin = rep => { const sel = L.filter(x => x.ok && x.nombre);
      if(rep){ const had = c.est.length; const old = c.est; c.est = sel.map((x, i) => { const prev = old.find(o => norm(o.nombre) === norm(x.nombre)); return {id:prev ? prev.id : uid(6), n:i + 1, nombre:x.nombre, gen:x.gen || '', rude:x.rude || ''}; }); if(had) toast('Lista reemplazada. Vuelve a imprimir las hojas con nombre.'); }
      else { let n = nextN(); sel.forEach(x => c.est.push({id:uid(6), n:n++, nombre:x.nombre, gen:x.gen || '', rude:x.rude || ''})); }
      saveCursos(); closeSheet(); toast(`${sel.length} estudiantes guardados`); done && done(); };
    if($('#rvAdd', s)) $('#rvAdd', s).onclick = () => fin(false);
    $('#rvRep', s).onclick = () => { if(c.est.length) confirmSheet('Reemplazar lista', 'Se reemplazará la lista actual. Las notas de quienes tengan el mismo nombre se conservan.', 'Reemplazar', () => fin(true)); else fin(true); };
  };
  sheet(draw(), mount);
}

/* ---------- Unidad educativa ---------- */
VIEWS.cfg = {v(){
  return `<div class="row" style="flex-wrap:nowrap">${back('mas')}<h2>Unidad educativa</h2></div>
  <div class="field"><label for="fUE">Nombre de la unidad educativa</label><input id="fUE" value="${esc(cfg.ue)}"></div>
  <div class="grid2"><div class="field"><label for="fSIE">Código SIE</label><input id="fSIE" inputmode="numeric" value="${esc(cfg.sie)}"></div><div class="field"><label for="fDis">Distrito educativo</label><input id="fDis" value="${esc(cfg.distrito)}"></div></div>
  <div class="field"><label for="fMa">Maestra(o)</label><input id="fMa" value="${esc(cfg.maestro)}"></div>
  <div class="grid2"><div class="field"><label for="fDir">Director(a)</label><input id="fDir" value="${esc(cfg.director)}"></div><div class="field"><label for="fTur">Turno</label><select id="fTur">${['', 'MAÑANA', 'TARDE', 'NOCHE'].map(t => `<option ${cfg.turno === t ? 'selected' : ''}>${t}</option>`).join('')}</select></div></div>
  <div class="row"><div class="logoprev">${cfg.logoUE ? `<img src="${cfg.logoUE}" alt="">` : I.img}</div><div class="stack" style="flex:1;gap:6px"><b>Logo de la U.E.</b><div class="row"><button class="btn sm" id="fLogo">Elegir imagen</button>${cfg.logoUE ? '<button class="btn sm ghost" id="fLogoX">Quitar</button>' : ''}</div></div></div>
  <div class="field"><label>Color institucional</label>${swatches(cfg.color, 'fCol')}</div>
  <p class="hint">El logo del curso se cambia en Más → Cursos y áreas.</p>`;
}, b(){
  const keep = () => { cfg.ue = $('#fUE').value.trim(); cfg.sie = $('#fSIE').value.trim(); cfg.distrito = $('#fDis').value.trim(); cfg.maestro = $('#fMa').value.trim(); cfg.director = $('#fDir').value.trim(); cfg.turno = $('#fTur').value; saveCfg(); };
  ['#fUE', '#fSIE', '#fDis', '#fMa', '#fDir', '#fTur'].forEach(s => $(s).onchange = () => { keep(); if(s === '#fUE'){ const t = $('.top .t1'); if(t) t.textContent = cfg.ue || 'CalificaQR'; } });
  bindSwatches('fCol', c => { cfg.color = c; saveCfg(); applyTheme(); });
  $('#fLogo').onclick = () => pickFile('image/*', async f => { try{ keep(); cfg.logoUE = await shrinkLogo(f); saveCfg(); render(); toast('Logo actualizado'); }catch(e){ toast(e.message); } });
  if($('#fLogoX')) $('#fLogoX').onclick = () => { keep(); cfg.logoUE = ''; saveCfg(); render(); };
}};

/* ---------- Cursos ---------- */
VIEWS.cur = {v(){
  return `<div class="row" style="flex-wrap:nowrap">${back('mas')}<h2>Cursos y áreas</h2></div>
  <div class="list">${cursos.map(x => `<div class="item" data-cc="${x.id}"><div class="av">${esc(x.gradoN)}°</div><div class="nm"><b>${esc(cursoCorto(x))} · Gestión ${esc(x.gestion)}</b><small>${esc(NIVELES[x.nivel] || '')} · ${x.areas.length} áreas · ${(x.est || []).length} estudiantes</small></div>${x.id === curId ? '<span class="pill ok">Activo</span>' : ''}</div>`).join('')}</div>
  <button class="btn pri block" id="ccAdd">${I.plus} Agregar curso</button>
  <div class="card soft stack"><b>¿Nueva gestión?</b><span class="hint">Crea el curso de la nueva gestión copiando las áreas (y si quieres, la lista). Las notas del año anterior quedan guardadas aparte.</span><button class="btn" id="ccYear">Iniciar nueva gestión</button></div>`;
}, b(){
  $$('[data-cc]').forEach(b => b.onclick = () => editCurso(cursos.find(c => c.id === b.dataset.cc)));
  $('#ccAdd').onclick = () => editCurso(null);
  $('#ccYear').onclick = () => { const c = curso(); sheet(`<h3>Nueva gestión</h3><div class="field"><label for="ny">Gestión</label><input id="ny" inputmode="numeric" value="${+c.gestion + 1}"></div>
    <label class="row" style="gap:8px;font-weight:600"><input type="checkbox" id="nyL" style="width:20px;height:20px;accent-color:var(--pri)"> Copiar la lista de estudiantes</label><button class="btn pri block" id="nyGo">Crear</button>`, s => {
      $('#nyGo', s).onclick = () => { const n = newCurso({gestion:$('#ny', s).value.trim(), nivel:c.nivel, gradoN:c.gradoN, paralelo:c.paralelo, logoGrado:c.logoGrado, areas:c.areas.slice(), est:$('#nyL', s).checked ? c.est.filter(x => !x.ret).map(x => ({...x, id:uid(6)})) : []});
        cursos.push(n); curId = n.id; LS.set('cqr_cur', curId); saveCursos(); ui.trim = 1; saveUI(); closeSheet(); go('ini'); toast('Gestión ' + n.gestion + ' creada'); }; }); };
}};
function editCurso(c){
  const isNew = !c; const w = isNew ? newCurso(curso() ? {nivel:curso().nivel, gestion:curso().gestion, areas:curso().areas.slice()} : {}) : JSON.parse(JSON.stringify(c));
  const draw = () => `<h3>${isNew ? 'Nuevo curso' : 'Editar curso'}</h3>${cursoForm(w)}
    <div class="grid2">${!isNew && cursos.length > 1 ? `<button class="btn" id="ccDel" style="color:var(--bad)">${I.trash} Eliminar</button>` : '<button class="btn" id="ccNo">Cancelar</button>'}<button class="btn pri" id="ccOk">Guardar</button></div>`;
  const redraw = () => { const o = $('#ov .sheet'), sc = o ? o.scrollTop : 0; const s2 = sheet(draw(), mount); s2.scrollTop = sc; };
  const mount = s => {
    bindCursoForm(w, redraw);
    if($('#ccNo', s)) $('#ccNo', s).onclick = closeSheet;
    $('#ccOk', s).onclick = () => { readCursoForm(w); if(!w.areas.length){ toast('Elige al menos un área'); return; }
      if(isNew){ cursos.push(w); curId = w.id; LS.set('cqr_cur', curId); } else Object.assign(c, w);
      saveCursos(); closeSheet(); render(); toast('Curso guardado'); };
    if($('#ccDel', s)) $('#ccDel', s).onclick = () => { closeSheet(); confirmSheet('Eliminar curso', `Se borrará ${esc(cursoCorto(c))} (gestión ${esc(c.gestion)}) con su lista, evaluaciones y notas.`, 'Eliminar', () => {
      cursos = cursos.filter(x => x.id !== c.id); const evIds = evals.filter(e => e.cid === c.id).map(e => e.id); evals = evals.filter(e => e.cid !== c.id); evIds.forEach(id => delete resp[id]);
      cols.filter(x => x.cid === c.id).forEach(x => delete notas[x.id]); cols = cols.filter(x => x.cid !== c.id); if(curId === c.id) curId = cursos[0].id;
      saveCursos(); saveEvals(); saveResp(); saveCols(); saveNotas(); LS.set('cqr_cur', curId); render(); }, true); };
  };
  sheet(draw(), mount);
}

/* ---------- Puntajes ---------- */
VIEWS.esc = {v(){
  const e = cfg.escala;
  return `<div class="row" style="flex-wrap:nowrap">${back('mas')}<h2>Puntajes</h2></div>
  <div class="card soft"><span class="hint">Cuántos puntos vale una pregunta (de 5 puntos) según cuántas partes respondió bien. Si una pregunta vale otro puntaje, se ajusta en proporción.</span></div>
  <div class="tablewrap" style="max-height:none"><table class="pl"><thead><tr><th class="n">Partes</th>${[1, 2, 3, 4, 5].map(k => `<th>${k} bien</th>`).join('')}</tr></thead><tbody>
  ${[1, 2, 3, 4, 5].map(n => `<tr><td class="n">${n} parte${n > 1 ? 's' : ''}</td>${[1, 2, 3, 4, 5].map(k => `<td>${k <= n ? `<input data-es="${n}|${k}" inputmode="decimal" value="${e[n] && e[n][k - 1] !== undefined ? e[n][k - 1] : ''}">` : ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
  <h3>Dimensiones</h3>
  <div class="grid2">${DIMS.map(d => `<div class="field"><label for="dm${d.k}">${d.t}</label><input id="dm${d.k}" data-dm="${d.k}" inputmode="numeric" value="${cfg.dims[d.k]}"></div>`).join('')}</div>
  <p class="hint">Total actual: <b>${DIMS.reduce((s, d) => s + (+cfg.dims[d.k] || 0), 0)}</b> puntos (debe sumar 100).</p>
  <h3>Valoración cualitativa</h3>
  <div class="stack">${cfg.cual.map((q, i) => `<div class="optrow"><span class="cq ${q.c}" style="width:44px;text-align:center">${q.c}</span><input type="text" data-cqt="${i}" value="${esc(q.t)}"><span class="hint">hasta</span><input type="text" data-cqm="${i}" inputmode="numeric" value="${q.max}" style="width:64px;flex:none"></div>`).join('')}</div>
  <h3>Columnas de Ser al iniciar un trimestre</h3>
  <div class="field"><input id="serD" value="${esc((cfg.serDef || []).join(', '))}" placeholder="Respeto, Responsabilidad"></div>
  <button class="btn ghost" id="escRes">Restablecer valores del reglamento</button>`;
}, b(){
  $$('[data-es]').forEach(i => i.onchange = () => { const [n, k] = i.dataset.es.split('|').map(Number); const v = +i.value.replace(',', '.'); if(!isFinite(v) || v < 0 || v > 5){ toast('Usa un valor de 0 a 5'); return; } cfg.escala[n] = cfg.escala[n] || []; cfg.escala[n][k - 1] = v; saveCfg(); evals.forEach(recalcEval); });
  $$('[data-dm]').forEach(i => i.onchange = () => { const v = parseInt(i.value, 10); if(!(v > 0)) return toast('Valor no válido'); cfg.dims[i.dataset.dm] = v; saveCfg(); evals.forEach(recalcEval); render(); });
  $$('[data-cqt]').forEach(i => i.onchange = () => { cfg.cual[+i.dataset.cqt].t = i.value.trim(); saveCfg(); });
  $$('[data-cqm]').forEach(i => i.onchange = () => { cfg.cual[+i.dataset.cqm].max = parseInt(i.value, 10) || cfg.cual[+i.dataset.cqm].max; saveCfg(); });
  $('#serD').onchange = e => { cfg.serDef = e.target.value.split(',').map(x => x.trim()).filter(Boolean); saveCfg(); };
  $('#escRes').onclick = () => confirmSheet('Restablecer', 'Se volverá a la escala 1→5 / 3,5 / 2,4,5 / 2,3,4,5 / 1 a 5, dimensiones 10-45-40-5 y valoración ED-DA-DO-DP.', 'Restablecer', () => { const d = defaultCfg(); cfg.escala = d.escala; cfg.dims = d.dims; cfg.cual = d.cual; saveCfg(); evals.forEach(recalcEval); render(); });
}};

/* ---------- Respaldo ---------- */
VIEWS.bk = {v(){
  return `<div class="row" style="flex-wrap:nowrap">${back('mas')}<h2>Respaldo</h2></div>
  <div class="card soft"><span class="hint">Tus datos viven solo en este celular. Guarda una copia cada semana en tu Drive o envíatela por WhatsApp. Si cambias de celular, restaura la copia allí.</span></div>
  <button class="btn pri big block" id="bkOut">${I.save} Crear respaldo</button>
  <button class="btn block" id="bkIn">Restaurar respaldo</button>`;
}, b(){
  $('#bkOut').onclick = () => shareOrDownload(new Blob([JSON.stringify(backupData())], {type:'application/json'}), `CalificaQR_respaldo_${fileName(cursoCorto())}_${today()}.json`);
  $('#bkIn').onclick = () => pickFile('', restoreFile);
}};
/* Restaurar desde un enlace privado (datos cifrados; la llave va solo en el enlace) */
async function pendingRestore(){
  const pr = LS.get('cqr_pendr', null); if(!pr || !lic) return;
  confirmSheet('Cargar tus datos', 'Este enlace trae tu unidad educativa, tu curso, la lista de estudiantes y tus evaluaciones. ' + (cfg.setup && cursos.length ? '<b>Se reemplazarán los datos de este celular.</b>' : ''), 'Cargar datos', async () => {
    try{ toast('Descargando tus datos…');
      const r = await fetch('r/' + pr.id + '.bin', {cache:'no-store'}); if(!r.ok) throw new Error('No se encontró el archivo de datos.');
      const buf = new Uint8Array(await r.arrayBuffer());
      const key = await crypto.subtle.importKey('raw', ub64u(pr.k), 'AES-GCM', false, ['decrypt']);
      const plain = await crypto.subtle.decrypt({name:'AES-GCM', iv:buf.slice(0, 12)}, key, buf.slice(12));
      restoreData(JSON.parse(dec.decode(plain))); LS.del('cqr_pendr'); route = 'ini'; render(); toast('¡Datos cargados!');
    }catch(e){ toast(e.message && !/operation/i.test(e.message) ? e.message : 'No se pudieron cargar los datos. Revisa tu internet.', 4000); }
  });
}
async function restoreFile(f){
  try{ const d = JSON.parse(await f.text()); const go2 = () => { restoreData(d); route = 'ini'; render(); toast('Respaldo restaurado'); };
    if(cfg.setup && cursos.length) confirmSheet('Restaurar respaldo', 'Se reemplazarán todos los datos de este celular por los del archivo.', 'Restaurar', go2); else go2(); }
  catch(e){ toast(e.message || 'Archivo no válido'); }
}

/* ---------- Ayuda ---------- */
VIEWS.ayu = {v(){
  const s = (t, b) => `<details class="card"><summary style="cursor:pointer;font-weight:700">${t}</summary><div class="stack hint" style="margin-top:8px;font-size:15px;color:var(--ink)">${b}</div></details>`;
  return `<div class="row" style="flex-wrap:nowrap">${back('mas')}<h2>Ayuda</h2></div>
  ${s('1. Crear una evaluación', '<p>Evaluaciones → Nueva. Escribe el título, elige el área y agrega las preguntas con su respuesta correcta (la clave).</p><p>Las preguntas de <b>Selección</b>, <b>V/F</b> y <b>Relacionar</b> se califican solas con la cámara. Las de completar, escribir, abiertas y problemas las revisas tú con un toque.</p>')}
  ${s('2. Imprimir las hojas', '<p>En la evaluación toca <b>Imprimir hojas</b>. “Una por estudiante” trae el nombre y número de lista impresos. “Para fotocopiar” es una sola hoja: el estudiante rellena su número de lista.</p><p>No recortes las 4 marcas negras ni el código QR.</p>')}
  ${s('3. Escanear', '<p>Toca el botón central <b>Escanear</b> y apunta a la hoja. Cuando se ven los 4 cuadros negros, suena un bip y aparece la revisión. Revisa lo escrito y toca <b>Guardar y seguir</b>.</p><p>La nota se pasa sola a la planilla (Saber).</p>')}
  ${s('4. Puntaje por partes', '<p>Cada pregunta vale 5 puntos. Si tiene varias partes: 2 partes → 3 y 5; 3 partes → 2, 4 y 5; 4 partes → 2, 3, 4 y 5; 5 partes → 1 punto cada una. Puedes cambiarlo en Más → Puntajes.</p>')}
  ${s('5. Matemática: valorar el procedimiento', '<p>Usa el tipo <b>Problema con procedimiento</b>. Defines los pasos (planteamiento, operaciones, respuesta) con sus puntos y al revisar marcas los que logró, aunque el resultado final esté mal.</p>')}
  ${s('6. Planillas y Excel', '<p>Planillas → elige área y trimestre. Ser (sobre 10), Saber (45), Hacer (40) y Autoevaluación (5) se promedian y suman solos. Agrega columnas para trabajos o actitudes. Descarga todo en Excel, por área o con el centralizador.</p>')}
  ${s('7. Instalar en el celular', '<p>En Chrome: menú ⋮ → <b>Instalar aplicación</b> o <b>Agregar a la pantalla principal</b>.</p>')}`;
}};

/* ---------- Administrador ---------- */
let admList = null, admErr = '';
VIEWS.adm = {v(){
  return `<div class="row" style="flex-wrap:nowrap">${back('mas')}<h2>Administrador</h2></div>
  <div class="card soft"><span class="hint">Crea un código corto para cada colega (ej.: <b>CQR-7K2M-QX9P</b>). Cada colega empieza con la app en blanco y pone su propia U.E., logo y colores.</span></div>
  <div class="field"><label for="aName">Nombre del colega</label><input id="aName" placeholder="Ej.: Prof. María Quispe"></div>
  <div class="field"><label for="aExp">Válido hasta</label><input id="aExp" type="date" value="${new Date().getFullYear()}-12-31"></div>
  <button class="btn pri big block" id="aGen">${I.plus} Crear código</button><div id="aOut"></div>
  <h3>Códigos entregados</h3><div id="aList"><p class="hint">Cargando…</p></div>`;
}, b(){
  loadAdmList();
  $('#aGen').onclick = async () => {
    const name = $('#aName').value.trim(); if(!name){ toast('Escribe el nombre del colega'); return; }
    const exp = $('#aExp').value; const btn = $('#aGen'); btn.disabled = true;
    try{ let code, done = false;
      for(const app of LIC_APPS){ for(let i = 0; i < 3 && !done; i++){ code = newShortCode();
        try{ await licRPC('licencia_crear', {p_app:app, p_maestra:masterStr(), p_codigo:code, p_nombre:name, p_plan:LIC_PLAN, p_vence:exp || null}); done = true; }
        catch(e){ if(e.offline) throw e; if(!/duplicate|unique/i.test(e.message)) break; } } if(done) break; }
      if(!done) throw new Error('El servidor no aceptó el código');
      $('#aName').value = ''; showCode({name, code, exp}); loadAdmList(); }
    catch(e){
      try{ const {code} = await makeLongCode(name, exp); showCode({name, code, exp}); toast(e.offline ? 'Sin internet: se creó un código largo que funciona igual' : 'Se creó un código largo que funciona igual'); }catch(_){ toast('No se pudo crear el código'); }
    }
    btn.disabled = false;
  };
}};
async function loadAdmList(){
  const all = []; admErr = '';
  for(const app of LIC_APPS){ try{ const l = await licRPC('licencia_listar', {p_app:app, p_maestra:masterStr()}); (l || []).forEach(c => { if(app === 'califica' || String(c.plan || '').includes(LIC_PLAN)) all.push(Object.assign({app}, c)); }); }catch(e){ if(e.offline){ admErr = 'Sin conexión: no se puede mostrar la lista ahora.'; break; } } }
  admList = all; drawAdmList();
}
function drawAdmList(){
  const box = $('#aList'); if(!box) return; const t = today();
  if(admErr){ box.innerHTML = `<p class="err">${esc(admErr)}</p>`; return; }
  if(!admList || !admList.length){ box.innerHTML = '<p class="hint">Aún no creaste códigos.</p>'; return; }
  box.innerHTML = `<div class="list">${admList.map(c => { const venc = c.vence && c.vence < t; const st = !c.activo ? '<b style="color:var(--bad)">desactivado</b>' : venc ? '<b style="color:var(--bad)">vencido</b>' : c.usado ? '<b style="color:var(--ok)">en uso</b>' : 'sin usar';
    return `<div class="item" style="cursor:default;flex-wrap:wrap"><div class="nm" style="min-width:160px"><b>${esc(c.nombre || '')}</b><small><span style="font-family:ui-monospace,monospace;font-weight:700">${esc(c.codigo)}</span> · hasta ${esc(c.vence ? fmtD(c.vence) : 'sin límite')} · ${st}</small></div>
    <div class="row" style="gap:6px"><button class="btn sm" data-sc="${esc(c.codigo)}">Enviar</button><button class="btn sm ghost" data-tg="${esc(c.codigo)}">${c.activo ? 'Desactivar' : 'Activar'}</button></div></div>`; }).join('')}</div>`;
  $$('[data-sc]', box).forEach(b => b.onclick = () => { const c = admList.find(x => x.codigo === b.dataset.sc); showCode({name:c.nombre, code:c.codigo, exp:c.vence}); });
  $$('[data-tg]', box).forEach(b => b.onclick = async () => { const c = admList.find(x => x.codigo === b.dataset.tg);
    try{ await licRPC('licencia_cambiar', {p_app:c.app, p_maestra:masterStr(), p_codigo:c.codigo, p_activo:!c.activo, p_vence:null, p_plan:null}); toast(c.activo ? 'Código desactivado' : 'Código activado'); loadAdmList(); }catch(e){ toast('No se pudo cambiar: ' + e.message); } });
}
function showCode(c){
  const link = baseURL() + '#c=' + c.code; const short = SHORT_RE.test(c.code);
  const msg = `Hola ${c.name}, te comparto *CalificaQR*, la app para calificar evaluaciones con la cámara y llevar las planillas.\n\n1) Abre este enlace en tu celular con Chrome (se activa solo):\n${link}\n${short ? `\nO entra a ${baseURL()} y escribe tu código: *${c.code}*\n` : ''}\n2) Instálala: menú ⋮ → “Instalar aplicación”.\n3) Pon tu unidad educativa, logo, curso y lista.\n\nEste código es personal; por favor no lo compartas.`;
  const out = $('#aOut'); if(!out) return;
  out.innerHTML = `<div class="card stack"><b>Código de ${esc(c.name)}</b><div class="code" style="${short ? 'font-size:24px;text-align:center;letter-spacing:2px;font-weight:800' : ''}">${esc(c.code)}</div><div class="grid2"><button class="btn wa" id="cWA">Enviar por WhatsApp</button><button class="btn" id="cCp">Copiar mensaje</button></div></div>`;
  $('#cWA').onclick = () => openWA(msg); $('#cCp').onclick = () => copyText(msg);
  out.scrollIntoView({behavior:'smooth', block:'center'});
}

/* ---------- Arranque ---------- */
(async function boot(){
  applyTheme();
  const m = location.hash.match(/#c=([^&]+)/);
  if(m && !lic){ history.replaceState(null, '', location.pathname); try{ await activate(decodeURIComponent(m[1])); return; }catch(e){ render(); setTimeout(() => { const er = $('#acErr'); if(er) er.textContent = e.message; }, 50); return; } }
  const rr = location.hash.match(/#r=([a-z0-9]+)&k=([A-Za-z0-9_-]+)/);
  if(rr){ LS.set('cqr_pendr', {id:rr[1], k:rr[2]}); history.replaceState(null, '', location.pathname); }
  render();
  if(lic) checkLicense();
  pendingRestore();
  if('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
