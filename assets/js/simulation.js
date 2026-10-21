document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const stage = $('#stage'), panel = $('#panel');
  const ic = n => `<img class="svg-icon" src="assets/images/icons/${n}.svg" alt="" onerror="this.remove()">`;
  const fmt = s => { s = Math.max(0, Math.floor(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const O = () => getComputedStyle(stage).getPropertyValue('--o').trim();
  const rnd = (i, s) => { const x = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453; return x - Math.floor(x); };
  let toastT; const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1300); };

  // mise à l'échelle de la scène 1920x1020
  const fit = () => { const k = Math.min(innerWidth / 1920, innerHeight / 1020);
    stage.style.transform = `scale(${k})`; stage.style.left = (innerWidth - 1920 * k) / 2 + 'px'; stage.style.top = (innerHeight - 1020 * k) / 2 + 'px'; };
  addEventListener('resize', fit); fit();

  /* ---------- État ---------- */
  const S = { cur: 0, t: 0, play: true, vol: .06, shuf: true, rep: false, surround: false, tab: 'playlist', ang: 0, next: 0, mood: null, favOnly: false, sel: -1 };
  const V = {};            // valeurs des sliders / cases / listes (persistent quand on change d'onglet)
  const fav = new Set();
  const tracks = Array.from({ length: 15 }, (_, i) => ({ n: 'TRACK' + String(i + 2).padStart(3, '0'), a: 'Michael Jackson', d: i === 0 ? 297 : i > 12 ? 285 : 286 }));
  const cur = () => tracks[S.cur];

  /* ---------- Icônes de transport (SVG inline) ---------- */
  const SV = {
    play: '<svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>',
    stop: '<svg viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2"/></svg>',
    prev: '<svg viewBox="0 0 24 24"><path d="M5 5h2.5v14H5zM20 5v14L9 12z"/></svg>',
    next: '<svg viewBox="0 0 24 24"><path d="M16.5 5H19v14h-2.5zM4 5v14l11-7z"/></svg>',
    rep: '<svg viewBox="0 0 24 24"><path d="M3 7h14m-3-3 3 3-3 3M3 12h14m-3-3 3 3-3 3M3 17h8"/></svg>',
    shuf: '<svg viewBox="0 0 24 24"><path d="M3 17h3c6 0 6-10 12-10h3m-3-3 3 3-3 3M3 7h3c2 0 3 1 4 2.500M14 14.500c1 1.500 2 2.500 4 2.500h3m-3-3 3 3-3 3"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-8-5.200-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 20 10c0 5.800-8 11-8 11z"/></svg>'
  };
  $('#bPrev').innerHTML = SV.prev; $('#bStop').innerHTML = SV.stop; $('#bNext').innerHTML = SV.next;
  $('#bRep').innerHTML = SV.rep; $('#bShuf').innerHTML = SV.shuf; $('#bFav').innerHTML = SV.heart;

  /* ---------- Lecteur ---------- */
  function pickNext() {
    const n = tracks.length;
    if (n < 2) { S.next = 0; return; }
    if (S.shuf) { do { S.next = Math.floor(Math.random() * n); } while (S.next === S.cur); }
    else S.next = (S.cur + 1) % n;
  }
  function playIdx(i) { if (!tracks[i]) return; S.cur = i; S.t = 0; S.play = true; pickNext(); ui(); }
  const nextTrack = () => tracks.length && playIdx(S.next);
  const prevTrack = () => { if (!tracks.length) return; S.t > 3 ? (S.t = 0, ui()) : playIdx((S.cur - 1 + tracks.length) % tracks.length); };

  function ui() {
    const c = cur(), nx = tracks[S.next];
    $('#tbTitle').textContent = (c ? c.n + ' — ' : '') + 'SolarSound';
    $('#npT').textContent = c ? c.n : 'Aucun morceau'; $('#npA').textContent = c ? c.a : '';
    $('#tTot').textContent = fmt(c ? c.d : 0);
    $('#nxT').textContent = nx ? nx.n : '—'; $('#nxA').textContent = nx ? nx.a : '';
    $('#bPlay').innerHTML = S.play ? SV.pause : SV.play;
    $('#bRep').classList.toggle('on', S.rep); $('#bShuf').classList.toggle('on', S.shuf);
    $('#bFav').firstChild.style.fill = c && fav.has(S.cur) ? 'currentColor' : 'none';
    $('#mode').textContent = S.surround ? 'SURROUND + LFE' : S.shuf ? 'ALÉATOIRE' : 'SÉQUENTIEL';
    $('#modeDot').classList.toggle('on', S.surround);
    $('#status').textContent = !c ? 'Prêt' : S.play ? 'En lecture' : 'En pause';
    const v = Math.round(S.vol * 100);
    $('#volP').textContent = v + '%'; $('.vfill').style.height = S.vol * 62 + 'px';
    const th = $('.vthumb'); th.style.top = ((1 - S.vol) * 62 - 7) + 'px'; th.style.transform = 'none';
    if (S.tab === 'playlist') renderList();
    draw();
  }

  /* ---------- Dessin des formes d'onde ---------- */
  function draw() {
    const c = cur(); $('#tCur').textContent = fmt(S.t);
    // barre de lecture (barres verticales)
    const cv = $('#seek'), g = cv.getContext('2d'), w = cv.width, h = cv.height, n = Math.floor(w / 6), p = c ? S.t / c.d : 0;
    g.clearRect(0, 0, w, h); const o = O();
    for (let i = 0; i < n; i++) {
      const x = i / n; let a = .3 + .7 * rnd(i, S.cur + 1); a *= x > .9 ? Math.max(.04, (1 - x) / .1) : 1;
      const bh = Math.max(2, a * h); g.fillStyle = x <= p ? o : '#2a2217';
      g.fillRect(i * 6, V.bar === 'Barre simple' ? h / 2 - 2 : V.bar === 'Forme d\'onde classique' ? h - bh : (h - bh) / 2, 3, V.bar === 'Barre simple' ? 4 : bh);
    }
    // grande forme d'onde (enveloppe animée)
    const bg = $('#big'), q = bg.getContext('2d'), W = bg.width, H = bg.height, cy = H * .58, ph = S.t * 1.3 + S.cur * 7;
    q.clearRect(0, 0, W, H);
    const env = x => { const k = x / W; return (Math.pow(1 - k, 2.2) * .75 + .05) * (.7 + .3 * Math.sin(k * 40 + ph) + .15 * Math.sin(k * 113 + ph * 2)); };
    const gr = q.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, o); gr.addColorStop(1, 'rgba(150,95,10,.9)');
    q.fillStyle = gr; q.beginPath(); q.moveTo(10, cy);
    for (let x = 10; x < W - 20; x += 3) q.lineTo(x, cy - env(x) * H * .42);
    for (let x = W - 20; x >= 10; x -= 3) q.lineTo(x, cy + env(x) * H * .25);
    q.fill(); q.strokeStyle = '#f6dca0'; q.lineWidth = 1.500; q.beginPath(); q.moveTo(10, cy);
    for (let x = 10; x < W - 20; x += 3) q.lineTo(x, cy - env(x) * H * .42); q.stroke();
  }

  /* ---------- Contrôles du lecteur ---------- */
  $('#bPlay').onclick = () => { if (!tracks.length) return; S.play = !S.play; ui(); };
  $('#bStop').onclick = () => { S.play = false; S.t = 0; ui(); };
  $('#bNext').onclick = nextTrack; $('#bPrev').onclick = prevTrack;
  $('#bRep').onclick = () => { S.rep = !S.rep; ui(); toast(S.rep ? 'Répétition activée' : 'Répétition désactivée'); };
  $('#bShuf').onclick = () => { S.shuf = !S.shuf; pickNext(); ui(); };
  $('#bFav').onclick = () => { if (!tracks.length) return; fav.has(S.cur) ? fav.delete(S.cur) : fav.add(S.cur); ui(); };

  const drag = (el, fn) => el.addEventListener('pointerdown', e => {
    e.preventDefault(); fn(e); const mv = ev => fn(ev), up = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up); };
    addEventListener('pointermove', mv); addEventListener('pointerup', up);
  });
  drag($('#seek'), e => { const r = $('#seek').getBoundingClientRect(); if (cur()) { S.t = clamp((e.clientX - r.left) / r.width, 0, 1) * cur().d; draw(); } });
  drag($('#vol'), e => { const r = $('.vtrack').getBoundingClientRect(); S.vol = clamp(1 - (e.clientY - r.top) / r.height, 0, 1); ui(); });
  $('#vol').addEventListener('wheel', e => { e.preventDefault(); S.vol = clamp(S.vol + (e.deltaY < 0 ? .02 : -.02), 0, 1); ui(); }, { passive: false });

  addEventListener('keydown', e => {
    if (/INPUT|SELECT/.test(e.target.tagName) && e.target.type !== 'range') return;
    const k = { ' ': () => $('#bPlay').click(), ArrowRight: () => { S.t = clamp(S.t + 5, 0, cur().d - .1); draw(); }, ArrowLeft: () => { S.t = clamp(S.t - 5, 0, cur().d); draw(); },
      ArrowUp: () => { S.vol = clamp(S.vol + .05, 0, 1); ui(); }, ArrowDown: () => { S.vol = clamp(S.vol - .05, 0, 1); ui(); } }[e.key];
    if (k && cur()) { e.preventDefault(); k(); }
  });

  // horloge : 10 images/s
  setInterval(() => {
    if (!S.play || !cur()) return;
    S.t += .1;
    if (S.t >= cur().d) { S.rep ? (S.t = 0) : nextTrack(); ui(); } else draw();
  }, 100);

  /* ---------- Générateurs de widgets ---------- */
  const sl = (id, lab, min, max, step, val, d = 0, u = '', cls = '', g = '') => {
    val = V[id] ?? val;
    return `<div class="rw" ${g ? `style="grid-template-columns:${g}"` : ''}><label>${lab}</label><input type="range" id="${id}" class="${cls}" min="${min}" max="${max}" step="${step}" value="${val}" data-d="${d}" data-u="${u}"><b>${(+val).toFixed(d)}${u}</b></div>`;
  };
  const ck = (id, lab, def = false) => `<label class="ck"><input type="checkbox" id="${id}" ${(V[id] ?? def) ? 'checked' : ''}><i></i>${lab}</label>`;
  const sel = (id, opts) => `<select class="sel2" id="${id}">${opts.map(o => `<option ${V[id] === o ? 'selected' : ''}>${o}</option>`).join('')}</select>`;
  const btn = (a, label, icon = '', cls = '') => `<button class="btn ${cls}" data-a="${a}">${icon ? ic(icon) : ''}${label}</button>`;
  const paint = r => r.style.setProperty('--p', ((r.value - r.min) / (r.max - r.min) * 100) + '%');

  /* ---------- Panneaux ---------- */
  const MOODS = [['triste', 'Triste'], ['motivation', 'Motivation'], ['focus', 'Focus'], ['chill', 'Chill'], ['soiree', 'Soirée'], ['flow', 'Flow']];
  const PLS = { lists: [], sel: -1 };
  const EQX = [0, .2, .333, .467, .6, .727, .86, .97], FQ = ['32 Hz', '125', '250', '500', '1k', '2k', '4k', '8k'];
  const EQP = { 'Plat': [0, 0, 0, 0, 0, 0, 0, 0], 'Basses +': [6, 4, 2, 0, 0, 0, 0, 0], 'Voix': [-2, -1, 2, 4, 4, 2, 0, -2], 'Aigus +': [0, 0, 0, 0, 1, 3, 5, 6], 'Rock': [5, 3, -1, -2, 0, 3, 5, 6] };
  V.eq = EQX.map(x => ({ x, g: 0 })); V.eqOn = true;

  const PANELS = {
    playlist: () => `
      <div class="row">${btn('add', 'Ajouter', 'ajout')}${btn('dir', 'Dossier', 'dossier')}${btn('cd', 'CD audio', 'defaultcover')}${btn('rem', 'Retirer', 'retirer')}<span class="sp"></span>${btn('clr', 'Vider', 'vider')}</div>
      <div class="row" style="margin:-4px 0 4px"><span class="sp"></span><span class="mut" id="cnt"></span></div>
      <div class="row">${MOODS.map(([k, l]) => btn('mood:' + k, l, k, S.mood === k ? 'on' : '')).join('')}<span class="sp"></span>${btn('mypl', 'Mes Playlists', 'mesplaylists')}${btn('favF', 'Coups de coeur', 'heart', S.favOnly ? 'on' : '')}</div>
      <div class="list" id="list" style="height:318px"></div>`,

    video: () => `<div class="vid" id="vid"></div>
      <div class="vbar"><span>0:00</span><input type="range" id="vseek" min="0" max="100" value="0" style="flex:1"><span>0:00</span></div>
      <div class="vbar"><button class="vbtn" data-a="vv">⏮</button><button class="vbtn" data-a="vv">◂|</button><button class="vbtn" data-a="vv">■</button><button class="vbtn" data-a="vv">▶</button><button class="vbtn" data-a="vv">|▸</button><button class="vbtn" data-a="vv">⏭</button>
      <span style="margin-left:14px">Vitesse:</span>${sel('vspd', ['0.5x', '0.75x', '1.0x', '1.25x', '1.5x', '2.0x'])}<span class="sp"></span><button class="vbtn" data-a="vv">⧉</button><button class="vbtn" data-a="fs">⛶</button></div>`,

    mypl: () => `<div class="two" style="grid-template-columns:410px 1fr">
      <div><div style="font-size:18px;font-weight:700">Mes playlists</div><div class="mut" style="margin:6px 0 8px;max-width:370px">Glissez un ou plusieurs dossiers ici pour créer une playlist par dossier</div>
        <div class="row">${['Arbre|ajout', 'Détails|playlist', 'Icônes|video'].map(x => { const [l] = x.split('|'); return btn('view:' + l, l, '', (V.view || 'Icônes') === l ? 'on' : ''); }).join('')}</div>
        <div class="row"><button class="btn" data-a="home" style="width:64px">⌂</button></div>
        <div class="box list" id="tree" style="height:106px;padding:4px"></div>
        <div class="row" style="margin-top:8px">${btn('newpl', 'Nouvelle', 'ajout')}${btn('newdir', 'Nouveau dossier', 'dossier')}</div>
        <div class="row">${btn('save', 'Sauvegarder toutes les playlists', 'sauvegarder')}</div><div class="row">${btn('scan', 'Scanner les dossiers de musique', 'loupe')}</div></div>
      <div><div class="row" style="align-items:flex-start;gap:8px"><div class="cover" style="position:relative;left:0;top:0"><img class="svg-icon cov" src="assets/images/icons/defaultcover.svg" alt="" onerror="this.remove()"></div><b id="plName">—</b></div>
        <div class="row">${btn('editpl', 'Éditer', 'editer')}${btn('addf', 'Fichiers', 'ajout')}${btn('dir2', 'Dossier', 'dossier')}<span class="sp"></span>${btn('load', 'Charger', 'play')}</div>
        <div class="row"><span>Pistes (glisser pour réordonner) :</span><span class="sp"></span>${btn('remt', 'Retirer la piste', 'retirer')}</div>
        <div class="list" id="ptracks" style="height:215px"></div></div></div>`,

    surround: () => `<div class="hd">Mixage des canaux 5.1</div><div class="box">
      <div class="mut" style="text-align:center;letter-spacing:.3em">— AVANT —</div>
      ${sl('FL', 'FL', 0, 2, .1, 1, 1)}${sl('C', 'C', 0, 2, .1, 0, 1, '', 'pl')}${sl('FR', 'FR', 0, 2, .1, 1, 1)}
      <div class="mut" style="text-align:center;letter-spacing:.3em;margin-top:4px">— SURROUND + LFE —</div>
      ${sl('SL', 'SL', 0, 2, .1, 1, 1, '', 'cy')}${sl('SR', 'SR', 0, 2, .1, 1, 1, '', 'cy')}${sl('LFE', 'LFE', 0, 2, .1, .1, 1, '', 'rd')}
      <div class="mut" style="text-align:center">0.0 = muet · 1.0 = normal · 2.0 = amplifié</div></div>
      <div class="hd">Doublement façade → surround</div><div class="box">${ck('dbl', 'Copier le stéréo avant vers les enceintes surround', true)}
      ${sl('ratio', 'Ratio de mélange :', 0, 100, 1, 60, 0, '%', '', '160px 1fr 60px')}</div>
      <div class="hd">Effet phase : avant / arrière</div><div class="box">${ck('phase', 'Inverser la phase des enceintes arrière')}${sl('phAmt', 'Intensité :', 0, 100, 1, 50, 0, '%', '', '160px 1fr 60px')}</div>`,

    eq: () => `<div class="row"><button class="btn ${V.eqOn ? 'on' : ''}" data-a="eqon">EQ actif</button><span>Preset</span>${sel('eqp', Object.keys(EQP)).replace('class="sel2"', 'class="sel2" style="flex:1"')}${btn('eqsave', 'Enregistrer')}${btn('eqdel', 'Supprimer')}</div>
      <div class="row">${sel('eqm', ['Courbe libre', 'Graphique 10 bandes']).replace('class="sel2"', 'class="sel2" style="flex:1"')}</div>
      <canvas id="eqc" width="1866" height="322"></canvas><div class="mut" style="margin-top:2px">Gain en dB · clic dans le graphe pour ajouter un point · clic droit sur un point pour le supprimer</div>`,

    rot: () => `<div style="margin-bottom:6px">${ck('rotOn', 'Activer la rotation orbitale', true)}</div>
      <div style="display:grid;grid-template-columns:250px 1fr;gap:16px"><div><canvas id="rad" width="180" height="180" style="margin:40px 0 0 34px"></canvas></div>
      <div><div class="hd">Vitesse de rotation</div><div class="box">${sl('rotSpd', '', .01, 1, .01, .1, 2, ' tr/s', '', '0 1fr 90px')}
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">${[['Lent', .05], ['Moyen', .3], ['Rapide', .8]].map(([l, v]) => `<button class="btn" style="height:28px;justify-content:center" data-a="spd:${v}">${l}</button>`).join('')}</div></div>
        <div class="hd">Étalement angulaire</div><div class="box">${sl('rotSpr', '', 0, 100, 1, 50, 0, ' %', '', '0 1fr 90px')}<div class="mut">0 % = 1 enceinte &nbsp;/&nbsp; 100 % = 3 enceintes</div></div>
        <div class="hd">Angle entre L et R</div><div class="box">${sl('rotAng', '', 0, 180, 1, 180, 0, '°', '', '0 1fr 90px')}<div class="mut">0° = mono &nbsp;/&nbsp; 180° = opposé (défaut)</div></div></div></div>
      <div class="mut" style="margin-top:22px;line-height:20px"><span style="color:#ff5a36">◆</span> La source gauche (orange) tourne en continu autour des 4 enceintes.<br><span style="color:#3b82f6">◆</span> La source droite (bleu) reste à l'opposé exact.</div>`,

    vinyl: () => `<div class="row">${ck('vOn', 'Activer l\'effet vinyle', true)}<span class="sp"></span>${btn('vp:0', 'Neuf')}${btn('vp:1', 'Usé')}${btn('vp:2', 'Très usé')}</div>
      <div style="position:relative;background:#0b0907"><span class="mut" id="vRead" style="position:absolute;left:4px;top:2px;font-family:Consolas,monospace">1.0000x</span><canvas id="vg" width="1866" height="85"></canvas></div>
      <div style="display:grid;grid-template-columns:410px 1fr;gap:12px"><div><div class="hd">Moteur</div><div class="box" style="height:128px">
        ${sl('vSpd', 'Vitesse :', .5, 1.5, .01, 1, 2, 'x', '', '200px 105px 1fr')}<div style="height:12px"></div>${sl('vRnd', 'Aléatoire :', 0, 1, .1, .1, 1, '%', '', '200px 105px 1fr')}</div></div>
        <div><div class="hd">Wow_Flutter</div><div class="box" style="height:128px">
        ${sl('wowA', 'Wow (amplitude) :', 0, 2, .1, .3, 1, '%', '', '190px 1fr 80px')}${sl('wowF', 'Wow (fréquence) :', 0, 3, .01, .8, 2, ' Hz', '', '190px 1fr 80px')}
        ${sl('flA', 'Flutter (amplitude) :', 0, 1, .01, .1, 2, '%', '', '190px 1fr 80px')}${sl('flF', 'Flutter (fréquence) :', 0, 20, .1, 7, 1, ' Hz', '', '190px 1fr 80px')}</div></div></div>
      <div class="hd">Crépitements_Bruit de fond</div><div class="box">
        ${sl('crD', 'Densité (clics/s) :', 0, 300, 1, 30, 0, '', '', '140px 815px 80px')}${sl('crA', 'Amplitude :', 0, 100, 1, 8, 0, '%', '', '140px 815px 80px')}
        ${sl('crL', 'Durée clic (ms) :', 0, 30, .1, 3, 1, ' ms', '', '140px 815px 80px')}${sl('crH', 'Bruit de fond (hiss) :', 0, 2, .1, .4, 1, '%', '', '140px 815px 80px')}</div>`,

    settings: () => {
      const SUB = [['audio', 'Audio'], ['keys', 'Raccourcis'], ['boot', 'Démarrage'], ['col', 'Couleurs'], ['font', 'Polices'], ['lib', 'Bibliothèque'], ['lang', 'Langue']];
      const sub = V.sub || 'audio';
      const body = {
        audio: `<div class="hd">Sortie audio</div><div class="box"><div style="display:grid;grid-template-columns:920px 1fr;gap:12px;row-gap:10px;align-items:center"><span>Périphérique :</span>${sel('dev', ['Automatique (5.1 si disponible)', 'Stéréo', '5.1 (6 canaux)'])}<span>Barre de lecture :</span>${sel('bar', ['Intensité centrée et fine', 'Forme d\'onde classique', 'Barre simple'])}</div></div>`,
        keys: `<div class="hd">Raccourcis clavier</div><div class="box">${[['Lecture / Pause', 'Espace'], ['Avancer de 5 s', '→'], ['Reculer de 5 s', '←'], ['Volume +', '↑'], ['Volume −', '↓']].map(([a, b]) => `<div class="rw" style="grid-template-columns:300px 1fr"><label>${a}</label><b>${b}</b></div>`).join('')}</div>`,
        boot: `<div class="hd">Démarrage</div><div class="box" style="display:grid;gap:12px">${ck('b1', 'Lancer SolarSound avec Windows')}${ck('b2', 'Reprendre la dernière session', true)}${ck('b3', 'Lecture automatique au démarrage')}</div>`,
        col: `<div class="hd">Couleur d'accent</div><div class="box row">${['#f7a91c', '#62c9d0', '#e0526b', '#7bd36a', '#b58cff'].map(c => `<button class="btn" data-a="col:${c}" style="width:90px;background:${c}"></button>`).join('')}</div>`,
        font: `<div class="hd">Police de l'interface</div><div class="box">${sel('ff', ['Segoe UI', 'Consolas', 'Georgia', 'Verdana'])}</div>`,
        lib: `<div class="hd">Dossiers de musique</div><div class="box"><div class="it">C:\\Users\\Musique</div><div class="row" style="margin-top:8px">${btn('scan', 'Scanner maintenant', 'loupe')}</div></div>`,
        lang: `<div class="hd">Langue de l'interface</div><div class="box">${sel('lg', ['Français', 'English', 'Deutsch', 'Español', 'Italiano', 'Português', '中文', '日本語', 'Corsu', 'Nederlands', 'हिन्दी'])}</div>`
      }[sub];
      return `<div class="tabs" style="position:static;margin:-10px -12px 8px">${SUB.map(([k, l]) => `<button class="tab ${k === sub ? 'on' : ''}" data-a="sub:${k}" style="height:42px">${ic(k === 'keys' ? 'raccourcis' : k === 'boot' ? 'demarrage' : k === 'col' ? 'couleurs' : k === 'font' ? 'polices' : k === 'lib' ? 'bibliotheque' : k === 'lang' ? 'langue' : 'surround')}${l}</button>`).join('')}</div>${body}`;
    }
  };

  /* ---------- Playlist ---------- */
  function renderList() {
    const l = $('#list'); if (!l) return;
    const idx = tracks.map((_, i) => i).filter(i => !S.favOnly || fav.has(i));
    l.innerHTML = idx.map(i => `<div class="it ${i === S.cur ? 'cur' : ''} ${i === S.sel ? 'sel' : ''}" data-i="${i}">${i === S.cur ? '▸ ' : ''}${tracks[i].n} — ${tracks[i].a}</div>`).join('');
    const tot = tracks.reduce((a, t) => a + t.d, 0), h = Math.floor(tot / 3600);
    $('#cnt').textContent = `${tracks.length} morceaux · ${h}:${String(Math.floor(tot % 3600 / 60)).padStart(2, '0')}:${String(tot % 60).padStart(2, '0')}`;
  }
  const renderPls = () => {
    const t = $('#tree'); if (!t) return;
    t.innerHTML = PLS.lists.map((p, i) => `<div class="it ${i === PLS.sel ? 'sel' : ''}" data-p="${i}" style="height:30px">${p.n}</div>`).join('');
    const p = PLS.lists[PLS.sel]; $('#plName').textContent = p ? p.n : '—';
    $('#ptracks').innerHTML = p ? p.t.map((n, i) => `<div class="it" data-pt="${i}">${n}</div>`).join('') : '';
  };

  /* ---------- Actions (délégation de clic) ---------- */
  const A = {
    add: () => { const n = tracks.length + 2; tracks.push({ n: 'TRACK' + String(n).padStart(3, '0'), a: 'Michael Jackson', d: 286 }); renderList(); },
    dir: () => toast('Sélecteur de dossier (non disponible dans la simulation)'), cd: () => toast('Aucun CD audio détecté'), dir2: () => A.dir(), scan: () => toast('Analyse des dossiers de musique…'), save: () => toast('Playlists sauvegardées'), home: () => toast('Dossier musique'),
    rem: () => { if (S.sel < 0) return toast('Sélectionnez une piste'); tracks.splice(S.sel, 1); if (S.cur >= S.sel && S.cur > 0) S.cur--; S.sel = -1; pickNext(); ui(); },
    clr: () => { tracks.length = 0; S.cur = 0; S.play = false; S.t = 0; ui(); },
    favF: () => { S.favOnly = !S.favOnly; show('playlist'); },
    mypl: () => show('mypl'),
    vv: () => toast('Lecture vidéo indisponible dans la simulation'),
    fs: () => $('#vid').requestFullscreen?.(),
    newpl: () => { PLS.lists.push({ n: 'Nouvelle playlist ' + (PLS.lists.length + 1), t: [] }); PLS.sel = PLS.lists.length - 1; renderPls(); },
    newdir: () => A.newpl(),
    editpl: () => { const p = PLS.lists[PLS.sel]; if (!p) return toast('Aucune playlist sélectionnée'); const n = prompt('Nom de la playlist :', p.n); if (n) { p.n = n; renderPls(); } },
    addf: () => { const p = PLS.lists[PLS.sel]; if (!p) return toast('Aucune playlist sélectionnée'); p.t.push(tracks[p.t.length % Math.max(1, tracks.length)]?.n || 'Piste'); renderPls(); },
    remt: () => { const p = PLS.lists[PLS.sel]; if (p) { p.t.pop(); renderPls(); } },
    load: () => { const p = PLS.lists[PLS.sel]; toast(p && p.t.length ? 'Playlist chargée : ' + p.n : 'Playlist vide'); },
    eqon: b => { V.eqOn = !V.eqOn; b.classList.toggle('on', V.eqOn); drawEq(); },
    eqsave: () => toast('Preset enregistré'), eqdel: () => toast('Preset supprimé'),
    show: 0
  };
  panel.addEventListener('click', e => {
    const b = e.target.closest('[data-a]');
    if (b) {
      const [k, v] = b.dataset.a.split(':');
      if (k === 'mood') { S.mood = S.mood === v ? null : v; $$('[data-a^="mood"]').forEach(x => x.classList.toggle('on', x.dataset.a === 'mood:' + S.mood)); }
      else if (k === 'view') { V.view = v; $$('[data-a^="view"]').forEach(x => x.classList.toggle('on', x === b)); }
      else if (k === 'spd') { V.rotSpd = +v; const r = $('#rotSpd'); r.value = v; r.dispatchEvent(new Event('input', { bubbles: true })); }
      else if (k === 'vp') vinylPreset(+v);
      else if (k === 'sub') { V.sub = v; show('settings'); }
      else if (k === 'col') { stage.style.setProperty('--o', v); draw(); }
      else A[k]?.(b, e);
      return;
    }
    const it = e.target.closest('.it');
    if (it?.dataset.i) { S.sel = +it.dataset.i; renderList(); }
    else if (it?.dataset.p) { PLS.sel = +it.dataset.p; renderPls(); }
  });
  panel.addEventListener('dblclick', e => { const it = e.target.closest('.it[data-i]'); if (it) playIdx(+it.dataset.i); });

  panel.addEventListener('input', e => {
    const r = e.target; if (r.type !== 'range') return;
    paint(r); V[r.id] = +r.value; const b = r.parentNode.querySelector('b'); if (b) b.textContent = (+r.value).toFixed(+r.dataset.d) + r.dataset.u;
    if (['FL', 'C', 'FR', 'SL', 'SR', 'LFE'].includes(r.id)) toast(`Canal ${r.id} : ${(+r.value).toFixed(1)}`);
  });
  panel.addEventListener('change', e => {
    const t = e.target;
    if (t.type === 'checkbox') V[t.id] = t.checked;
    else if (t.tagName === 'SELECT') {
      V[t.id] = t.value;
      if (t.id === 'bar') draw();
      if (t.id === 'ff') stage.style.fontFamily = `'${t.value}',sans-serif`;
      if (t.id === 'eqp') { V.eq = EQX.map((x, i) => ({ x, g: EQP[t.value][i] })); drawEq(); }
      if (t.id === 'vspd') toast('Vitesse : ' + t.value);
      if (t.id === 'lg') toast('Langue : ' + t.value);
    }
  });

  /* ---------- Égaliseur (canvas interactif) ---------- */
  const EQG = { x0: 68, y0: 18, yb: 38, xr: 12 };
  const eqX = x => EQG.x0 + x * ($('#eqc').width - EQG.xr - EQG.x0), eqY = d => EQG.y0 + (12 - d) / 24 * ($('#eqc').height - EQG.yb - EQG.y0);
  function drawEq() {
    const c = $('#eqc'); if (!c) return; const g = c.getContext('2d'), w = c.width, h = c.height; g.clearRect(0, 0, w, h);
    g.globalAlpha = V.eqOn ? 1 : .35; g.font = '14px Segoe UI'; g.textAlign = 'left';
    g.strokeStyle = 'rgba(247,169,28,.18)'; g.fillStyle = '#6b5a3c';
    [12, 6, 0, -6, -12].forEach(d => { g.beginPath(); g.moveTo(eqX(0), eqY(d)); g.lineTo(w - EQG.xr, eqY(d)); g.stroke(); g.fillText((d >= 0 ? '+' : '') + d, 20, eqY(d) + 5); });
    EQX.forEach((x, i) => { g.beginPath(); g.moveTo(eqX(x), eqY(12)); g.lineTo(eqX(x), eqY(-12)); g.stroke(); g.fillText(FQ[i], eqX(x) - 12, h - 14); });
    const p = [...V.eq].sort((a, b) => a.x - b.x); g.strokeStyle = O(); g.fillStyle = O(); g.lineWidth = 3; g.beginPath();
    p.forEach((q, i) => i ? g.lineTo(eqX(q.x), eqY(q.g)) : g.moveTo(eqX(q.x), eqY(q.g))); g.stroke();
    p.forEach(q => { g.beginPath(); g.arc(eqX(q.x), eqY(q.g), 6, 0, 7); g.fill(); }); g.globalAlpha = 1;
  }
  const eqPos = e => { const c = $('#eqc'), r = c.getBoundingClientRect(), k = c.width / r.width; return { px: (e.clientX - r.left) * k, py: (e.clientY - r.top) * k }; };
  const eqHit = e => { const { px, py } = eqPos(e); return V.eq.find(q => Math.hypot(eqX(q.x) - px, eqY(q.g) - py) < 14); };
  function eqInit() {
    const c = $('#eqc'); if (!c) return; drawEq();
    c.addEventListener('contextmenu', e => { e.preventDefault(); const q = eqHit(e); if (q && V.eq.length > 2) { V.eq.splice(V.eq.indexOf(q), 1); drawEq(); } });
    c.addEventListener('pointerdown', e => {
      if (e.button) return; let q = eqHit(e);
      if (!q) { const { px, py } = eqPos(e); q = { x: clamp((px - eqX(0)) / (eqX(1) - eqX(0)), 0, 1), g: clamp(12 - (py - EQG.y0) / (c.height - EQG.yb - EQG.y0) * 24, -12, 12) }; V.eq.push(q); }
      const mv = ev => { const { px, py } = eqPos(ev); q.x = clamp((px - eqX(0)) / (eqX(1) - eqX(0)), 0, 1); q.g = Math.round(clamp(12 - (py - EQG.y0) / (c.height - EQG.yb - EQG.y0) * 24, -12, 12) * 2) / 2; drawEq(); };
      const up = () => { removeEventListener('pointermove', mv); removeEventListener('pointerup', up); };
      addEventListener('pointermove', mv); addEventListener('pointerup', up); mv(e);
    });
  }

  /* ---------- Rotation (radar) et Vinyle (courbe de vitesse) ---------- */
  function drawRad() {
    const c = $('#rad'); if (!c) return; const g = c.getContext('2d'), R = 88, o = O(); g.clearRect(0, 0, 180, 180);
    g.fillStyle = '#100d09'; g.strokeStyle = '#2a2218'; g.beginPath(); g.arc(90, 90, R, 0, 7); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(2, 90); g.lineTo(178, 90); g.moveTo(90, 2); g.lineTo(90, 178); g.stroke();
    [[-1, -1, 'FL'], [1, -1, 'FR'], [-1, 1, 'SL'], [1, 1, 'SR']].forEach(([x, y, l]) => { g.fillStyle = '#3a3322'; g.beginPath(); g.arc(90 + x * 62, 90 + y * 62, 12, 0, 7); g.fill(); });
    const src = (a, col) => { const x = 90 + Math.cos(a) * 52, y = 90 + Math.sin(a) * 52, gr = g.createRadialGradient(x, y, 0, x, y, 32 * (.6 + (V.rotSpr ?? 50) / 125));
      gr.addColorStop(0, col); gr.addColorStop(1, 'transparent'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, 40, 0, 7); g.fill(); g.fillStyle = col; g.beginPath(); g.arc(x, y, 6, 0, 7); g.fill(); };
    src(S.ang + Math.PI * .75 * 0 - Math.PI * .75, o); src(S.ang - Math.PI * .75 + (V.rotAng ?? 180) * Math.PI / 180, '#62c9d0');
    g.font = '12px Segoe UI'; g.fillStyle = o; [['FL', 10, 18], ['FR', 150, 18], ['SL', 10, 170], ['SR', 150, 170]].forEach(([l, x, y]) => g.fillText(l, x, y));
  }
  const vh = []; let vt = 0;
  function drawVinyl() {
    const c = $('#vg'); if (!c) return; vt += .05;
    if (V.vOn !== false && S.play) {
      const s = V.vSpd ?? 1, inst = s * (1 + (V.wowA ?? .3) / 100 * Math.sin(6.283 * (V.wowF ?? .8) * vt) + (V.flA ?? .1) / 100 * Math.sin(6.283 * (V.flF ?? 7) * vt) + (Math.random() - .5) * (V.vRnd ?? .1) / 100);
      vh.push(inst); if (vh.length > 900) vh.shift(); $('#vRead').textContent = inst.toFixed(4) + 'x';
    }
    const g = c.getContext('2d'), w = c.width, h = c.height; g.clearRect(0, 0, w, h);
    g.strokeStyle = O(); g.lineWidth = 1.500; g.beginPath();
    for (let i = 0; i < 900; i++) { const v = vh[vh.length - 900 + i], x = w - 6 - (900 - i) * (w - 30) / 900 * 1.0; const y = v === undefined ? h / 2 : h / 2 - (v - 1) * h * 40;
      i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
  }
  function vinylPreset(n) {
    const P = [[.05, .5, .02, 4, 5, 2, 1, .1], [.3, .8, .1, 7, 30, 8, 3, .4], [.9, 1.2, .3, 9, 120, 25, 6, 1.2]][n];
    ['wowA', 'wowF', 'flA', 'flF', 'crD', 'crA', 'crL', 'crH'].forEach((k, i) => V[k] = P[i]); show('vinyl');
  }
  setInterval(() => { if (S.tab === 'rot') { if (S.play && V.rotOn !== false) S.ang += (V.rotSpd ?? .1) * 6.283 * .04; drawRad(); } if (S.tab === 'vinyl') drawVinyl(); }, 40);

  /* ---------- Onglets ---------- */
  const TABS = [['playlist', 'Playlist', 'playlist'], ['video', 'Vidéo', 'video'], ['mypl', 'Mes Playlists', 'mesplaylists'], ['surround', '5.1', 'surround'], ['eq', 'Égaliseur', 'egaliseur'], ['rot', 'Rotation', 'rotation'], ['vinyl', 'Vinyle', 'vinyle'], ['settings', 'Paramètres', 'parametres']];
  $('#tabs').innerHTML = TABS.map(([k, l, i]) => `<button class="tab" data-t="${k}">${ic(i)}${l}</button>`).join('');
  $('#tabs').addEventListener('click', e => { const b = e.target.closest('[data-t]'); if (b) show(b.dataset.t); });
  function show(id) {
    S.tab = id; if (id === 'surround' && !S.surround) { S.surround = true; ui(); }
    $$('#tabs .tab').forEach(b => b.classList.toggle('on', b.dataset.t === id));
    panel.innerHTML = PANELS[id](); panel.scrollTop = 0;
    $$('input[type=range]', panel).forEach(paint);
    if (id === 'playlist') renderList(); if (id === 'mypl') renderPls(); if (id === 'eq') eqInit(); if (id === 'rot') drawRad(); if (id === 'vinyl') drawVinyl();
  }

  pickNext(); ui(); show('playlist');
});