'use strict';
/* =========================================================
   Lector óptico (OMR) sin internet:
   1) lee el QR  2) ubica las 4 marcas negras de esquina
   3) corrige la perspectiva  4) mide qué tan oscuro está cada círculo
   ========================================================= */
const OMR = (() => {
  /* ---- Homografía (4 puntos) ---- */
  function homography(src, dst){
    const A = [], b = [];
    for(let i = 0; i < 4; i++){ const [x, y] = src[i], [u, v] = dst[i];
      A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u);
      A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v); }
    const n = 8;
    for(let c = 0; c < n; c++){
      let p = c; for(let r = c + 1; r < n; r++) if(Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
      if(Math.abs(A[p][c]) < 1e-12) return null;
      [A[c], A[p]] = [A[p], A[c]]; [b[c], b[p]] = [b[p], b[c]];
      for(let r = 0; r < n; r++){ if(r === c) continue; const f = A[r][c] / A[c][c]; if(!f) continue;
        for(let k = c; k < n; k++) A[r][k] -= f * A[c][k]; b[r] -= f * b[c]; }
    }
    const h = b.map((v, i) => v / A[i][i]); h.push(1); return h;
  }
  function ap(H, x, y){ const w = H[6] * x + H[7] * y + H[8]; return [(H[0] * x + H[1] * y + H[2]) / w, (H[3] * x + H[4] * y + H[5]) / w]; }
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

  /* ---- Imagen ---- */
  function toGray(img){
    const d = img.data, n = img.width * img.height, g = new Uint8Array(n);
    for(let i = 0, j = 0; i < n; i++, j += 4) g[i] = (d[j] * 77 + d[j + 1] * 150 + d[j + 2] * 29) >> 8;
    return {g, w:img.width, h:img.height};
  }
  function down(G, f){
    if(f <= 1) return G; const w = Math.floor(G.w / f), h = Math.floor(G.h / f), g = new Uint8Array(w * h), ff = f * f;
    for(let y = 0; y < h; y++) for(let x = 0; x < w; x++){ let s = 0;
      for(let yy = 0; yy < f; yy++){ const o = (y * f + yy) * G.w + x * f; for(let xx = 0; xx < f; xx++) s += G.g[o + xx]; }
      g[y * w + x] = s / ff; }
    return {g, w, h};
  }
  /* Busca una marca negra cuadrada cerca del punto previsto (umbral adaptativo + prueba de "cuadrado") */
  function findMarker(G, px, py, half, side){
    const x0 = Math.max(0, Math.round(px - half)), y0 = Math.max(0, Math.round(py - half));
    const x1 = Math.min(G.w - 1, Math.round(px + half)), y1 = Math.min(G.h - 1, Math.round(py + half));
    const w = x1 - x0 + 1, h = y1 - y0 + 1; if(w < 8 || h < 8) return null;
    // imagen integral para la media local
    const I = new Float64Array((w + 1) * (h + 1));
    for(let y = 0; y < h; y++){ let rs = 0; const o = (y + y0) * G.w + x0;
      for(let x = 0; x < w; x++){ rs += G.g[o + x]; I[(y + 1) * (w + 1) + x + 1] = I[y * (w + 1) + x + 1] + rs; } }
    const R = Math.max(4, Math.round(side * 1.6));
    const bin = new Uint8Array(w * h);
    for(let y = 0; y < h; y++){ const ya = Math.max(0, y - R), yb = Math.min(h, y + R + 1), o = (y + y0) * G.w + x0;
      for(let x = 0; x < w; x++){ const xa = Math.max(0, x - R), xb = Math.min(w, x + R + 1);
        const m = (I[yb * (w + 1) + xb] - I[ya * (w + 1) + xb] - I[yb * (w + 1) + xa] + I[ya * (w + 1) + xa]) / ((yb - ya) * (xb - xa));
        const v = G.g[o + x]; bin[y * w + x] = (v < m * .62 && v < 170) ? 1 : 0; } }
    const stack = new Int32Array(w * h), pts = new Int32Array(w * h * 2); let best = null;
    const exp = side * side;
    for(let s = 0; s < w * h; s++){
      if(bin[s] !== 1) continue;
      let sp = 0, area = 0, sx = 0, sy = 0, mnx = 1e9, mny = 1e9, mxx = -1, mxy = -1; stack[sp++] = s; bin[s] = 2;
      while(sp){ const p = stack[--sp], x = p % w, y = (p - x) / w; pts[area * 2] = x; pts[area * 2 + 1] = y; area++; sx += x; sy += y;
        if(x < mnx) mnx = x; if(x > mxx) mxx = x; if(y < mny) mny = y; if(y > mxy) mxy = y;
        if(x > 0 && bin[p - 1] === 1){ bin[p - 1] = 2; stack[sp++] = p - 1; }
        if(x < w - 1 && bin[p + 1] === 1){ bin[p + 1] = 2; stack[sp++] = p + 1; }
        if(y > 0 && bin[p - w] === 1){ bin[p - w] = 2; stack[sp++] = p - w; }
        if(y < h - 1 && bin[p + w] === 1){ bin[p + w] = 2; stack[sp++] = p + w; } }
      const bw = mxx - mnx + 1, bh = mxy - mny + 1;
      if(area < 10 || bw < side * .5 || bh < side * .5 || bw > side * 2.2 || bh > side * 2.2) continue;
      if(area < exp * .35 || area > exp * 2.6) continue;
      // rectángulo mínimo (por ángulos) -> qué tan "cuadrado y lleno" es
      const cx = sx / area, cy = sy / area; let bestR = 1e18, bestAsp = 9;
      for(let a = 0; a < 90; a += 6){ const t = a * Math.PI / 180, c = Math.cos(t), si = Math.sin(t);
        let u0 = 1e9, u1 = -1e9, v0 = 1e9, v1 = -1e9;
        for(let k = 0; k < area; k++){ const dx = pts[k * 2] - cx, dy = pts[k * 2 + 1] - cy, u = dx * c + dy * si, v = -dx * si + dy * c;
          if(u < u0) u0 = u; if(u > u1) u1 = u; if(v < v0) v0 = v; if(v > v1) v1 = v; }
        const ra = (u1 - u0 + 1) * (v1 - v0 + 1); if(ra < bestR){ bestR = ra; bestAsp = Math.max(u1 - u0 + 1, v1 - v0 + 1) / Math.min(u1 - u0 + 1, v1 - v0 + 1); } }
      const fillR = area / bestR; if(fillR < .8 || bestAsp > 1.6) continue;
      const X = x0 + cx, Y = y0 + cy, d = Math.hypot(X - px, Y - py);
      const score = d / half + Math.abs(Math.log(area / exp)) * .5 + (1 - fillR) * 2;
      if(!best || score < best.score) best = {x:X, y:Y, score, area};
    }
    return best;
  }

  /* Oscuridad de un círculo (0 = blanco, 1 = negro) */
  function bubbleDark(G, H, b){
    const c = ap(H, b.x, b.y), e = ap(H, b.x + b.r, b.y), f = ap(H, b.x, b.y + b.r);
    const rp = (dist(c, e) + dist(c, f)) / 2, ri = rp * .62, ro1 = rp * 1.45, ro2 = rp * 2.1;
    let s = 0, n = 0; const ring = [];
    const X0 = Math.max(0, Math.floor(c[0] - ro2)), X1 = Math.min(G.w - 1, Math.ceil(c[0] + ro2));
    const Y0 = Math.max(0, Math.floor(c[1] - ro2)), Y1 = Math.min(G.h - 1, Math.ceil(c[1] + ro2));
    const step = rp > 14 ? 2 : 1;
    for(let y = Y0; y <= Y1; y += step) for(let x = X0; x <= X1; x += step){
      const d = Math.hypot(x - c[0], y - c[1]), v = G.g[y * G.w + x];
      if(d <= ri){ s += v; n++; } else if(d >= ro1 && d <= ro2) ring.push(v);
    }
    if(!n) return {d:0, c, rp};
    ring.sort((a, b) => a - b); const white = Math.max(60, ring.length ? ring[Math.floor(ring.length * .85)] : 220);
    return {d:Math.max(0, Math.min(1, 1 - (s / n) / white)), c, rp};
  }

  /* Decide la opción marcada en un grupo de círculos */
  function decide(ds){
    const min = Math.min(...ds), base = Math.min(min, .16);
    const idx = ds.map((d, i) => [d, i]).sort((a, b) => b[0] - a[0]);
    const [b1, i1] = idx[0], b2 = idx[1] ? idx[1][0] : base;
    if(b1 - base < .17) return {sel:null, conf:1 - (b1 - base) / .17};
    const marked = ds.filter(d => d - base >= .17 && d >= b1 * .62).length;
    if(marked > 1) return {sel:-2, conf:.3};
    return {sel:i1, conf:Math.min(1, (b1 - b2) / .3)};
  }

  let qrCan = null;
  function readQR(canvas, full){
    const W = canvas.width, Hh = canvas.height, cx = canvas.getContext('2d', {willReadFrequently:true});
    const run = (im, w, h) => { const r = jsQR(im.data, w, h, {inversionAttempts:'dontInvert'}); if(!r) return null;
      const L = r.location; return {text:r.data, pts:[L.topLeftCorner, L.topRightCorner, L.bottomRightCorner, L.bottomLeftCorner].map(p => [p.x, p.y])}; };
    const maxD = Math.max(W, Hh);
    if(maxD > 1300){
      const sc = 1100 / maxD; qrCan = qrCan || document.createElement('canvas');
      qrCan.width = Math.round(W * sc); qrCan.height = Math.round(Hh * sc);
      const qc = qrCan.getContext('2d', {willReadFrequently:true}); qc.drawImage(canvas, 0, 0, qrCan.width, qrCan.height);
      const r = run(qc.getImageData(0, 0, qrCan.width, qrCan.height), qrCan.width, qrCan.height);
      if(r){
        // afinar las esquinas con la imagen completa (recorte alrededor del QR)
        const xs = r.pts.map(p => p[0] / sc), ys = r.pts.map(p => p[1] / sc), m = (Math.max(...xs) - Math.min(...xs)) * .6;
        const X0 = Math.max(0, Math.floor(Math.min(...xs) - m)), Y0 = Math.max(0, Math.floor(Math.min(...ys) - m));
        const X1 = Math.min(W, Math.ceil(Math.max(...xs) + m)), Y1 = Math.min(Hh, Math.ceil(Math.max(...ys) + m));
        const f = run(cx.getImageData(X0, Y0, X1 - X0, Y1 - Y0), X1 - X0, Y1 - Y0);
        if(f){ f.pts = f.pts.map(p => [p[0] + X0, p[1] + Y0]); return f; }
        r.pts = r.pts.map(p => [p[0] / sc, p[1] / sc]); return r;
      }
      if(!full) return null;
    }
    return run(cx.getImageData(0, 0, W, Hh), W, Hh);
  }

  /* Análisis completo. lookup(qr) -> {layout} o {error} */
  function analyze(canvas, lookup, opts = {}){
    const qr = readQR(canvas, opts.full); if(!qr) return {ok:false, why:'qr'};
    const info = HOJA.parseQR(qr.text); if(!info) return {ok:false, why:'ajeno', text:qr.text};
    const L = lookup(info); if(!L || L.error) return {ok:false, why:'eval', info, msg:L && L.error};
    const lay = L.layout, q = lay.qr;
    const H0 = homography([[q.x, q.y], [q.x + q.s, q.y], [q.x + q.s, q.y + q.s], [q.x, q.y + q.s]], qr.pts); if(!H0) return {ok:false, why:'qr'};
    const s0 = (dist(qr.pts[0], qr.pts[1]) + dist(qr.pts[1], qr.pts[2])) / 2 / q.s; // px por mm
    const ctx = canvas.getContext('2d', {willReadFrequently:true});
    const G = toGray(ctx.getImageData(0, 0, canvas.width, canvas.height));
    const f = Math.max(1, Math.floor(s0 / 3.2)), Gd = down(G, f), sd = s0 / f;
    const found = [];
    for(const m of lay.mk){
      const p = ap(H0, m[0], m[1]);
      const half = Math.max(20, 75 * sd);
      const r = findMarker(Gd, p[0] / f, p[1] / f, half, 6 * sd);
      if(!r) return {ok:false, why:'marcas', info, dbg:{m, p, f, sd}};
      found.push([(r.x + .5) * f, (r.y + .5) * f]);
    }
    const H = homography(lay.mk, found); if(!H) return {ok:false, why:'marcas', info};
    // control: el QR debe caer donde se espera
    const err = Math.max(...[[q.x, q.y], [q.x + q.s, q.y], [q.x + q.s, q.y + q.s], [q.x, q.y + q.s]].map((p, i) => dist(ap(H, p[0], p[1]), qr.pts[i])));
    if(err > 4.5 * s0) return {ok:false, why:'marcas', info, dbg:{err, s0, found}};
    const page = lay.pages[info.pg]; if(!page) return {ok:false, why:'eval', info, msg:'Página desconocida'};
    // círculos de respuestas
    const groups = {}; const marks = [];
    page.b.forEach(b => { const r = bubbleDark(G, H, b); const k = b.q + '|' + b.i; (groups[k] = groups[k] || []).push({o:b.o, d:r.d, c:r.c, rp:r.rp}); });
    const ans = {}; let lowConf = 0;
    Object.entries(groups).forEach(([k, arr]) => { arr.sort((a, b) => a.o - b.o); const dec = decide(arr.map(a => a.d));
      const [qid, i] = k.split('|'); (ans[qid] = ans[qid] || {})[i] = {sel:dec.sel, conf:dec.conf, ds:arr.map(a => +a.d.toFixed(2))};
      if(dec.conf < .35) lowConf++;
      arr.forEach((a, j) => marks.push({c:a.c, r:a.rp, on:dec.sel === j, dbl:dec.sel === -2 && a.d >= .3})); });
    // número de lista (hoja para fotocopiar)
    let num = info.num;
    if(!num && info.pg === 0 && lay.num){
      const rd = arr => { const ds = arr.map(b => bubbleDark(G, H, b)); ds.forEach((r, j) => marks.push({c:r.c, r:r.rp, on:false})); const d = decide(ds.map(r => r.d)); if(d.sel >= 0) marks[marks.length - ds.length + d.sel].on = true; return d.sel; };
      const dd = rd(lay.num.dec), uu = rd(lay.num.uni);
      num = (dd >= 0 && uu >= 0) ? dd * 10 + uu : (dd === null && uu >= 0 ? uu : 0);
    }
    return {ok:true, info, num, ans, lowConf, marks, H, s:s0};
  }

  return {analyze, homography, ap, decide};
})();
