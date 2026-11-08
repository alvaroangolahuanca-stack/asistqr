'use strict';
/* =========================================================
   Excel: planillas por área, centralizador y resultados.
   Importación de listas de estudiantes (Excel, Word, texto, imagen).
   ========================================================= */
const XL = (() => {
  const B = {style:'thin', color:{rgb:'999999'}};
  const BOR = {top:B, bottom:B, left:B, right:B};
  const hex = c => String(c || '#1D4E89').replace('#', '').toUpperCase();
  const st = (o = {}) => Object.assign({font:{name:'Arial', sz:9}, border:BOR, alignment:{vertical:'center', horizontal:'center', wrapText:true}}, o);
  function cell(v, s, f){ const c = {v:v === null || v === undefined ? '' : v, t:typeof v === 'number' ? 'n' : 's', s}; if(f){ c.f = f; } return c; }
  const A = (c, r) => XLSX.utils.encode_cell({c, r});

  /* Hoja de planilla de un área y un trimestre */
  function planillaSheet(a, t){
    const c = curso(), est = students(), col = hex(cfg.color);
    const H = st({font:{name:'Arial', sz:9, bold:true, color:{rgb:'FFFFFF'}}, fill:{fgColor:{rgb:col}}});
    const H2 = st({font:{name:'Arial', sz:8, bold:true}, fill:{fgColor:{rgb:'F2F2F2'}}, alignment:{vertical:'bottom', horizontal:'center', wrapText:true, textRotation:90}});
    const H3 = st({font:{name:'Arial', sz:8, bold:true}, fill:{fgColor:{rgb:'F2F2F2'}}});
    const P = st({font:{name:'Arial', sz:9, bold:true}, fill:{fgColor:{rgb:'EAF0F8'}}});
    const T = st({font:{name:'Arial', sz:10, bold:true}, fill:{fgColor:{rgb:'FFF4D6'}}});
    const N = st(), L = st({alignment:{vertical:'center', horizontal:'left'}});
    const groups = DIMS.map(D => ({D, cs:colsOf(a, t, D.k)}));
    const rows = [], merges = [];
    const width = 2 + groups.reduce((s, g) => s + g.cs.length + (g.D.k === 'auto' ? 0 : 1), 0) + 2;
    const title = (txt, sz, bold) => { const r = rows.length; rows.push([cell(txt, {font:{name:'Arial', sz, bold, color:{rgb:bold ? col : '333333'}}, alignment:{horizontal:'center'}})]); merges.push({s:{r, c:0}, e:{r, c:width - 1}}); };
    title((cfg.ue || '').toUpperCase(), 13, true);
    title('CUADRO DE EVALUACIÓN – ' + areaName(a).toUpperCase(), 11, true);
    title(`${TRIM[t - 1].toUpperCase()} – GESTIÓN ${c.gestion}`, 10, false);
    title(`NIVEL: ${nivelTxt().toUpperCase()}    GRADO: ${cursoLargo()}    MAESTRA(O): ${(cfg.maestro || '').toUpperCase()}`, 9, false);
    rows.push([]);
    const r1 = rows.length, r2 = r1 + 1, r3 = r1 + 2;
    const R1 = [cell('Nº', H), cell('APELLIDOS Y NOMBRES', H)], R2 = [cell('', H), cell('', H)], R3 = [cell('', H3), cell('Fecha →', H3)];
    merges.push({s:{r:r1, c:0}, e:{r:r3, c:0}}, {s:{r:r1, c:1}, e:{r:r2, c:1}});
    const pos = {}; let ci = 2;
    groups.forEach(({D, cs}) => {
      const start = ci, mx = dimMax(D.k);
      if(D.k === 'auto'){
        R1.push(cell(`AUTOEVALUACIÓN (${mx})`, H)); R2.push(cell('SER – DECIDIR', H2)); R3.push(cell('', H3)); pos.auto = {cols:[ci], prom:ci}; ci++; return;
      }
      const n = cs.length + 1;
      for(let k = 0; k < n; k++) R1.push(cell(k ? '' : `${D.t.toUpperCase()} (${mx})`, H));
      if(n > 1) merges.push({s:{r:r1, c:start}, e:{r:r1, c:start + n - 1}});
      cs.forEach(x => { R2.push(cell(x.tema || '', H2)); R3.push(cell(fmtD(x.fecha), H3)); });
      R2.push(cell('PROMEDIO', H2)); R3.push(cell('', H3));
      pos[D.k] = {cols:cs.map((x, k) => start + k), prom:start + cs.length, cs}; ci += n;
    });
    const cT = ci, cV = ci + 1;
    R1.push(cell('NOTA TRIMESTRAL', H), cell('VALORACIÓN', H)); R2.push(cell('', H), cell('', H)); R3.push(cell('', H3), cell('', H3));
    merges.push({s:{r:r1, c:cT}, e:{r:r3, c:cT}}, {s:{r:r1, c:cV}, e:{r:r3, c:cV}});
    rows.push(R1, R2, R3);
    const cu = cfg.cual || [];
    const cualF = ref => cu.slice(0, -1).reduceRight((acc, q) => `IF(${ref}<=${q.max},"${q.c}",${acc})`, `"${cu[cu.length - 1].c}"`);
    est.forEach((s, i) => {
      const r = rows.length, R = [cell(s.n, N), cell(s.nombre + (s.ret ? ' (retirado)' : ''), L)];
      const res = trimRes(a, t, s.id);
      groups.forEach(({D, cs}) => {
        if(D.k === 'auto'){ const ac = colsOf(a, t, 'auto')[0]; R.push(cell(ac ? getN(ac.id, s.id) ?? '' : '', P)); return; }
        cs.forEach(x => R.push(cell(getN(x.id, s.id) ?? '', N)));
        const p = pos[D.k], rg = p.cols.length ? `${A(p.cols[0], r)}:${A(p.cols[p.cols.length - 1], r)}` : null;
        R.push(cell(res[D.k] ?? '', P, rg ? `IF(COUNT(${rg})=0,"",ROUND(AVERAGE(${rg}),0))` : undefined));
      });
      const proms = ['ser', 'saber', 'hacer', 'auto'].map(k => A(pos[k].prom, r));
      R.push(cell(res.total ?? '', T, `IF(COUNT(${proms.join(',')})=0,"",SUM(${proms.join(',')}))`));
      R.push(cell(res.cual ? res.cual.c : '', T, `IF(${A(cT, r)}="","",${cualF(A(cT, r))})`));
      rows.push(R);
    });
    rows.push([]);
    rows.push([cell('Valoración cualitativa: ' + cu.map((q, i) => `${q.c} = ${q.t} (${i ? cu[i - 1].max + 1 : 1}-${q.max})`).join('   '), {font:{name:'Arial', sz:8, italic:true}})]);
    merges.push({s:{r:rows.length - 1, c:0}, e:{r:rows.length - 1, c:width - 1}});
    const ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!merges'] = merges;
    ws['!cols'] = [{wch:4}, {wch:34}, ...Array(width - 4).fill({wch:5.5}), {wch:10}, {wch:11}];
    const rh = []; rh[r2] = {hpt:96}; ws['!rows'] = rh;
    ws['!freeze'] = {xSplit:2, ySplit:r3 + 1};
    ws['!pageSetup'] = {orientation:'landscape', paperSize:9, fitToWidth:1};
    return ws;
  }

  function centralSheet(){
    const c = curso(), est = students(), areas = c.areas, col = hex(cfg.color);
    const H = st({font:{name:'Arial', sz:9, bold:true, color:{rgb:'FFFFFF'}}, fill:{fgColor:{rgb:col}}});
    const H3 = st({font:{name:'Arial', sz:8, bold:true}, fill:{fgColor:{rgb:'F2F2F2'}}});
    const N = st(), L = st({alignment:{horizontal:'left', vertical:'center'}}), P = st({font:{name:'Arial', sz:9, bold:true}, fill:{fgColor:{rgb:'EAF0F8'}}});
    const width = 2 + areas.length * 4 + 1;
    const rows = [], merges = [];
    const title = (txt, sz, bold) => { const r = rows.length; rows.push([cell(txt, {font:{name:'Arial', sz, bold, color:{rgb:bold ? col : '333333'}}, alignment:{horizontal:'center'}})]); merges.push({s:{r, c:0}, e:{r, c:width - 1}}); };
    title((cfg.ue || '').toUpperCase(), 13, true); title(`CENTRALIZADOR DE NOTAS – GESTIÓN ${c.gestion}`, 11, true);
    title(`NIVEL: ${nivelTxt().toUpperCase()}    GRADO: ${cursoLargo()}    MAESTRA(O): ${(cfg.maestro || '').toUpperCase()}`, 9, false); rows.push([]);
    const r1 = rows.length; const R1 = [cell('Nº', H), cell('APELLIDOS Y NOMBRES', H)], R2 = [cell('', H), cell('', H)];
    merges.push({s:{r:r1, c:0}, e:{r:r1 + 1, c:0}}, {s:{r:r1, c:1}, e:{r:r1 + 1, c:1}});
    areas.forEach((a, k) => { const s0 = 2 + k * 4; ['1T', '2T', '3T', 'P.A.'].forEach((x, j) => { R1.push(cell(j ? '' : areaName(a).toUpperCase(), H)); R2.push(cell(x, H3)); }); merges.push({s:{r:r1, c:s0}, e:{r:r1, c:s0 + 3}}); });
    R1.push(cell('PROMEDIO ANUAL', H)); R2.push(cell('', H)); merges.push({s:{r:r1, c:width - 1}, e:{r:r1 + 1, c:width - 1}});
    rows.push(R1, R2);
    est.forEach(s => {
      const r = rows.length, R = [cell(s.n, N), cell(s.nombre, L)], pas = [];
      areas.forEach((a, k) => { const s0 = 2 + k * 4; [1, 2, 3].forEach(t => R.push(cell(trimRes(a, t, s.id).total ?? '', N)));
        const rg = `${A(s0, r)}:${A(s0 + 2, r)}`; R.push(cell(annual(a, s.id) ?? '', P, `IF(COUNT(${rg})=0,"",ROUND(AVERAGE(${rg}),0))`)); pas.push(A(s0 + 3, r)); });
      const pv = areas.map(a => annual(a, s.id)).filter(isNum);
      R.push(cell(pv.length ? r0(pv.reduce((x, y) => x + y, 0) / pv.length) : '', P, `IF(COUNT(${pas.join(',')})=0,"",ROUND(AVERAGE(${pas.join(',')}),0))`));
      rows.push(R);
    });
    const ws = XLSX.utils.aoa_to_sheet(rows); ws['!merges'] = merges;
    ws['!cols'] = [{wch:4}, {wch:34}, ...Array(areas.length * 4).fill({wch:5.5}), {wch:10}];
    ws['!pageSetup'] = {orientation:'landscape', paperSize:9, fitToWidth:1};
    return ws;
  }

  function exportAll(onlyTrim){
    const c = curso(), wb = XLSX.utils.book_new();
    const tr = onlyTrim ? [onlyTrim] : [1, 2, 3];
    tr.forEach(t => c.areas.forEach(a => {
      const has = cols.some(x => x.cid === c.id && x.a === a && x.t === t && Object.keys(notas[x.id] || {}).length);
      if(onlyTrim || has){ ensureCols(a, t); XLSX.utils.book_append_sheet(wb, planillaSheet(a, t), `${a} ${TRIMC[t - 1]}`); }
    }));
    XLSX.utils.book_append_sheet(wb, centralSheet(), 'CENTRALIZADOR');
    return save(wb, `Planillas_${cursoCorto()}_${c.gestion}${onlyTrim ? '_' + TRIMC[onlyTrim - 1] : ''}`);
  }
  function exportArea(a, t){ const wb = XLSX.utils.book_new(); ensureCols(a, t); XLSX.utils.book_append_sheet(wb, planillaSheet(a, t), `${a} ${TRIMC[t - 1]}`); return save(wb, `Planilla_${a}_${cursoCorto()}_${TRIMC[t - 1]}`); }
  function exportCentral(){ const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, centralSheet(), 'CENTRALIZADOR'); return save(wb, `Centralizador_${cursoCorto()}_${curso().gestion}`); }

  function exportEval(ev){
    const wb = XLSX.utils.book_new(), est = students(), col = hex(cfg.color), R = resp[ev.id] || {};
    const H = st({font:{name:'Arial', sz:9, bold:true, color:{rgb:'FFFFFF'}}, fill:{fgColor:{rgb:col}}}), N = st(), L = st({alignment:{horizontal:'left', vertical:'center'}});
    const P = st({font:{name:'Arial', sz:9, bold:true}, fill:{fgColor:{rgb:'EAF0F8'}}});
    const rows = [[cell(ev.titulo, {font:{name:'Arial', sz:12, bold:true, color:{rgb:col}}})], [cell(`${areaName(ev.a)} · ${cursoLargo()} · ${TRIM[ev.t - 1]} · ${fmtD(ev.fecha)}`, {font:{name:'Arial', sz:9}})], []];
    rows.push([cell('Nº', H), cell('ESTUDIANTE', H), ...ev.qs.map((q, i) => cell(`P${i + 1} (${qMax(q)})`, H)), cell(`TOTAL (${evMax(ev)})`, H), cell(`NOTA (${dimMax(ev.d || 'saber')})`, H)]);
    const sums = ev.qs.map(() => 0); let cnt = 0;
    est.forEach(s => { const r = R[s.id]; if(!r){ rows.push([cell(s.n, N), cell(s.nombre, L), ...ev.qs.map(() => cell('', N)), cell('', P), cell('', P)]); return; }
      const sc = evScore(ev, r.m); cnt++; ev.qs.forEach((q, i) => sums[i] += sc.per[q.id].pts);
      rows.push([cell(s.n, N), cell(s.nombre, L), ...ev.qs.map(q => cell(sc.per[q.id].pts, N)), cell(sc.tot, P), cell(sc.nota, P)]); });
    rows.push([cell('', N), cell('% DE LOGRO POR PREGUNTA', P), ...ev.qs.map((q, i) => cell(cnt ? Math.round(sums[i] / (cnt * qMax(q)) * 100) + '%' : '', P)), cell('', N), cell('', N)]);
    const ws = XLSX.utils.aoa_to_sheet(rows); ws['!cols'] = [{wch:4}, {wch:34}, ...ev.qs.map(() => ({wch:7})), {wch:10}, {wch:10}];
    XLSX.utils.book_append_sheet(wb, ws, 'Resultados');
    return save(wb, `Resultados_${fileName(ev.titulo)}_${cursoCorto()}`);
  }
  function save(wb, name){ const out = XLSX.write(wb, {bookType:'xlsx', type:'array', cellStyles:true}); return shareOrDownload(new Blob([out], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), fileName(name) + '.xlsx'); }

  /* ---------------- Importar lista de estudiantes ---------------- */
  const HEAD = /apellido|nombre|estudiante|alumno|n[º°o]\b|lista|curso|grado|maestr|director|unidad|educativa|gesti[oó]n|trimestre|fecha|total|ciencia|educaci[oó]n|matem[aá]tica|lenguaje|comunicaci[oó]n|artes|pl[aá]stica|visual|m[uú]sica|t[eé]cnica|tecnol[oó]gica|valores|espiritual|religi|f[ií]sica|qu[ií]mica|biolog|geograf|filosof|psicolog|cosmovisi|social|natural|primaria|secundaria|inicial|promedio|observaci|evaluaci|deporte|extranjera/i;
  function looksName(s){
    s = String(s || '').trim().replace(/\s+/g, ' ');
    if(s.length < 5 || s.length > 70 || /\d/.test(s) || HEAD.test(s)) return false;
    if(!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' .\-]+$/.test(s)) return false;
    return s.split(' ').filter(w => w.length > 1).length >= 2;
  }
  function cleanLine(s){ return String(s || '').replace(/^\s*(n[º°o]\.?\s*)?\d{1,3}\s*[.)\-–:]?\s*/i, '').replace(/\s*[|;,]\s*$/, '').replace(/\s+/g, ' ').trim(); }
  function fromLines(lines){
    const out = [];
    lines.forEach(l => { const parts = String(l).split(/\t|\s{3,}|\|/).map(cleanLine).filter(Boolean);
      const nm = parts.find(looksName) || (looksName(cleanLine(l)) ? cleanLine(l) : null); if(!nm) return;
      const g = parts.find(p => /^[MFmf]$/.test(p)); out.push({nombre:nm.toUpperCase(), gen:g ? g.toUpperCase() : ''}); });
    return dedupe(out);
  }
  function dedupe(a){ const seen = new Set(); return a.filter(x => { const k = norm(x.nombre); if(seen.has(k)) return false; seen.add(k); return true; }); }
  /* Excel: busca la hoja y la columna con más nombres */
  function sheetsCandidates(wb){
    const res = [];
    wb.SheetNames.forEach((sn, si) => {
      const ws = wb.Sheets[sn]; const aoa = XLSX.utils.sheet_to_json(ws, {header:1, raw:false, defval:''});
      const hidden = wb.Workbook && wb.Workbook.Sheets && wb.Workbook.Sheets[si] && wb.Workbook.Sheets[si].Hidden;
      const byCol = {};
      aoa.forEach((r, ri) => r.forEach((v, c) => { if(looksName(v)) (byCol[c] = byCol[c] || []).push(ri); }));
      Object.entries(byCol).forEach(([c, rowsIdx]) => {
        // tramo continuo más largo (la lista real está en filas seguidas)
        let best = [], cur = [];
        rowsIdx.forEach(ri => { if(cur.length && ri - cur[cur.length - 1] > 2){ if(cur.length > best.length) best = cur; cur = []; } cur.push(ri); });
        if(cur.length > best.length) best = cur; if(best.length < 3) return;
        const list = best.map(ri => { const r = aoa[ri]; const v = String(r[c]).trim(); const g = r.find(x => /^[MF]$/i.test(String(x).trim()));
          const ru = r.find(x => /^\d{10,20}$/.test(String(x).trim())); return {nombre:v.replace(/\s+/g, ' ').toUpperCase(), gen:g ? String(g).trim().toUpperCase() : '', rude:ru ? String(ru).trim() : ''}; });
        const d = dedupe(list), three = d.filter(x => x.nombre.split(' ').length >= 3).length / d.length;
        res.push({sheet:sn, col:XLSX.utils.encode_col(+c), list:d, hidden:!!hidden, score:d.length * (.4 + three) + (hidden ? 0 : 6) + (list.length === d.length ? 2 : 0)});
      });
    });
    return res.sort((a, b) => b.score - a.score);
  }
  /* Word (.docx): se descomprime con las herramientas del navegador */
  async function docxText(buf){
    const u8 = new Uint8Array(buf), dv = new DataView(buf);
    let eocd = -1; for(let i = u8.length - 22; i >= Math.max(0, u8.length - 70000); i--) if(dv.getUint32(i, true) === 0x06054b50){ eocd = i; break; }
    if(eocd < 0) throw new Error('El archivo Word no es válido.');
    let p = dv.getUint32(eocd + 16, true); const n = dv.getUint16(eocd + 10, true);
    for(let k = 0; k < n; k++){
      const method = dv.getUint16(p + 10, true), csize = dv.getUint32(p + 20, true), nl = dv.getUint16(p + 28, true), xl = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), off = dv.getUint32(p + 42, true);
      const name = dec.decode(u8.subarray(p + 46, p + 46 + nl));
      if(name === 'word/document.xml'){
        const ln = dv.getUint16(off + 26, true), lx = dv.getUint16(off + 28, true), data = u8.subarray(off + 30 + ln + lx, off + 30 + ln + lx + csize);
        let xml; if(method === 0) xml = dec.decode(data); else { const ds = new DecompressionStream('deflate-raw'); xml = await new Response(new Blob([data]).stream().pipeThrough(ds)).text(); }
        return xml.replace(/<\/w:p>/g, '\n').replace(/<w:tab\/>/g, '\t').replace(/<\/w:tc>/g, '\t').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'");
      }
      p += 46 + nl + xl + cl;
    }
    throw new Error('No se encontró texto en el documento.');
  }
  /* Imagen: lectura de texto (OCR). Necesita internet la primera vez. */
  function loadScript(src){ return new Promise((ok, ko) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = () => ko(new Error('Sin internet: no se pudo cargar el lector de imágenes.')); document.head.appendChild(s); }); }
  async function ocr(file, onProg){
    if(!window.Tesseract) await loadScript('https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js');
    const r = await Tesseract.recognize(file, 'spa', {logger:m => { if(m.status === 'recognizing text' && onProg) onProg(Math.round(m.progress * 100)); }});
    return r.data.text;
  }
  async function parseFile(file, onProg){
    const nm = file.name.toLowerCase();
    if(/\.(xlsx|xlsm|xls|ods|csv)$/.test(nm)){ const wb = XLSX.read(await file.arrayBuffer(), {type:'array'}); return {kind:'excel', cands:sheetsCandidates(wb)}; }
    if(/\.docx$/.test(nm)){ const t = await docxText(await file.arrayBuffer()); return {kind:'texto', list:fromLines(t.split(/\n/))}; }
    if(/\.(txt)$/.test(nm)){ return {kind:'texto', list:fromLines((await file.text()).split(/\n/))}; }
    if(/^image\//.test(file.type)){ const t = await ocr(file, onProg); return {kind:'imagen', list:fromLines(t.split(/\n/))}; }
    throw new Error('Formato no reconocido. Usa Excel, Word, una foto o pega el texto.');
  }
  return {exportAll, exportArea, exportCentral, exportEval, parseFile, fromLines};
})();
