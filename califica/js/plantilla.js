'use strict';
/* =========================================================
   Evaluaciones propias en imagen:
   - El maestro sube la hoja EN BLANCO y la MISMA hoja CON RESPUESTAS.
   - La app compara ambas y descubre sola: casillas (□) con su respuesta
     marcada, y preguntas de unir con líneas (puntos ●—●).
   - Imprime una copia por estudiante con QR + marcas de esquina.
   - Al escanear, mide la tinta en cada casilla / línea y califica sola.
   ========================================================= */
const TPL = (() => {
  /* ---------- Almacén de imágenes (IndexedDB) ---------- */
  function idb(){ return new Promise((ok, ko) => { const r = indexedDB.open('cqr_img', 1); r.onupgradeneeded = () => r.result.createObjectStore('img'); r.onsuccess = () => ok(r.result); r.onerror = () => ko(r.error); }); }
  async function put(k, v){ const d = await idb(); return new Promise((ok, ko) => { const t = d.transaction('img', 'readwrite'); t.objectStore('img').put(v, k); t.oncomplete = ok; t.onerror = () => ko(t.error); }); }
  async function get(k){ const d = await idb(); return new Promise((ok, ko) => { const r = d.transaction('img').objectStore('img').get(k); r.onsuccess = () => ok(r.result || null); r.onerror = () => ko(r.error); }); }
  async function del(k){ const d = await idb(); return new Promise(ok => { const t = d.transaction('img', 'readwrite'); t.objectStore('img').delete(k); t.oncomplete = ok; t.onerror = ok; }); }
  async function allImgs(){ const d = await idb(); return new Promise((ok, ko) => { const out = {}; const st = d.transaction('img').objectStore('img'); const rq = st.openCursor();
    rq.onsuccess = () => { const c = rq.result; if(c){ out[c.key] = c.value; c.continue(); } else ok(out); }; rq.onerror = () => ko(rq.error); }); }
  const cache = {};
  async function img(evId, which){ const k = evId + '_' + which; if(cache[k]) return cache[k]; const v = await get(k); if(v) cache[k] = v; return v; }

  /* ---------- Utilidades de imagen ---------- */
  const NW = 1600; // ancho de trabajo
  function toCanvas(im, w, h){ const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d', {willReadFrequently:true}); x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.drawImage(im, 0, 0, w, h); return c; }
  function cc(mask, w, h, minA){
    const lab = new Int32Array(w * h), out = [], st = new Int32Array(w * h); let id = 0;
    for(let s = 0; s < w * h; s++){
      if(!mask[s] || lab[s]) continue; id++; let sp = 0, a = 0, x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1; st[sp++] = s; lab[s] = id;
      while(sp){ const p = st[--sp], x = p % w, y = (p - x) / w; a++; if(x < x0) x0 = x; if(x > x1) x1 = x; if(y < y0) y0 = y; if(y > y1) y1 = y;
        for(let dy = -1; dy <= 1; dy++) for(let dx = -1; dx <= 1; dx++){ const xx = x + dx, yy = y + dy; if(xx < 0 || yy < 0 || xx >= w || yy >= h) continue; const q = yy * w + xx; if(mask[q] && !lab[q]){ lab[q] = id; st[sp++] = q; } } }
      if(a >= minA) out.push({id, a, x0, y0, x1, y1, w:x1 - x0 + 1, h:y1 - y0 + 1});
    }
    return {lab, comps:out};
  }

  /* ---------- Análisis: hoja en blanco + hoja con respuestas ---------- */
  async function analyze(blankURL, keyURL){
    const bi = await loadImg(blankURL), ki = await loadImg(keyURL); if(!bi || !ki) throw new Error('No se pudo abrir una de las imágenes.');
    const w = NW, h = Math.round(bi.height * NW / bi.width);
    const bc = toCanvas(bi, w, h), B = bc.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, w, h).data;
    // alinear la hoja de respuestas con la hoja en blanco (pequeños corrimientos)
    let kc = toCanvas(ki, w, h); let K = kc.getContext('2d', {willReadFrequently:true}).getImageData(0, 0, w, h).data;
    const sh = bestShift(B, K, w, h);
    if(sh.dx || sh.dy){ const c2 = document.createElement('canvas'); c2.width = w; c2.height = h; const x2 = c2.getContext('2d', {willReadFrequently:true}); x2.fillStyle = '#fff'; x2.fillRect(0, 0, w, h); x2.drawImage(ki, sh.dx, sh.dy, w, h); kc = c2; K = x2.getImageData(0, 0, w, h).data; }
    const n = w * h, dark = new Uint8Array(n), diff = new Uint8Array(n);
    for(let i = 0, j = 0; i < n; i++, j += 4){
      const gb = (B[j] * 77 + B[j + 1] * 150 + B[j + 2] * 29) >> 8; dark[i] = gb < 150 ? 1 : 0;
      const d = Math.abs(K[j] - B[j]) + Math.abs(K[j + 1] - B[j + 1]) + Math.abs(K[j + 2] - B[j + 2]);
      const gk = (K[j] * 77 + K[j + 1] * 150 + K[j + 2] * 29) >> 8;
      diff[i] = d > 110 && gk < 215 ? 1 : 0;
    }
    const U = w / 100; // 1% del ancho
    const {comps} = cc(dark, w, h, 6);
    const lineDark = (c, side) => { let t = 0, k = 0;
      const pts = side === 0 ? [...Array(c.w).keys()].map(i => [c.x0 + i, c.y0]) : side === 1 ? [...Array(c.w).keys()].map(i => [c.x0 + i, c.y1]) : side === 2 ? [...Array(c.h).keys()].map(i => [c.x0, c.y0 + i]) : [...Array(c.h).keys()].map(i => [c.x1, c.y0 + i]);
      pts.forEach(([x, y]) => { k++; let f = 0; for(let d = -1; d <= 1 && !f; d++){ const xx = side > 1 ? x + d : x, yy = side < 2 ? y + d : y; if(xx >= 0 && yy >= 0 && xx < w && yy < h && dark[yy * w + xx]) f = 1; } t += f; }); return t / k; };
    const interior = (c, sh2, M) => { let t = 0, k = 0; const mx = Math.ceil(c.w * sh2), my = Math.ceil(c.h * sh2);
      for(let y = c.y0 + my; y <= c.y1 - my; y++) for(let x = c.x0 + mx; x <= c.x1 - mx; x++){ k++; t += M[y * w + x]; } return k ? t / k : 1; };
    // casillas □
    const boxes = comps.filter(c => c.w >= .8 * U && c.h >= .8 * U && c.w <= 4.5 * U && c.h <= 4.5 * U && c.w / c.h > .75 && c.w / c.h < 1.33 && c.a / (c.w * c.h) < .5
      && [0, 1, 2, 3].every(sd => lineDark(c, sd) > .8) && interior(c, .2, dark) < .08).map(c => ({x:c.x0, y:c.y0, w:c.w, h:c.h, cx:(c.x0 + c.x1) / 2, cy:(c.y0 + c.y1) / 2}));
    boxes.forEach(b => b.key = interior({x0:b.x, y0:b.y, x1:b.x + b.w - 1, y1:b.y + b.h - 1, w:b.w, h:b.h}, .15, diff) > .06);
    // puntos ● (para unir con líneas)
    const dots = comps.filter(c => c.w >= .35 * U && c.h >= .35 * U && c.w <= 1.6 * U && c.h <= 1.6 * U && c.w / c.h > .7 && c.w / c.h < 1.4 && c.a / (c.w * c.h) > .6)
      .map(c => ({x:(c.x0 + c.x1) / 2, y:(c.y0 + c.y1) / 2, r:Math.max(c.w, c.h) / 2}));
    const qs = [];
    // ---- preguntas de unir: columnas de puntos conectadas por líneas en la hoja de respuestas
    const colsD = chains(dots, 1.2 * U, 7 * U).filter(c => c.length >= 2);
    const covKey = (a, b) => { let t = 0; const N = 40; for(let i = 0; i < N; i++){ const f = .12 + .76 * i / (N - 1), x = Math.round(a.x + (b.x - a.x) * f), y = Math.round(a.y + (b.y - a.y) * f);
      let hit = 0; for(let dy = -3; dy <= 3 && !hit; dy++) for(let dx = -3; dx <= 3 && !hit; dx++){ const xx = x + dx, yy = y + dy; if(xx >= 0 && yy >= 0 && xx < w && yy < h && diff[yy * w + xx]) hit = 1; } t += hit; } return t / N; };
    const usedCols = new Set();
    colsD.forEach((L, li) => colsD.forEach((R, ri) => {
      if(li === ri || usedCols.has(li) || usedCols.has(ri)) return; if(mean(R.map(d => d.x)) - mean(L.map(d => d.x)) < 10 * U) return;
      const ly = [Math.min(...L.map(d => d.y)), Math.max(...L.map(d => d.y))], ry = [Math.min(...R.map(d => d.y)), Math.max(...R.map(d => d.y))];
      if(ly[1] < ry[0] - 3 * U || ry[1] < ly[0] - 3 * U) return;
      const ok = L.map(a => { let best = -1, bv = 0; R.forEach((b, j) => { const v = covKey(a, b); if(v > bv){ bv = v; best = j; } }); return bv > .6 ? best : -1; });
      if(ok.filter(x => x >= 0).length >= Math.max(2, L.length - 1)){
        usedCols.add(li); usedCols.add(ri);
        // quitar puntos sueltos de los extremos (letras del título, viñetas)
        let Ls = L.slice(), oks = ok.slice(), Rs = R.slice();
        while(oks.length && oks[0] < 0){ oks.shift(); Ls.shift(); } while(oks.length && oks[oks.length - 1] < 0){ oks.pop(); Ls.pop(); }
        let r0 = 0, r1 = Rs.length - 1; while(r0 < r1 && !oks.includes(r0)) r0++; while(r1 > r0 && !oks.includes(r1)) r1--;
        Rs = Rs.slice(r0, r1 + 1); oks = oks.map(o => o < 0 ? -1 : o - r0);
        qs.push({kind:'line', L:Ls.map(d => ({x:d.x, y:d.y})), R:Rs.map(d => ({x:d.x, y:d.y})), ok:oks, top:Math.min(...Ls.map(d => d.y), ...Rs.map(d => d.y)), left:mean(Ls.map(d => d.x))});
      }
    }));
    // ---- casillas: agrupar en ítems (filas V/F, columnas de opciones)
    const used = new Set(), items = [];
    const S = median(boxes.map(b => b.w)) || 2 * U;
    // filas de casillas juntas (ej.: V □ F □)
    const rows = []; boxes.slice().sort((a, b) => a.cy - b.cy || a.cx - b.cx).forEach(b => { const r = rows.find(r => Math.abs(r.y - b.cy) < S * .6); if(r){ r.b.push(b); } else rows.push({y:b.cy, b:[b]}); });
    rows.forEach(r => { r.b.sort((a, b) => a.cx - b.cx); let g = [r.b[0]];
      const flush = () => { if(g.length >= 2 && g.filter(x => x.key).length === 1){ items.push({boxes:g, ok:g.findIndex(x => x.key), dir:'h'}); g.forEach(x => used.add(x)); } };
      for(let i = 1; i < r.b.length; i++){ if(r.b[i].cx - r.b[i - 1].cx < S * 7) g.push(r.b[i]); else { flush(); g = [r.b[i]]; } } flush(); });
    // columnas de casillas (opciones una debajo de otra)
    const rest = boxes.filter(b => !used.has(b));
    clusterX(rest.map(b => Object.assign({x:b.cx, y:b.cy}, {b})), S * .7).forEach(col => {
      col.sort((a, b) => a.y - b.y); let g = [col[0].b];
      const flush = () => { if(g.length >= 2 && g.filter(x => x.key).length === 1){ items.push({boxes:g, ok:g.findIndex(x => x.key), dir:'v'}); g.forEach(x => used.add(x)); } };
      for(let i = 1; i < col.length; i++){ if(col[i].y - col[i - 1].y < S * 4) g.push(col[i].b); else { flush(); g = [col[i].b]; } } flush(); });
    // ítems horizontales seguidos y alineados = una pregunta (V/F de varias afirmaciones)
    const hs = items.filter(it => it.dir === 'h').sort((a, b) => a.boxes[0].cy - b.boxes[0].cy);
    const groups = []; hs.forEach(it => { const g = groups.find(g => { const l = g[g.length - 1]; return Math.abs(l.boxes[0].cx - it.boxes[0].cx) < S && it.boxes[0].cy - l.boxes[0].cy < S * 4.5 && l.boxes.length === it.boxes.length; }); if(g) g.push(it); else groups.push([it]); });
    groups.forEach(g => qs.push({kind:'box', items:g.map(it => ({boxes:it.boxes.map(bx), ok:it.ok})), top:g[0].boxes[0].y, left:g[0].boxes[0].x}));
    items.filter(it => it.dir === 'v').forEach(it => qs.push({kind:'box', items:[{boxes:it.boxes.map(bx), ok:it.ok}], top:it.boxes[0].y, left:it.boxes[0].x}));
    // orden de lectura: por filas de la hoja, de izquierda a derecha
    qs.sort((a, b) => Math.abs(a.top - b.top) < 4 * U ? a.left - b.left : a.top - b.top);
    // marcas de la clave que no se pudieron entender (respuestas escritas)
    const {comps:kc2} = cc(diff, w, h, 25);
    const known = (c) => qs.some(q => q.kind === 'line' ? (c.x0 >= Math.min(...q.L.map(d => d.x)) - 2 * U && c.x1 <= Math.max(...q.R.map(d => d.x)) + 2 * U && c.y0 >= q.top - 4 * U && c.y1 <= Math.max(...q.L.map(d => d.y), ...q.R.map(d => d.y)) + 4 * U)
      : q.items.some(it => it.boxes.some(b => c.x0 >= b.x - b.w && c.x1 <= b.x + 2 * b.w && c.y0 >= b.y - b.h && c.y1 <= b.y + 2 * b.h)));
    const written = mergeRects(kc2.filter(c => !known(c)).map(c => ({x:c.x0, y:c.y0, w:c.w, h:c.h})), 2.5 * U);
    return {w, h, qs, written, shift:sh, nBoxes:boxes.length, nDots:dots.length};
  }
  const bx = b => ({x:b.x, y:b.y, w:b.w, h:b.h});
  const mean = a => a.reduce((s, v) => s + v, 0) / (a.length || 1);
  const median = a => { if(!a.length) return 0; const s = a.slice().sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
  function clusterX(pts, tol){ const out = []; pts.slice().sort((a, b) => a.x - b.x).forEach(p => { const c = out.find(c => Math.abs(mean(c.map(q => q.x)) - p.x) < tol); if(c) c.push(p); else out.push([p]); });
    // separar columnas con huecos verticales grandes
    return out.flatMap(c => { c.sort((a, b) => a.y - b.y); const gaps = c.slice(1).map((p, i) => p.y - c[i].y); const md = median(gaps) || 1; const parts = [[c[0]]];
      for(let i = 1; i < c.length; i++){ if(c[i].y - c[i - 1].y > md * 2.6) parts.push([c[i]]); else parts[parts.length - 1].push(c[i]); } return parts; }); }
  /* columnas de puntos: cadenas verticales con separación pareja */
  function chains(pts, tol, maxGap){
    const ps = pts.slice().sort((a, b) => a.y - b.y), used = new Set(), out = [];
    const build = p => { const ch = [p]; let cur = p, gap = null;
      for(;;){ const nx = ps.filter(q => !used.has(q) && q.y > cur.y + 2 && Math.abs(q.x - cur.x) < tol && q.y - cur.y < maxGap && (gap === null || Math.abs(q.y - cur.y - gap) < gap * .3)).sort((a, b) => a.y - b.y)[0];
        if(!nx) break; if(gap === null) gap = nx.y - cur.y; ch.push(nx); cur = nx; } return ch; };
    for(;;){ let best = null; ps.forEach(p => { if(used.has(p)) return; const c = build(p); if(!best || c.length > best.length) best = c; });
      if(!best || best.length < 2) break; best.forEach(q => used.add(q)); out.push(best); }
    return out;
  }
  function mergeRects(rs, gap){ let ch = true; rs = rs.slice();
    while(ch){ ch = false; for(let i = 0; i < rs.length && !ch; i++) for(let j = i + 1; j < rs.length && !ch; j++){ const a = rs[i], b = rs[j];
      if(a.x - gap < b.x + b.w && b.x - gap < a.x + a.w && a.y - gap < b.y + b.h && b.y - gap < a.y + a.h){ const x = Math.min(a.x, b.x), y = Math.min(a.y, b.y); rs[i] = {x, y, w:Math.max(a.x + a.w, b.x + b.w) - x, h:Math.max(a.y + a.h, b.y + b.h) - y}; rs.splice(j, 1); ch = true; } } }
    return rs; }
  function bestShift(B, K, w, h){
    const f = 4, ww = Math.floor(w / f), hh = Math.floor(h / f), g = (D, x, y) => { const j = ((y * f) * w + x * f) * 4; return (D[j] * 77 + D[j + 1] * 150 + D[j + 2] * 29) >> 8; };
    const gb = new Uint8Array(ww * hh), gk = new Uint8Array(ww * hh);
    for(let y = 0; y < hh; y++) for(let x = 0; x < ww; x++){ gb[y * ww + x] = g(B, x, y) < 128 ? 1 : 0; gk[y * ww + x] = g(K, x, y) < 128 ? 1 : 0; }
    let best = {s:-1, dx:0, dy:0};
    for(let dy = -10; dy <= 10; dy++) for(let dx = -10; dx <= 10; dx++){ let s = 0;
      for(let y = 12; y < hh - 12; y += 2) for(let x = 12; x < ww - 12; x += 2) if(gb[y * ww + x] && gk[(y + dy) * ww + x + dx]) s++;
      if(s > best.s) best = {s, dx, dy}; }
    return {dx:-best.dx * f, dy:-best.dy * f};
  }

  /* ---------- Impresión ---------- */
  function placement(W, H, iw, ih){ const x0 = 15, x1 = W - 15, y0 = 38, y1 = H - 14; const s = Math.min((x1 - x0) / iw, (y1 - y0) / ih); const w = iw * s, h = ih * s; return {x:x0 + (x1 - x0 - w) / 2, y:y0, w, h}; }
  async function buildPDF(ev, ctx, blankURL){
    const W = 215.9, H = ctx.papel === 'oficio' ? 330.2 : 279.4;
    const {jsPDF} = window.jspdf; const doc = new jsPDF({unit:'mm', format:[W, H], compress:true});
    const im = await loadImg(blankURL); const pl = placement(W, H, im.width, im.height);
    const c = Math.round(Math.min(2400, im.width)); const cv = toCanvas(im, c, Math.round(im.height * c / im.width)); const data = cv.toDataURL('image/jpeg', .92);
    const lay = {W, H, kind:'img', pages:[{b:[]}], num:null, qr:{x:W - 18 - 20, y:13, s:20}, mk:[[11, 11], [W - 11, 11], [W - 11, H - 11], [11, H - 11]], img:pl};
    const col = HOJA_RGB(ctx.color);
    ctx.students.forEach((st, i) => {
      if(i) doc.addPage([W, H]);
      doc.setFillColor(0, 0, 0); lay.mk.forEach(([cx, cy]) => doc.rect(cx - 3, cy - 3, 6, 6, 'F'));
      HOJA.drawQR(doc, HOJA.qrText(ev.id, ev.ver || 1, 0, st.n), lay.qr.x, lay.qr.y, lay.qr.s);
      doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(...col); doc.text(HOJA.clean((ctx.ue || '').toUpperCase()), 18, 17);
      doc.setTextColor(25, 25, 25); doc.setFontSize(13); doc.text(`Nº ${st.n}  ${HOJA.clean(st.nombre)}`, 18, 25);
      doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5); doc.setTextColor(110, 110, 110); doc.text(HOJA.clean(`${ev.titulo || ''} · ${ctx.area} · ${ctx.curso}`), 18, 31);
      doc.addImage(data, 'JPEG', pl.x, pl.y, pl.w, pl.h, 'tplimg', 'FAST');
    });
    return {doc, layout:lay};
  }
  function HOJA_RGB(hex){ const n = parseInt(String(hex || '#1D4E89').replace('#', ''), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }

  /* ---------- Calificación desde la foto ---------- */
  function grade(ev, r, layout){
    const G = r.G, H = r.H, T = ev.tpl, pl = layout.img;
    const toMM = (x, y) => [pl.x + x * pl.w / T.w, pl.y + y * pl.h / T.h];
    const P = (x, y) => { const m = toMM(x, y); return OMR.ap(H, m[0], m[1]); };
    const px = (x, y) => { x = Math.round(x); y = Math.round(y); if(x < 0 || y < 0 || x >= G.w || y >= G.h) return 255; return G.g[y * G.w + x]; };
    const whiteAround = (x0, y0, x1, y1) => { const v = []; const s = Math.max(2, Math.round((x1 - x0) / 10));
      for(let y = y0; y <= y1; y += s) for(let x = x0; x <= x1; x += s) v.push(px(x, y)); v.sort((a, b) => a - b); return Math.max(80, v[Math.floor(v.length * .85)] || 200); };
    const marks = [], m = {}, flags = [];
    (ev.qs || []).forEach((q, qi) => {
      const t = T.qs[qi]; if(!t) return;
      if(t.kind === 'box'){
        m[q.id] = t.items.map(it => {
          const ink = it.boxes.map(b => {
            const c = [P(b.x, b.y), P(b.x + b.w, b.y), P(b.x + b.w, b.y + b.h), P(b.x, b.y + b.h)];
            const xs = c.map(p => p[0]), ys = c.map(p => p[1]);
            const wt = whiteAround(Math.min(...xs) - (Math.max(...xs) - Math.min(...xs)), Math.min(...ys) - (Math.max(...ys) - Math.min(...ys)), Math.max(...xs) + (Math.max(...xs) - Math.min(...xs)), Math.max(...ys) + (Math.max(...ys) - Math.min(...ys)));
            let d = 0, k = 0; const N = 9;
            for(let i = 1; i < N; i++) for(let j = 1; j < N; j++){ const u = .2 + .6 * i / N, v = .2 + .6 * j / N; const p = P(b.x + b.w * u, b.y + b.h * v); k++; if(px(p[0], p[1]) < wt * .62) d++; }
            marks.push({c:P(b.x + b.w / 2, b.y + b.h / 2), r:Math.hypot(xs[1] - xs[0], ys[1] - ys[0]) * .7, box:true, on:false});
            return {f:d / k, mi:marks.length - 1};
          });
          const ord = ink.map((v, i) => [v.f, i]).sort((a, b) => b[0] - a[0]);
          if(ord[0][0] < .06) return null;
          if(ord[1] && ord[1][0] >= .06 && ord[1][0] > ord[0][0] * .55){ flags.push(q.id); ink.forEach(v => { if(v.f >= .06) marks[v.mi].dbl = true; }); return -2; }
          marks[ink[ord[0][1]].mi].on = true; return ord[0][1];
        });
      } else if(t.kind === 'line'){
        const Lp = t.L.map(d => P(d.x, d.y)), Rp = t.R.map(d => P(d.x, d.y));
        const scale = Math.hypot(...[0, 1].map(k => P(T.w * .5 + 10, T.h * .5)[k] - P(T.w * .5, T.h * .5)[k])) / 10; // px de foto por px de plantilla
        const wt = whiteAround(Math.min(...Lp.map(p => p[0])), Math.min(...Lp.map(p => p[1]), ...Rp.map(p => p[1])), Math.max(...Rp.map(p => p[0])), Math.max(...Lp.map(p => p[1]), ...Rp.map(p => p[1])));
        const tol = Math.max(2, Math.round(6 * scale));
        const cov = (a, b) => { let t2 = 0; const N = 36; const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len;
          for(let i = 0; i < N; i++){ const f = .12 + .76 * i / (N - 1); const x = a[0] + dx * f, y = a[1] + dy * f; let hit = 0;
            for(let s = -tol; s <= tol && !hit; s++) if(px(x + nx * s, y + ny * s) < wt * .6) hit = 1; t2 += hit; } return t2 / N; };
        m[q.id] = Lp.map((a, i) => { let best = null, bv = 0; Rp.forEach((b, j) => { const v = cov(a, b); if(v > bv){ bv = v; best = j; } });
          marks.push({c:a, r:6 * scale, on:bv > .55}); if(bv > .55){ marks.push({c:Rp[best], r:6 * scale, on:true, seg:[a, Rp[best]]}); return best; } return null; });
      }
    });
    return {m, marks, flags};
  }

  /* ---------- Preguntas para la app a partir del análisis ---------- */
  function toQuestions(an, prev){
    return an.qs.map((t, i) => ({id:'t' + (i + 1), tipo:'tpl', kind:t.kind, txt:t.kind === 'line' ? `Unir con líneas (${t.L.length})` : t.items.length > 1 ? `Casillas: ${t.items.length} filas de ${t.items[0].boxes.length}` : `Marcar 1 de ${t.items[0].boxes.length} casillas`,
      pts:(prev && prev[i] && prev[i].pts) || 5, n:t.kind === 'line' ? t.L.length : t.items.length, opts:t.kind === 'line' ? t.R.length : t.items[0].boxes.length,
      ok:t.kind === 'line' ? t.ok : t.items.map(it => it.ok)}));
  }

  /* Dibujo de lo detectado sobre la hoja con respuestas */
  async function preview(keyURL, an){
    const im = await loadImg(keyURL); const c = toCanvas(im, an.w, an.h); const x = c.getContext('2d');
    x.lineWidth = 4; x.font = 'bold 34px sans-serif';
    an.qs.forEach((q, i) => {
      x.strokeStyle = '#1E7F4A'; x.fillStyle = 'rgba(30,127,74,.18)';
      let lx, ly;
      if(q.kind === 'box'){ q.items.forEach(it => it.boxes.forEach((b, j) => { x.strokeStyle = j === it.ok ? '#1E7F4A' : '#2459A0'; if(j === it.ok) x.fillRect(b.x - 4, b.y - 4, b.w + 8, b.h + 8); x.strokeRect(b.x - 4, b.y - 4, b.w + 8, b.h + 8); })); lx = q.items[0].boxes[0].x - 46; ly = q.items[0].boxes[0].y + 26; }
      else { q.L.forEach((a, k) => { if(q.ok[k] >= 0){ const b = q.R[q.ok[k]]; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.strokeStyle = '#1E7F4A'; x.stroke(); } x.beginPath(); x.arc(a.x, a.y, 12, 0, 7); x.strokeStyle = '#2459A0'; x.stroke(); });
        q.R.forEach(b => { x.beginPath(); x.arc(b.x, b.y, 12, 0, 7); x.strokeStyle = '#2459A0'; x.stroke(); }); lx = q.L[0].x - 60; ly = q.L[0].y + 10; }
      x.fillStyle = '#1E7F4A'; x.beginPath(); x.arc(Math.max(22, lx + 12), ly - 12, 22, 0, 7); x.fill(); x.fillStyle = '#fff'; x.textAlign = 'center'; x.fillText(String(i + 1), Math.max(22, lx + 12), ly);
    });
    x.strokeStyle = '#E08A00'; x.setLineDash([10, 8]); an.written.forEach(r => x.strokeRect(r.x - 6, r.y - 6, r.w + 12, r.h + 12));
    return c.toDataURL('image/jpeg', .8);
  }

  function forget(id, w){ delete cache[id + '_' + w]; }
  return {put, get, del, allImgs, img, forget, analyze, buildPDF, grade, toQuestions, preview, placement};
})();
