'use strict';
/* =========================================================
   Hojas de evaluación (PDF) con QR, marcas de esquina y burbujas.
   Todas las medidas en milímetros. La posición de cada burbuja se
   guarda (layout) para que el escáner sepa dónde leer.
   ========================================================= */
const HOJA = (() => {
  const PAPER = {carta:[215.9, 279.4], oficio:[215.9, 330.2]};
  const MK = {m:8, s:6};             // margen y lado de las marcas negras de esquina
  const QS = 20;                     // lado del QR (mm)
  const XL = 18, BR = 2.9;           // margen izquierdo de contenido, radio de burbuja (diámetro ~5,8 mm)
  const LET = 'abcdefghij';
  const pt = fs => fs * 0.3528;      // puntos -> mm
  const lh = fs => pt(fs) * 1.25;

  function mkCenters(W, H){ const c = MK.m + MK.s / 2; return [[c, c], [W - c, c], [W - c, H - c], [c, H - c]]; }
  function qrRect(W){ return {x: W - XL - QS, y: 13, s: QS}; }
  function clean(s){
    return String(s ?? '').replace(/[“”«»]/g, '"').replace(/[‘’]/g, "'").replace(/[–—]/g, '-').replace(/…/g, '...').replace(/[•●]/g, '-')
      .replace(/\t/g, ' ').replace(/[^\n -ÿ]/g, '');
  }
  function rgb(hex){ const h = String(hex || '#1D4E89').replace('#', ''); const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function tint(c, a){ return c.map(v => Math.round(v + (255 - v) * a)); }

  /* Código del QR (modo alfanumérico, muy compacto): CQ1:EVALID:VER:PAG:NUM */
  function qrText(evId, ver, pg, num){ return `CQ1:${String(evId).toUpperCase()}:${ver}:${pg}:${num}`; }
  function parseQR(t){
    const m = /^CQ1:([A-Z0-9]+):(\d+):(\d+):(\d+)$/.exec(String(t || '').trim()); if(!m) return null;
    return {ev:m[1].toLowerCase(), ver:+m[2], pg:+m[3], num:+m[4]};
  }
  function drawQR(doc, text, x, y, s){
    const q = qrcode(1, 'M'); q.addData(text, 'Alphanumeric'); q.make();
    const n = q.getModuleCount(), c = s / n; doc.setFillColor(0, 0, 0);
    for(let r = 0; r < n; r++){ let c0 = -1;
      for(let k = 0; k <= n; k++){ const d = k < n && q.isDark(r, k);
        if(d && c0 < 0) c0 = k; if(!d && c0 >= 0){ doc.rect(x + c0 * c, y + r * c, (k - c0) * c + 0.02, c + 0.02, 'F'); c0 = -1; } } }
  }

  /* Puntaje por pregunta (lo usa también la app) */
  function nParts(q){
    switch(q.tipo){
      case 'sel': return 1;
      case 'vf': return (q.items || []).length;
      case 'rel': return (q.pares || []).length;
      case 'comp': return blanksOf(q.texto).length;
      case 'lista': return +q.n || 0;
      default: return 1;
    }
  }
  function blanksOf(t){ return String(t || '').match(/_{3,}/g) || []; }

  /* ------------ Motor de maquetación ------------ */
  function build(ev, ctx){
    const [W, H] = PAPER[ctx.papel] || PAPER.carta;
    const {jsPDF} = window.jspdf;
    const doc = new jsPDF({unit:'mm', format:[W, H], compress:true});
    const col = rgb(ctx.color), soft = tint(col, .9);
    const XR = W - XL, BOTTOM = H - 17;
    const copy = !ctx.students;
    const people = copy ? [null] : ctx.students;
    const lay = {W, H, pages:[], num:null, qr:qrRect(W), mk:mkCenters(W, H)};
    let pageIdx = 0, y = 0, rec = true, first = true;

    const font = (st, fs, c) => { doc.setFont('helvetica', st); doc.setFontSize(fs); doc.setTextColor(...(c || [25, 25, 25])); };
    const split = (t, w) => doc.splitTextToSize(clean(t), w);
    const bub = (x, y0, letter, meta) => {
      doc.setDrawColor(70, 70, 70); doc.setLineWidth(.3); doc.circle(x, y0, BR, 'S');
      if(letter){ font('bold', 8.5, [165, 165, 165]); doc.text(letter, x, y0 + pt(8.5) * .36, {align:'center'}); }
      if(rec && meta) lay.pages[pageIdx].b.push({x:+x.toFixed(2), y:+y0.toFixed(2), r:BR, ...meta});
    };

    function frame(st, pg, tot){
      // marcas de esquina
      doc.setFillColor(0, 0, 0); mkCenters(W, H).forEach(([cx, cy]) => doc.rect(cx - MK.s / 2, cy - MK.s / 2, MK.s, MK.s, 'F'));
      const q = qrRect(W); drawQR(doc, qrText(ev.id, ev.ver || 1, pg, st ? st.n : 0), q.x, q.y, q.s);
      font('normal', 7, [140, 140, 140]); doc.text(`CalificaQR  ·  Página ${pg + 1} de ${tot}`, W / 2, H - 9.6, {align:'center'});
    }
    function header(st, pg, tot){
      frame(st, pg, tot);
      const q = qrRect(W);
      if(pg > 0){
        font('bold', 11); doc.text(split(ev.titulo || 'Evaluación', q.x - XL - 6)[0], XL, 19);
        font('normal', 9.5, [70, 70, 70]); doc.text(st ? `Nº ${st.n}  ·  ${clean(st.nombre)}` : 'Nombre: ________________________________   Nº ____', XL, 25.5);
        font('normal', 8.5, [120, 120, 120]); doc.text(`${clean(ctx.area)} · ${clean(ctx.curso)}`, XL, 31);
        return 41;
      }
      let lx = XL;
      if(ctx.logoUE){ const L = ctx.logoUE, s = Math.min(20 / L.w, 20 / L.h); doc.addImage(L.data, L.fmt, XL + (20 - L.w * s) / 2, 13 + (20 - L.h * s) / 2, L.w * s, L.h * s, 'logoUE', 'FAST'); lx = XL + 23; }
      let rx = q.x - 3;
      if(ctx.logoGrado){ const L = ctx.logoGrado, s = Math.min(16 / L.w, 16 / L.h); doc.addImage(L.data, L.fmt, rx - 16 + (16 - L.w * s) / 2, 15 + (16 - L.h * s) / 2, L.w * s, L.h * s, 'logoGr', 'FAST'); rx -= 19; }
      const cx = (lx + rx) / 2, cw = rx - lx;
      font('bold', 10, col); doc.text(split((ctx.ue || '').toUpperCase(), cw)[0] || '', cx, 17.5, {align:'center'});
      font('bold', 8.5, [90, 90, 90]); doc.text(split(('Evaluación de ' + ctx.area).toUpperCase(), cw)[0], cx, 22, {align:'center'});
      font('bold', 13.5); const tl = split(ev.titulo || 'Evaluación', cw).slice(0, 2); doc.text(tl, cx, 28, {align:'center', lineHeightFactor:1.1});
      font('normal', 8.5, [80, 80, 80]);
      doc.text(clean(`${ctx.curso}  ·  ${ctx.trim}  ·  Gestión ${ctx.gestion}${ev.fecha ? '  ·  ' + ev.fecha.split('-').reverse().join('/') : ''}`), cx, 28 + tl.length * lh(13.5) * 1.1 - 1.2, {align:'center'});
      // Recuadro del estudiante
      let by = 40, bh = copy ? 25 : 15;
      doc.setFillColor(...soft); doc.setDrawColor(...col); doc.setLineWidth(.35); doc.roundedRect(XL, by, XR - XL, bh, 2.5, 2.5, 'FD');
      if(!copy){
        font('bold', 10.5); doc.text('Nombre:', XL + 4, by + 6.3); font('normal', 10.5); doc.text(clean(st.nombre).toUpperCase(), XL + 21, by + 6.3);
        font('bold', 10.5); doc.text(`Nº ${st.n}`, XR - 4, by + 6.3, {align:'right'});
        font('bold', 9.5, [60, 60, 60]); doc.text('Puntaje:', XL + 4, by + 12); doc.setDrawColor(90, 90, 90); doc.setLineWidth(.25); doc.line(XL + 19, by + 12.4, XL + 40, by + 12.4);
        font('normal', 9.5, [60, 60, 60]); doc.text(`/ ${ctx.total}`, XL + 41.5, by + 12);
        font('bold', 9.5, [60, 60, 60]); doc.text('Nota:', XL + 62, by + 12); doc.line(XL + 72, by + 12.4, XL + 90, by + 12.4);
      } else {
        font('bold', 10.5); doc.text('Nombre:', XL + 4, by + 6.6); doc.setDrawColor(90, 90, 90); doc.setLineWidth(.25); doc.line(XL + 21, by + 7, XR - 96, by + 7);
        font('bold', 9.5, [60, 60, 60]); doc.text('Puntaje:', XL + 4, by + 13); doc.line(XL + 19, by + 13.4, XL + 40, by + 13.4); font('normal', 9.5, [60, 60, 60]); doc.text(`/ ${ctx.total}`, XL + 41.5, by + 13);
        font('normal', 8, [90, 90, 90]); doc.text('Rellena tu número de lista ->', XL + 4, by + 20.5);
        // burbujas del número de lista
        const maxN = Math.max(9, ctx.numMax || 40), decMax = Math.min(9, Math.floor(maxN / 10));
        const x0 = XR - 4 - 9 * 7.4 - BR, rows = [{k:'dec', t:'Decenas', n:decMax + 1, y:by + 6.4}, {k:'uni', t:'Unidades', n:10, y:by + 16.4}];
        lay.num = {dec:[], uni:[]};
        rows.forEach(r => { font('bold', 7.5, [90, 90, 90]); doc.text(r.t, x0 - BR - 2, r.y + 1, {align:'right'});
          for(let o = 0; o < r.n; o++){ const bx = x0 + o * 7.4; bub(bx, r.y, String(o), null); if(rec) lay.num[r.k].push({x:+bx.toFixed(2), y:+r.y.toFixed(2), r:BR, o}); } });
      }
      by += bh + 5;
      font('italic', 8.5, [90, 90, 90]);
      const ins = clean(ev.instr || 'Lee con atención. En las preguntas con círculos, rellena por completo el círculo de tu respuesta con lápiz oscuro o bolígrafo.');
      const il = split(ins, XR - XL); doc.text(il, XL, by); by += il.length * lh(8.5) + 3;
      return by;
    }

    /* Cada pregunta: draw=false solo mide */
    function question(q, n, y0, draw){
      const x0 = XL + 9, w = XR - x0; let y = y0;
      const T = (lines, x, yy, opt) => { if(draw) doc.text(lines, x, yy, opt); };
      // enunciado
      font('bold', 10.5); const L = split(q.txt || '', w - 14);
      if(draw){
        doc.setFillColor(...col); doc.circle(XL + 3.4, y - 1.3, 3.4, 'F'); font('bold', 9, [255, 255, 255]); doc.text(String(n), XL + 3.4, y - 1.3 + pt(9) * .35, {align:'center'});
        font('normal', 8, [140, 140, 140]); doc.text(`${q.pts || 5} pts`, XR, y, {align:'right'}); font('bold', 10.5);
      }
      T(L, x0, y, {lineHeightFactor:1.25}); y += Math.max(1, L.length) * lh(10.5) + 1.8;
      const fs = 10.2, row = Math.max(lh(fs), 2 * BR + 1.4);
      switch(q.tipo){
        case 'sel': {
          const ops = q.ops || []; font('normal', fs);
          let nc = 1; for(const k of [3, 2]){ if(ops.length >= k && ops.every(o => doc.getTextWidth(clean(o)) <= w / k - 2 * BR - 6)){ nc = k; break; } }
          const cw = w / nc;
          for(let i = 0; i < ops.length; i += nc){ let hh = row;
            for(let c = 0; c < nc && i + c < ops.length; c++){ const k = i + c, xx = x0 + c * cw; font('normal', fs); const l = split(ops[k], cw - 2 * BR - 5); const cy = y + 1.2;
              if(draw) bub(xx + BR + .2, cy - 1.2, LET[k].toUpperCase(), {q:q.id, i:0, o:k});
              font('normal', fs); T(l, xx + 2 * BR + 2.6, cy, {lineHeightFactor:1.25}); hh = Math.max(hh, l.length * lh(fs) + 1.4); }
            y += hh + .5; }
          break;
        }
        case 'vf': {
          (q.items || []).forEach((it, i) => { font('normal', fs); const l = split(it.t, w - 4 * BR - 6); const cy = y + 1.2;
            if(draw){ bub(x0 + BR + .2, cy - 1.2, 'V', {q:q.id, i, o:0}); bub(x0 + 3 * BR + 1.8, cy - 1.2, 'F', {q:q.id, i, o:1}); }
            font('normal', fs); T(l, x0 + 4 * BR + 4.4, cy, {lineHeightFactor:1.25}); y += Math.max(row, l.length * lh(fs) + 1.4) + .5; });
          break;
        }
        case 'rel': {
          const pr = q.pares || [], ord = relOrder(q), nd = pr.length, gap = 2 * BR + .9;
          font('italic', 8.3, [110, 110, 110]); T('Rellena la letra de la descripción que corresponde.', x0, y); y += 4.4;
          const tw = 46, bx0 = x0 + tw + 2 + BR, rx = bx0 + (nd - 1) * gap + BR + 5, rw = XR - rx;
          // columna izquierda: elementos con sus burbujas
          let yl = y;
          pr.forEach((p, i) => { font('bold', 9.8); const l = split(`${i + 1}. ${p.i}`, tw); const cy = yl + 1.2;
            T(l, x0, cy, {lineHeightFactor:1.2});
            if(draw) for(let o = 0; o < nd; o++) bub(bx0 + o * gap, cy - 1.2, LET[o], {q:q.id, i, o});
            yl += Math.max(row, l.length * lh(9.8) + 1.2) + .5; });
          // columna derecha: descripciones mezcladas
          let yr = y + 2.4; const desc = [];
          ord.forEach((pi, li) => { font('normal', 9.4); const l = split(pr[pi].d, rw - 9); desc.push([li, l, yr]); yr += l.length * lh(9.4) + 1.2; });
          if(draw){ doc.setFillColor(248, 248, 248); doc.setDrawColor(205, 205, 205); doc.setLineWidth(.2); doc.roundedRect(rx, y - 2.6, rw, yr - y + 1.2, 1.8, 1.8, 'FD');
            desc.forEach(([li, l, yy2]) => { font('bold', 9.4, col); doc.text(LET[li] + ')', rx + 2.2, yy2); font('normal', 9.4); doc.text(l, rx + 7.5, yy2, {lineHeightFactor:1.25}); }); }
          y = Math.max(yl, yr + 1);
          break;
        }
        case 'comp': {
          font('normal', fs); y = flow(q.texto || '', x0, w, y + .6, fs, draw) + .6; break;
        }
        case 'lista': {
          const n = Math.max(1, +q.n || 1), per = n >= 4 ? (n === 4 ? 4 : 3) : n, bw = (w - (per - 1) * 3) / per, bh = 12;
          for(let i = 0; i < n; i++){ const r = Math.floor(i / per), c = i % per, xx = x0 + c * (bw + 3), yy = y - 2 + r * (bh + 3);
            if(draw){ doc.setDrawColor(...col); doc.setLineWidth(.3); doc.roundedRect(xx, yy, bw, bh, 1.6, 1.6, 'S'); font('bold', 8.5, col); doc.text(LET[i] + ')', xx + 1.8, yy + 3.6); } }
          y += Math.ceil(n / per) * (bh + 3) - 1; break;
        }
        case 'abi': {
          const n = Math.max(1, +q.lineas || 3);
          for(let i = 0; i < n; i++){ y += 7.2; if(draw){ doc.setDrawColor(150, 150, 150); doc.setLineWidth(.25); doc.line(x0, y, XR, y); } }
          y += 2.2; break;
        }
        case 'prob': {
          const h = Math.max(20, +q.alto || 50);
          if(draw){ doc.setDrawColor(170, 170, 170); doc.setLineWidth(.25); doc.roundedRect(x0, y - 2, w, h, 1.8, 1.8, 'S'); font('italic', 8, [140, 140, 140]); doc.text('Desarrollo / procedimiento:', x0 + 2, y + 1.6); }
          y += h + 3.6;
          if(draw){ font('bold', 10); doc.text('Respuesta:', x0, y); doc.setDrawColor(90, 90, 90); doc.line(x0 + 20, y + .5, x0 + 90, y + .5); }
          y += 3; break;
        }
      }
      return y + 3.2;
    }

    /* Texto con espacios en blanco (___) en línea */
    function flow(text, x0, w, y, fs, draw){
      const BW = 36; font('normal', fs); const sp = doc.getTextWidth(' ');
      const parts = clean(text).split(/(_{3,}|\n)/); let x = x0; const L = lh(fs) * 1.55;
      parts.forEach(p => {
        if(p === '\n'){ x = x0; y += L; return; }
        if(/^_{3,}$/.test(p)){
          if(x + BW > x0 + w && x > x0){ x = x0; y += L; }
          if(draw){ doc.setDrawColor(80, 80, 80); doc.setLineWidth(.3); doc.line(x, y + .8, x + BW, y + .8); }
          x += BW + sp; return;
        }
        p.split(/(\s+)/).forEach(wd => { if(!wd) return; if(/^\s+$/.test(wd)){ if(x > x0) x += sp; return; }
          const ww = doc.getTextWidth(wd); if(x + ww > x0 + w && x > x0){ x = x0; y += L; }
          if(draw){ font('normal', fs); doc.text(wd, x, y); } x += ww; });
      });
      return y + lh(fs);
    }

    const qs = (ev.qs || []);
    // Primera pasada: paginación (igual para todos los estudiantes)
    rec = false;
    const plan = []; { let pg = 0, yy = header(people[0] || {n:0, nombre:''}, 0, 1);
      doc.deletePage(1); doc.addPage([W, H]);
      qs.forEach((q, k) => { const h = question(q, k + 1, 0, false); if(yy + h > BOTTOM && plan.some(p => p.pg === pg)){ pg++; yy = 41; } plan.push({pg, y:yy}); yy += h; });
    }
    const totPages = (plan.length ? plan[plan.length - 1].pg : 0) + 1;
    doc.deletePage(1);
    // Segunda pasada: dibujo
    people.forEach((st, si) => {
      rec = si === 0;
      for(let pg = 0; pg < totPages; pg++){
        doc.addPage([W, H]); pageIdx = pg; if(rec) lay.pages[pg] = {b:[]};
        header(st, pg, totPages);
        qs.forEach((q, k) => { if(plan[k].pg === pg) question(q, k + 1, plan[k].y, true); });
      }
    });
    lay.n = totPages;
    return {doc, layout:lay};
  }

  /* Orden en que se imprimen las descripciones de "relacionar" (mezcladas, fijo por pregunta) */
  function relOrder(q){
    const n = (q.pares || []).length;
    if(Array.isArray(q.orden) && q.orden.length === n && [...q.orden].sort().every((v, i) => v === i)) return q.orden;
    const a = [...Array(n).keys()]; let s = 0; for(const ch of String(q.id || 'x')) s = (s * 31 + ch.charCodeAt(0)) >>> 0;
    for(let i = n - 1; i > 0; i--){ s = (s * 1103515245 + 12345) >>> 0; const j = s % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
    if(n > 1 && a.every((v, i) => v === i)) a.push(a.shift());
    return a;
  }

  return {build, parseQR, qrText, nParts, blanksOf, relOrder, PAPER, LET};
})();
